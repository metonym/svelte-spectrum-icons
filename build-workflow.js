const fs = require("fs");
const path = require("path");
const { createModuleName, toSvelte } = require("./build-utils");

function buildWorkflow() {
  const folders = {
    "18": "18",
    "24": "24",
    "color/24": "24",
  };

  fs.rmdirSync("workflow", { recursive: true });
  fs.mkdirSync("workflow");

  const moduleNames = [];
  const imports = [];

  const dist = path.join(
    "node_modules/@adobe/spectrum-css-workflow-icons/dist"
  );

  Object.keys(folders).forEach((folder) => {
    const files = fs.readdirSync(path.join(dist, folder));

    files.forEach((file) => {
      const source = fs.readFileSync(path.join(dist, folder, file)).toString();
      const suffix = folders[folder];
      const moduleName = createModuleName(file) + suffix;

      moduleNames.push(moduleName);

      fs.mkdirSync(`workflow/${moduleName}`);
      fs.writeFileSync(
        `workflow/${moduleName}/${moduleName}.svelte`,
        toSvelte(source)
      );
      fs.writeFileSync(
        `workflow/${moduleName}/index.js`,
        `import ${moduleName} from "./${moduleName}.svelte";
         export { ${moduleName} };
         export default ${moduleName};`
      );

      imports.push(`export { ${moduleName} } from "./${moduleName}";`);
    });
  });

  fs.writeFileSync("workflow/index.js", imports.join(""));
  process.stdout.write(`${moduleNames.length} workflow icons` + "\n");

  return { moduleNames };
}

module.exports = { buildWorkflow };
