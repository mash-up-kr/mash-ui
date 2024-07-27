import type { Accessor, JSX } from "solid-js";
import { createEffect, createSignal, onCleanup } from "solid-js";

const toCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/-$/, "");
};

type CSSStyleDeclarationKey = Exclude<
  keyof CSSStyleDeclaration,
  number | symbol
>;

const isEditableCSSStyleDeclarationKey = (
  key: string,
): key is Exclude<CSSStyleDeclarationKey, "parentRule" | "length"> => {
  if (key === "parentRule" || key === "length") return false;

  return key in document.documentElement.style;
};

const injectAnimation = (
  ref: Accessor<HTMLElement | null>,
  initial: JSX.CSSProperties = {},
  animate: JSX.CSSProperties = {},
  exit: JSX.CSSProperties = {},
) => {
  const [isExiting, setIsExiting] = createSignal(false);

  const applyStyles = (element: HTMLElement, styles?: JSX.CSSProperties) => {
    if (!styles) return;

    for (const [key, value] of Object.entries(styles)) {
      const camelKey = toCamelCase(key);
      if (!camelKey || !isEditableCSSStyleDeclarationKey(camelKey)) continue;

      element.style[camelKey] = value;
    }
  };

  createEffect(() => {
    const element = ref();

    if (element) {
      applyStyles(element, initial);

      requestAnimationFrame(() => {
        applyStyles(element, animate);
      });
    }
  });

  onCleanup(() => {
    const element = ref();

    if (element && isExiting()) {
      applyStyles(element, exit);
    }
  });

  const startExitAnimation = () => {
    const element = ref();

    if (element) {
      setIsExiting(true);
      applyStyles(element, exit);
    }
  };

  return startExitAnimation;
};

export default injectAnimation;
