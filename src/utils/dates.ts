import format from "date-fns/format";
import parse from "date-fns/parse";

export function stringifyDate(date: Date): string {
  return format(date, "YYYY-MM-dd");
}

export function parseDate(date: string): Date {
  return parse(date, "YYYY-MM-dd", new Date());
}
