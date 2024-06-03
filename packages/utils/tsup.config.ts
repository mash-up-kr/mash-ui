import { defineConfig, type Options } from "tsup";

import { options } from "@mash-ui/tsup-config";

const tsupOptions: Options = {
  ...options,
  name: "@mash-ui/react",
  external: ["react"],
};

export default defineConfig(tsupOptions);
