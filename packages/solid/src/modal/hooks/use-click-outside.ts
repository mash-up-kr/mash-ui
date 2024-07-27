import type { Accessor } from 'solid-js';
import useEventListener from './use-event-listener';

export type ClickOutsideEvents = Extract<
  keyof WindowEventMap,
  'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'pointerdown' | 'pointerup'
>;

const useClickOutside = <K extends ClickOutsideEvents>(
  target: Accessor<HTMLElement | null>,
  handler: (event: WindowEventMap[K]) => void,
  event?: K
) => {
  const eventType = event ?? ('pointerdown' as K);

  const listener = (event: WindowEventMap[K]) => {
    const container = target();
    if (!container) return;

    if (container === event.target || event.composedPath().includes(container)) return;

    handler(event);
  };

  useEventListener<K>(eventType, listener, () => document, { passive: true });
};

export default useClickOutside;
