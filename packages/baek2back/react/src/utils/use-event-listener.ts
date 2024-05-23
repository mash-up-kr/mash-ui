// https://github.com/heyitsarpit/react-hooks-library/blob/main/packages/core/useEventListener/index.ts

import { useEffect, useRef } from "react";
import { MaybeRef, unRef } from "./ref";

type AnyFunction = (...args: any[]) => any;

const isClient = typeof window !== "undefined";
const noop = () => {};

interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any;
  removeEventListener(event: Events, fn?: any, options?: any): any;
}

export type GeneralEventListener<E = Event> = {
  (evt: E): void;
};

export function useEventListener<E extends keyof WindowEventMap>(
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): AnyFunction;
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): AnyFunction;
export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  listener: (this: Document, ev: DocumentEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): AnyFunction;
export function useEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): AnyFunction;
export function useEventListener<EventType = Event>(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): AnyFunction;
export function useEventListener(...args: any[]) {
  let target: MaybeRef<EventTarget | null | undefined>;
  let event: string;
  let listener: EventListener;
  let options: boolean | AddEventListenerOptions;

  typeof args[0] === "string"
    ? ([event, listener, options] = args)
    : ([target, event, listener, options] = args);

  const savedListener = useRef<EventListener>(listener);
  const cleanup = useRef(noop);

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const el = unRef(target);

    if (!isClient || !el) return;

    el.addEventListener(event, savedListener.current, options);
    cleanup.current = () => {
      el.removeEventListener(event, savedListener.current, options);
    };

    return cleanup.current;
  }, [event, target, options]);

  return cleanup.current;
}
