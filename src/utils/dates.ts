import format from "date-fns/format";
import parse from "date-fns/parse";

export function stringifyDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function parseDate(date: string): Date {
  return parse(date, "yyyy-MM-dd", new Date());
}
