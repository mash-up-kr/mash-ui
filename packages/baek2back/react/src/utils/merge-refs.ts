import type { MutableRefObject, LegacyRef, RefCallback } from "react";

/**
 * @example
 * const Component = forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = mergeRefs([ref, ownRef]);
 *   return <div ref={domRef}>...</div>;
 * });
 */

export function mergeRefs<T = any>(
  refs: (MutableRefObject<T> | LegacyRef<T>)[]
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}