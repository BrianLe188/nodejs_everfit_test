import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  bundle: true,
  platform: "node",
  format: "cjs",
  sourcemap: true,
  alias: {
    "@": "./src",
  },
}).catch(() => process.exit(1));
