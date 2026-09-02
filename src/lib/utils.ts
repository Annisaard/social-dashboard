import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getInitials(name?: string): string {
  if (!name || !name.trim()) return "?";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  const first = words[0][0];
  const last = words[words.length - 1][0];
  return (first + last).toUpperCase();
}
