import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers.authorization as string;
  const token = bearerToken?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized request (missing token)" });
  }

  const payload = jwt.decode(token) as { email?: string } | null;

  if (!payload?.email) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized request (invalid token)" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized request (user not found)" });
  }

  return res.status(200).json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    city: user.city,
    phone: user.phone,
  });
}
