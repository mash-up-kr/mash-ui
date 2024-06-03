import { useEffect, useLayoutEffect } from "react";

const canUseDOM = () =>
  Boolean(typeof window !== "undefined" && window.document?.createElement);

export const useIsomorphicLayoutEffect = canUseDOM()
  ? useLayoutEffect
  : useEffect;
