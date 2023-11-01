import { DateTime } from "luxon";

const formatTime = (date: Date | null | undefined) => {
  if (!date) return "";
  const dateNow = DateTime.fromJSDate(new Date(date)).setZone("Asia/Manila");
  const hours = dateNow.hour;
  const minutes = dateNow.minute;
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

export default formatTime;
