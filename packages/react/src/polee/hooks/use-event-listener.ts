import { useEffect } from "react";

import useIsClient from "./use-is-client";

const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: EventTarget,
) => {
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    const targetElement = element || window;
    const eventListener = (event: Event) => handler(event as WindowEventMap[K]);

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, handler, element, isClient]);
};

export default useEventListener;
