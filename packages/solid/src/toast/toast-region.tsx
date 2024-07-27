import { combineStyle } from "@solid-primitives/props";
import {
  type JSX,
  type ParentProps,
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
} from "solid-js";
import { toastStore } from "./store";
import {
  ToastRegionContextProvider,
  type UseToastRegionContext,
} from "./toast-region-context";
import type { Prettify } from "./types";

export interface ToastRegionOptions {
  "aria-label"?: string;
  duration?: number;
  limit?: number;
  topLayer?: boolean;
  regionId?: string;
}

export interface ToastRegionCommonProps {
  style?: JSX.CSSProperties | string;
  id?: string;
}

export type ToastRegionProps = Prettify<
  ParentProps<ToastRegionOptions & ToastRegionCommonProps>
>;

export const ToastRegion = (props: ToastRegionProps) => {
  const mergedProps = mergeProps(
    {
      id: `toast-region-${createUniqueId()}`,
      duration: 3000,
      limit: 3,
      topLayer: true,
    },
    props
  );

  const [local, others] = splitProps(mergedProps, [
    "style",
    "duration",
    "limit",
    "topLayer",
    "aria-label",
    "regionId",
  ]);

  const toasts = createMemo(() =>
    toastStore
      .toasts()
      .filter((toast) => toast.region === local.regionId)
      .slice(0, local.limit)
  );

  const hasToasts = () => toasts().length > 0;

  const context: UseToastRegionContext = {
    toasts,
    duration: () => local.duration,
  };

  return (
    <ToastRegionContextProvider value={context}>
      <section
        role="region"
        tabIndex={-1}
        aria-label={local["aria-label"]}
        style={combineStyle(
          {
            "pointer-events": hasToasts()
              ? local.topLayer
                ? "auto"
                : undefined
              : "none",
          },
          local.style
        )}
        {...others}
      />
    </ToastRegionContextProvider>
  );
};
