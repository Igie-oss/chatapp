import { DateTime } from "luxon";
const dateNow = DateTime.now().setZone("Asia/Manila").toJSDate();

export default function isToday(date: Date): boolean {
  

  const convertedDate = DateTime.fromJSDate(new Date(date)).setZone(
    "Asia/Manila"
  );
  const isToday =
    convertedDate.day === dateNow.getDate() &&
    convertedDate.year === dateNow.getFullYear() &&
    convertedDate.month === dateNow.getMonth() + 1;


  return isToday;
}