import { createStore } from "solid-js/store";
import type { ToastConfig } from "./types";

type ToastStore = {
  toasts: ToastConfig[];
};

const [store, setStore] = createStore<ToastStore>({
  toasts: [],
});

export const toastStore = {
  toasts: () => store.toasts,
  add: (toast: ToastConfig) => {
    setStore("toasts", (prevToasts) => [...prevToasts, toast]);
  },
  get: (id: number) => store.toasts.find((toast) => toast.id === id),
  update: (id: number, toast: ToastConfig) => {
    const index = store.toasts.findIndex((toast) => toast.id === id);

    if (index === -1) return;

    setStore("toasts", (prevToasts) => [
      ...prevToasts.slice(0, index),
      toast,
      ...prevToasts.slice(index + 1),
    ]);
  },
  dismiss: (id: number) => {
    setStore("toasts", (toast) => toast.id === id, "dismiss", true);
  },
  remove: (id: number) => {
    setStore("toasts", (prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id),
    );
  },
  clear: () => {
    setStore("toasts", []);
  },
};
