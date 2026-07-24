export const times = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

/** Convert "14:30:00.000Z" style open/close into HH:MM for comparison */
export function normalizeTime(raw: string) {
  return raw.slice(0, 5);
}

export function getAvailableTimes(openTime: string, closeTime: string) {
  const open = normalizeTime(openTime);
  const close = normalizeTime(closeTime);
  return times.filter((time) => time >= open && time <= close);
}

export function formatDisplayTime(time: string) {
  const [hourStr, minute] = time.split(":");
  let hour = Number(hourStr);
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${suffix}`;
}
