import { ToastList as List } from "./toast-list";
import { ToastRegion as Region } from "./toast-region";
import { ToastRoot as Root } from "./toast-root";

export { toaster } from "./toaster";
export const Toast = Object.assign(Root, { List, Region });
