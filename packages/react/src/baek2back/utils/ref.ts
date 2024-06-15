import type { MutableRefObject } from "react";

export type MaybeRef<T> = T | MutableRefObject<T>;

export const isRef = (obj: unknown): boolean =>
  obj !== null &&
  typeof obj === "object" &&
  Object.prototype.hasOwnProperty.call(obj, "current");

export function unRef<T = HTMLElement>(target: MaybeRef<T>): T {
  const element = isRef(target)
    ? (target as MutableRefObject<T>).current
    : (target as T);

  return element;
}
