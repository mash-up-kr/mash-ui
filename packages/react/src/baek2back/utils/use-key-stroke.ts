import { useCallback } from "react";
import type { MaybeRef } from "./ref";
import { useEventListener } from "./use-event-listener";

export type Keys = string | string[];
export type KeyStrokeEventName = "keydown" | "keypress" | "keyup";
export type KeyStrokeOptions = {
  eventName?: KeyStrokeEventName;
  target?: MaybeRef<EventTarget>;
  code?: boolean;
  passive?: false;
};

export function useKeyStroke(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {},
) {
  const {
    target = globalThis?.window,
    eventName = "keydown",
    passive = false,
    code = false,
  } = options;

  const listener = useCallback(
    (e: KeyboardEvent) => {
      const eventKey = code ? e.code : e.key;

      keys.includes(eventKey) && handler(e);
    },
    [code, handler, keys],
  );

  return useEventListener(target, eventName, listener, { passive });
}
