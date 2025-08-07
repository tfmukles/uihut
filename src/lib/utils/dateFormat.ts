import { format, toZonedTime } from "date-fns-tz";

const dateFormat = (
  date: Date | string,
  pattern: string | undefined = "dd MMM, yyyy",
  timeZone: string = "UTC",
): string => {
  const dateObj = new Date(date);
  const zonedDate = toZonedTime(dateObj, timeZone);
  const output = format(zonedDate, pattern);
  return output;
};

export default dateFormat;
