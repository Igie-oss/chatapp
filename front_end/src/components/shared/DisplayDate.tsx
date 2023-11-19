import checkIsTodday from "@/lib/isToday"
import  {formatDate, formatTime } from "@/lib/formatting"

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
