import {
  type Context,
  type ContextProviderComponent,
  createContext as createSolidContext,
  useContext as useSolidContext,
} from "solid-js";
import type { MaybeAccessor, MaybeAccessorValue } from "./types";

export interface CreateContextOptions<T> {
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  defaultValue?: T;
}

const getErrorMessage = (hookName: string, providerName: string) =>
  `${hookName} returned \`undefined\`. Seems you forgot to wrap component within ${providerName}`;

export const createContext = <T>(options: CreateContextOptions<T> = {}) => {
  const {
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options;

  const Context = createSolidContext<T | undefined>(defaultValue);

  const useContext = () => {
    const context = useSolidContext(Context);

    if (!context) {
      const error = new Error(
        errorMessage ?? getErrorMessage(hookName, providerName),
      );
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  };

  return [Context.Provider, useContext, Context] as [
    ContextProviderComponent<T>,
    () => NonNullable<T>,
    Context<T>,
  ];
};

export const access = <T extends MaybeAccessor<unknown>>(
  value: T,
): MaybeAccessorValue<T> => (typeof value === "function" ? value() : value);
