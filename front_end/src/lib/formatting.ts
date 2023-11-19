import { DateTime } from "luxon";
const dateNow = DateTime.now().setZone("Asia/Manila").toJSDate();
const formattedDate = (date: Date): DateTime => {
  return DateTime.fromJSDate(new Date(date)).setZone("Asia/Manila");
};

const formatTime = (date: Date | null | undefined) => {
  if (!date) return "";
  const curDate = formattedDate(date);
  const hours = curDate.hour;
  const minutes = curDate.minute;
  let timeString = "";
  let meridian = "";
  if (hours === 0) {
    timeString = "12";
    meridian = "AM";
  } else if (hours > 12) {
    timeString = (hours - 12).toString();
    meridian = "PM";
  } else if (hours === 12) {
    timeString = "12";
    meridian = "PM";
  } else {
    timeString = hours.toString();
    meridian = "AM";
  }
  timeString += ":" + (minutes < 10 ? "0" + minutes : minutes);
  return timeString + " " + meridian;
};

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
    const curDate = formattedDate(date);
    const month = curDate.month;
    const day = curDate.day;
    const year = curDate.year;
    return `${months[month - 1]} ${day} ${year}`;
  } else {
    return "";
  }
};


const  isToday = (date: Date): boolean => {
  const convertedDate = DateTime.fromJSDate(new Date(date)).setZone(
    "Asia/Manila"
  );
  const isToday =
    convertedDate.day === dateNow.getDate() &&
    convertedDate.year === dateNow.getFullYear() &&
    convertedDate.month === dateNow.getMonth() + 1;
  return isToday;
}

export {formattedDate, formatDate, formatTime,isToday };
