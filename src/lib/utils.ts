import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const RandomString = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// dateTime
export const formatDate = (date: any,type:string="DD MMM YYYY") => {
  return dayjs(date).format(type);
};
export const formatTime = (date: any) => {
  return dayjs(date).format("h:s A");
};

export const formatDateTime = (date: any) => {
  return dayjs(date).format("h:s A - DD MMM YYYY");
};

// delay Time
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (s:string | any) => s[0]?.toUpperCase() + s?.slice(1);

export const PlaceholderImg = (
  width: number = 600,
  height: number = 400
): string => {
  return `https://placehold.co/${width}x${height}.png`;
  // return `https://surl.li/wkkxwa`;
};
