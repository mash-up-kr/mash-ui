import { useCallback } from "react";
import { unRef, type MaybeRef } from "./ref";
import useEventListener from "./use-event-listener";

export type ClickOutsideEvents = Pick<
  WindowEventMap,
  | "mousedown"
  | "mouseup"
  | "touchstart"
  | "touchend"
  | "pointerdown"
  | "pointerup"
>;
export interface ClickOutsideOptions<E extends keyof ClickOutsideEvents> {
  event?: E;
}

export function useClickOutside<
  E extends keyof ClickOutsideEvents = "pointerdown",
>(
  target: MaybeRef<Element | null | undefined>,
  handler: (evt: ClickOutsideEvents[E]) => void,
  options: ClickOutsideOptions<E> = {},
) {
  const { event = "pointerdown" } = options;

  const listener = useCallback(
    (event: ClickOutsideEvents[E]) => {
      const el = unRef(target);
      if (!el) return;

      if (el === event.target || event.composedPath().includes(el)) return;

      handler(event);
    },
    [handler, target],
  );

  return useEventListener(globalThis?.window, event, listener, {
    passive: true,
  });
}
