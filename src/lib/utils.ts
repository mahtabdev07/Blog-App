import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | number | string): string {
  const dateObj = typeof date === "string" || typeof date === "number"
    ? new Date(Number(date))
    : date;
  return format(dateObj, "MMM dd, yyyy"); 
}


