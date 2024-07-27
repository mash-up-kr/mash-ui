import type { Accessor } from 'solid-js';
import useEventListener from './use-event-listener';

export type Keys = string | string[];
export type KeyStrokeEventType = Extract<keyof WindowEventMap, 'keydown' | 'keypress' | 'keyup'>;
export type KeyStrokeOptions = {
  type?: KeyStrokeEventType;
  target?: Accessor<EventTarget>;
  code?: boolean;
};

export const useKeyStroke = <K extends KeyStrokeEventType>(
  keys: Keys,
  handler: (event: WindowEventMap[K]) => void,
  options?: KeyStrokeOptions
) => {
  const eventType = (options?.type ?? 'keydown') as K;
  const target = options?.target ?? globalThis.window;

  const listener = (e: WindowEventMap[K]) => {
    if (e instanceof KeyboardEvent) {
      const eventKey = options?.code ? e.code : e.key;

      if (keys.includes(eventKey)) {
        handler(e);
      }
    }
  };

  return useEventListener<K>(eventType, listener, target, { passive: false });
};
