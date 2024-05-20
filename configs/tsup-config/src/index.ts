import type { Options } from 'tsup';

export const options: Options = {
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  target: 'esnext',
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  replaceNodeEnv: true,
  splitting: true,
  dts: true,
  env: {
    NODE_ENV: 'production',
  },
};
