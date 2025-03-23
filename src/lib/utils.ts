import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const token = localStorage.getItem('astraToken')

export const setToken = (token: string) => {
  localStorage.setItem('astraToken', token)
}

export const removeToken = () => {
  localStorage.removeItem('astraToken')
}

