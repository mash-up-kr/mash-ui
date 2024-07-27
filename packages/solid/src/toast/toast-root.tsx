import { createPresence } from "@solid-primitives/presence";
import { combineStyle } from "@solid-primitives/props";
import { mergeRefs } from "@solid-primitives/refs";
import {
  type ComponentProps,
  type JSX,
  Show,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  mergeProps,
  on,
  splitProps,
} from "solid-js";
import { toastStore } from "./store";
import { useToastRegionContext } from "./toast-region-context";
import type { ElementOf } from "./types";

export interface ToastRootOptions {
  toastId: number;
  priority?: "high" | "low";
  duration?: number;
  visibleStyle: JSX.CSSProperties;
  invisibleStyle: JSX.CSSProperties;
}

export interface ToastRootCommonProps<T extends HTMLElement = HTMLElement> {
  style?: JSX.CSSProperties | string;
  ref?: T | ((element: T) => void);
  id?: string;
}

export type ToastRootProps<T extends HTMLElement = HTMLElement> =
  ToastRootOptions & ToastRootCommonProps<T> & ComponentProps<"li">;

export const ToastRoot = (props: ToastRootProps<ElementOf<"li">>) => {
  const rootContext = useToastRegionContext();

  const mergedProps = mergeProps(
    {
      id: `toast-${createUniqueId()}`,
      priority: "high",
    },
    props
  );

  const [local, others] = splitProps(mergedProps, [
    "toastId",
    "style",
    "priority",
    "duration",
    "ref",
    "visibleStyle",
    "invisibleStyle",
  ]);

  const duration = createMemo(() => local.duration ?? rootContext.duration());

  const [isOpen, setIsOpen] = createSignal(true);

  const { isVisible, isMounted } = createPresence(isOpen, {
    transitionDuration: duration(),
    initialEnter: true,
  });

  const close = () => {
    setIsOpen(false);
  };

  const startTimer = (duration: number) => {
    if (!duration) return;
    setTimeout(close, duration);
  };

  createEffect(
    on(
      () => isMounted(),
      (isMounted) => {
        if (!isMounted) {
          toastStore.remove(local.toastId);
        }
      }
    )
  );

  createEffect(
    on(
      () => toastStore.get(local.toastId)?.dismiss,
      (dismiss) => {
        if (dismiss) {
          close();
        }
      }
    )
  );

  createEffect(
    on([isOpen, duration], ([isOpen, duration]) => {
      if (isOpen) {
        startTimer(duration);
      }
    })
  );

  return (
    <Show when={isMounted()}>
      <li
        role="status"
        tabIndex={0}
        ref={mergeRefs(local.ref)}
        aria-live={local.priority === "high" ? "assertive" : "polite"}
        aria-atomic={true}
        style={combineStyle(
          {
            "user-select": "none",
            "touch-action": "none",
            ...(isVisible() && local.visibleStyle),
            ...(!isVisible() && local.invisibleStyle),
          },
          local.style
        )}
        {...others}
      />
    </Show>
  );
};
