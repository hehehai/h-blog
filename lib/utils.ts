import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const baseHost = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hehehai.cn';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
