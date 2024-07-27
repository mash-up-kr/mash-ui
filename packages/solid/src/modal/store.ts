import type { JSX } from "solid-js";

import { createStore } from "solid-js/store";

export const [modals, setModals] = createStore<{ [id: string]: JSX.Element }>(
  {},
);
