import type { Options } from "tsup";
import { defineConfig } from "tsup";

import { options } from "@mash-ui/tsup-config";

const tsupOptions: Options = {
	...options,
	name: "@polee/react-ui",
	external: ["react"],
};

export default defineConfig(tsupOptions);
