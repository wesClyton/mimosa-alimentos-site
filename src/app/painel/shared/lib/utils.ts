import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(prefix: string = "id"): string {
  const RANDOM = Math.random() * (1000 - 1) + 1
  return `${prefix}-${parseInt(RANDOM.toString())}`
}
