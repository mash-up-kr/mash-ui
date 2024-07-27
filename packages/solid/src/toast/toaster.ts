import { toastStore } from "./store";
import type {
  MaybeAccessor,
  PromissoryToastComponent,
  ShowToastOptions,
  ToastComponent,
} from "./types";
import { access } from "./utils";

let toastId = 0;

export const toaster = {
  show: (component: ToastComponent, options?: ShowToastOptions) => {
    const id = toastId++;
    toastStore.add({
      id,
      component,
      dismiss: false,
      update: false,
      region: options?.region,
    });
    return id;
  },
  update: (id: number, component: ToastComponent) => {
    toastStore.update(id, { id, component, dismiss: false, update: true });
  },
  promise: <T, U = unknown>(
    promise: MaybeAccessor<Promise<T>>,
    component: PromissoryToastComponent<T, U>,
    options?: ShowToastOptions,
  ) => {
    const id = toaster.show(
      (props) =>
        component({
          get toastId() {
            return props.toastId;
          },
          state: "pending",
        }),
      options,
    );

    access(promise)
      .then((data) => {
        toaster.update(id, (props) =>
          component({
            get toastId() {
              return props.toastId;
            },
            state: "fulfilled",
            data,
          }),
        );
      })
      .catch((error) => {
        toaster.update(id, (props) =>
          component({
            get toastId() {
              return props.toastId;
            },
            state: "rejected",
            error,
          }),
        );
      });
  },
  dismiss: (id: number) => {
    toastStore.dismiss(id);
    return id;
  },
  clear: () => {
    toastStore.clear();
  },
};
