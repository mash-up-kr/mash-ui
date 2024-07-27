import type { Accessor } from "solid-js";
import type { ToastConfig } from "./types";
import { createContext } from "./utils";

export interface UseToastRegionContext {
  toasts: Accessor<ToastConfig[]>;
  duration: Accessor<number>;
}

export const [ToastRegionContextProvider, useToastRegionContext] =
  createContext<UseToastRegionContext>({
    hookName: "useToastRegionContext",
    providerName: "<ToastRegionContextProvider />",
  });
