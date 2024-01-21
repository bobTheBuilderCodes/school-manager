import { formatDistanceToNow, parseISO } from "date-fns";

const isDate = (value: any): boolean => {
    return (
      value instanceof Date ||
      (typeof value === "string" && !isNaN(parseISO(value).getTime()))
    );
  };
export const formatDate = (value: any): string => {
    const date = isDate(value) ? parseISO(value) : null;
    return date ? formatDistanceToNow(date, { addSuffix: true }) : value;
  };
  