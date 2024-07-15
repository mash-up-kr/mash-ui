import { type Options, defineConfig } from "tsup";

import { options } from "@mash-ui/tsup-config";

const tsupOptions: Options = {
  ...options,
  name: "@mash-ui/solid",
  external: ["solid-js"],
  entry: ["src/index.ts"],
};

export default defineConfig(tsupOptions);
