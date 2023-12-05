const fs = require("fs");
const path = require("path");
const {
  cleanDir,
  toModuleName,
  toSvelte,
  generateIndex,
} = require("svg-to-svelte");
const pkg = require("../package.json");

const dir = "src/lib/ui";

async function buildUi() {
  fs.mkdirSync(dir, { recursive: true });

  await cleanDir(dir);

  const large = fs
    .readdirSync("node_modules/@spectrum-css/icon/large")
    .map((file) => {
      return {
        source: fs.readFileSync(
          path.join("node_modules/@spectrum-css/icon/large", file),
          "utf-8",
        ),
        moduleName: toModuleName(file) + "Mobile",
      };
    });
  const medium = fs
    .readdirSync("node_modules/@spectrum-css/icon/medium")
    .map((file) => {
      return {
        source: fs.readFileSync(
          path.join("node_modules/@spectrum-css/icon/medium", file),
          "utf-8",
        ),
        moduleName: toModuleName(file),
      };
    });

  const icons = large.concat(medium);

  const exports = icons
    .sort((a, b) => {
      if (a.moduleName > b.moduleName) return 1;
      if (a.moduleName < b.moduleName) return -1;
      return 0;
    })
    .map((icon) => {
      const { template } = toSvelte(icon.source);
      fs.writeFileSync(path.join(dir, `${icon.moduleName}.svelte`), template);
      return `export { default as ${icon.moduleName} } from "./${icon.moduleName}.svelte";\n`;
    });

  fs.writeFileSync(path.join(dir, "index.js"), exports.join(""));

  await generateIndex({
    title: "UI icons",
    pkgName: pkg.name,
    pkgVersion: pkg.version,
    moduleNames: icons.map((icon) => icon.moduleName),
    libraryFolder: "ui",
    outputFile: "UI_ICONS.md",
  });

  return { icons };
}

buildUi();
