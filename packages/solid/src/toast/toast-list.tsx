import { mergeRefs } from "@solid-primitives/refs";
import { type ComponentProps, For, splitProps } from "solid-js";
import { useToastRegionContext } from "./toast-region-context";
import type { ElementOf } from "./types";

export type ToastListProps<T extends HTMLElement = HTMLElement> = {
  ref?: T | ((element: T) => void);
} & ComponentProps<"ol">;

export const ToastList = (props: ToastListProps<ElementOf<"ol">>) => {
  let ref: HTMLElement | undefined;

  const context = useToastRegionContext();

  const [local, others] = splitProps(props, ["ref"]);

  return (
    <ol
      ref={mergeRefs((element) => {
        ref = element;
      }, local.ref)}
      tabIndex={-1}
      {...others}
    >
      <For each={context.toasts()}>
        {(toast) =>
          toast.component({
            get toastId() {
              return toast.id;
            },
          })
        }
      </For>
    </ol>
  );
};
