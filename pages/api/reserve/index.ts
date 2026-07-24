import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/db";
import validator from "validator";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ errorMessage: "Method not allowed" });
  }

  const {
    slug,
    partySize,
    date,
    time,
    firstName,
    lastName,
    email,
    phone,
    occasion,
    request,
  } = req.body;

  if (
    !slug ||
    !partySize ||
    !date ||
    !time ||
    !firstName ||
    !lastName ||
    !email ||
    !phone
  ) {
    return res.status(400).json({ errorMessage: "Missing required fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ errorMessage: "Email is invalid" });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
  });

  if (!restaurant) {
    return res.status(404).json({ errorMessage: "Restaurant not found" });
  }

  let userId: number | undefined;
  const bearer = req.headers.authorization;
  const token = bearer?.split(" ")[1];
  if (token) {
    const payload = jwt.decode(token) as { email?: string } | null;
    if (payload?.email) {
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
      userId = user?.id;
    }
  }

  const reservation = await prisma.reservation.create({
    data: {
      restaurant_id: restaurant.id,
      user_id: userId,
      booker_email: email,
      booker_phone: phone,
      booker_first: firstName,
      booker_last: lastName,
      booker_occasion: occasion || null,
      booker_request: request || null,
      party_size: Number(partySize),
      booking_date: date,
      booking_time: time,
    },
  });

  return res.status(201).json({
    id: reservation.id,
    restaurant: restaurant.name,
    date: reservation.booking_date,
    time: reservation.booking_time,
    partySize: reservation.party_size,
  });
}
