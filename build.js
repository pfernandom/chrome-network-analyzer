const { build } = require("esbuild");
const {
  dependencies,
  peerDependencies,
  devDependencies,
} = require("./package.json");
const { Generator } = require("npm-dts");

const external = [
  // ...(dependencies ? Object.keys(dependencies) : []),
  ...(peerDependencies ? Object.keys(peerDependencies) : []),
  ...(devDependencies ? Object.keys(devDependencies) : []),
];

const sharedConfig = {
  entryPoints: ["src/scripts/devtools.ts", "src/scripts/panel.tsx"],
  bundle: true,
  minify: false,
  external: external.filter((dep) => !dep.includes("lodash")),
  // platform: "browser",
};
build({
  ...sharedConfig,
  platform: "browser", // for CJS
  outdir: "dist/",
});
build({
  ...sharedConfig,
  outdir: "dist/esm",
  platform: "browser", // for ESM
  format: "esm",
});

// new Generator({
//   entry: "src/scripts/popup.ts",
//   output: "dist/popup.d.ts",
// }).generate();
