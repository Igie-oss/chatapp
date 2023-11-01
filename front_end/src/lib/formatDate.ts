import { DateTime } from "luxon";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const formatDate = (date: Date | null | undefined) => {
  if (date) {
    const dateNow = DateTime.fromJSDate(new Date(date)).setZone("Asia/Manila");
    const month = dateNow.month;
    const day = dateNow.day;
    const year = dateNow.year;
    return `${months[month - 1]} ${day} ${year}`;
  } else {
    return "";
  }
};

export default formatDate;
