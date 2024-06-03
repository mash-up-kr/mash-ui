import { defineConfig, type Options } from "tsup";

import { options } from "@mash-ui/tsup-config";

const tsupOptions: Options = {
  ...options,
  name: "@mash-ui/react",
  external: ["react"],
  entry: [
    "src/baek2back/index.ts",
    "src/brightbong92/index.ts",
    "src/polee/index.ts",
    "src/minsgy/index.ts",
  ],
};

export default defineConfig(tsupOptions);
