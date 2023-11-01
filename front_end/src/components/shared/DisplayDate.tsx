
import checkIsTodday from "@/lib/isToday"
import formatTime from "@/lib/formatTime";
import formatDate from "@/lib/formatDate";
type Props = {
  date: Date;
};
export default function DisplayDate({ date }: Props) {
  const isToday = checkIsTodday(date);

  return `${
    isToday
      ? formatTime(date)
      : `${formatDate(date)}, ${formatTime(date)}`
  }`;
}
