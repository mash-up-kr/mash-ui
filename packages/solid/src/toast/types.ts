import type { Accessor, Component } from "solid-js";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type MaybeAccessor<T> = Accessor<T> | T;
export type MaybeAccessorValue<T extends MaybeAccessor<unknown>> =
  T extends Accessor<unknown> ? ReturnType<T> : T;

export type ElementOf<T> = T extends HTMLElement
  ? T
  : T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T]
    : never;

export type PromissoryToastState = "pending" | "fulfilled" | "rejected";

export interface ToastComponentProps {
  toastId: number;
}

export type ToastComponent = Component<ToastComponentProps>;

export interface PromissoryToastComponentProps<T, U = unknown>
  extends ToastComponentProps {
  state: PromissoryToastState;
  data?: T;
  error?: U;
}

export type PromissoryToastComponent<T, U = unknown> = Component<
  PromissoryToastComponentProps<T, U>
>;

export interface ToastConfig {
  id: number;
  dismiss: boolean;
  update: boolean;
  component: ToastComponent;
  region?: string;
}

export type ShowToastOptions = Pick<ToastConfig, "region">;
