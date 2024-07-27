import { type Accessor, createEffect, onCleanup, onMount } from "solid-js";

const useEventListener = <K extends keyof WindowEventMap>(
  eventType: K,
  handler: (event: WindowEventMap[K]) => void,
  target: Accessor<HTMLElement | EventTarget | null> | Window,
  options?: AddEventListenerOptions
) => {
  const eventListener = (event: Event) => handler(event as WindowEventMap[K]);

  createEffect(() => {
    if (target instanceof Window) {
      window.addEventListener(eventType, eventListener);

      onCleanup(() => window.removeEventListener(eventType, eventListener));
      return;
    }
    const container = target();
    if (!container) return;

    container.addEventListener(eventType, eventListener, options);

    onCleanup(() => {
      const container = target();
      if (!container) return;

      container.removeEventListener(eventType, eventListener, options);
    });
  });
};

export default useEventListener;
