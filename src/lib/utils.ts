import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Конкатенация классов с приоритетом Tailwind CSS
 * @example cn("px-2", "px-4") // => "px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
