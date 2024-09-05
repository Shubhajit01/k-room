import { clsx, type ClassValue } from "clsx";
import type { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

import * as R from "remeda";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: Timestamp): string {
  return timestamp.toDate().toLocaleString(undefined, {
    dateStyle: "medium",
  });
}

export function createAvatarInitials(full: string) {
  return R.pipe(
    full,
    R.split(" "),
    R.take(2),
    R.map(R.sliceString(0, 1)),
    R.join(""),
    R.toUpperCase,
  );
}
