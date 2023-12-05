const fs = require("fs");
const path = require("path");
const {
  cleanDir,
  toModuleName,
  toSvelte,
  generateIndex,
} = require("svg-to-svelte");
const pkg = require("../package.json");

const dir = "src/lib/workflow";

async function buildWorkflow() {
  fs.mkdirSync(dir, { recursive: true });

  await cleanDir(dir);

  const size_18 = fs
    .readdirSync("node_modules/@adobe/spectrum-css-workflow-icons/dist/18")
    .map((file) => {
      return {
        source: fs.readFileSync(
          path.join(
            "node_modules/@adobe/spectrum-css-workflow-icons/dist/18",
            file,
          ),
          "utf-8",
        ),
        moduleName: toModuleName(file) + "18",
      };
    });

  const size_24 = fs
    .readdirSync("node_modules/@adobe/spectrum-css-workflow-icons/dist/24")
    .map((file) => {
      return {
        source: fs.readFileSync(
          path.join(
            "node_modules/@adobe/spectrum-css-workflow-icons/dist/24",
            file,
          ),
          "utf-8",
        ),
        moduleName: toModuleName(file) + "24",
      };
    });

  const size_24_color = fs
    .readdirSync(
      "node_modules/@adobe/spectrum-css-workflow-icons/dist/color/24",
    )
    .map((file) => {
      return {
        source: fs.readFileSync(
          path.join(
            "node_modules/@adobe/spectrum-css-workflow-icons/dist/color/24",
            file,
          ),
          "utf-8",
        ),
        moduleName: toModuleName(file) + "24",
      };
    });

  const icons = size_18.concat(size_24).concat(size_24_color);

  const exports = icons
    .sort((a, b) => {
      if (a.moduleName > b.moduleName) return 1;
      if (a.moduleName < b.moduleName) return -1;
      return 0;
    })
    .map((icon) => {
      const { template } = toSvelte(icon.source);
      fs.writeFileSync(
        path.join(dir, `${icon.moduleName}.svelte`),
        template,
      );
      return `export { default as ${icon.moduleName} } from "./${icon.moduleName}.svelte";\n`;
    });

  fs.writeFileSync(path.join(dir, "index.js"), exports.join(""));

  await generateIndex({
    title: "Workflow icons",
    pkgName: pkg.name,
    pkgVersion: pkg.version,
    moduleNames: icons.map((icon) => icon.moduleName),
    libraryFolder: "workflow",
    outputFile: "WORKFLOW_ICONS.md",
  });

  return { icons };
}

buildWorkflow();
