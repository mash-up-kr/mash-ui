import { type Accessor, createEffect } from "solid-js";

const usePreventBodyScroll = (props: { isOpen: Accessor<boolean> }) => {
  createEffect(() => {
    if (props.isOpen()) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  });
};

export default usePreventBodyScroll;
