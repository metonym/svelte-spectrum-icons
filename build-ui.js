const fs = require("fs");
const path = require("path");
const { createModuleName, toSvelte } = require("./build-utils");

function buildUi() {
  const folders = {
    large: "Mobile",
    medium: "",
  };

  fs.rmdirSync("ui", { recursive: true });
  fs.mkdirSync("ui");

  const moduleNames = [];
  const imports = [];

  const dist = path.join("node_modules/@spectrum-css/icon/");
  const files = fs.readdirSync(dist);

  Object.keys(folders).forEach((folder) => {
    const files = fs.readdirSync(path.join(dist, folder));

    files.forEach((file) => {
      const source = fs.readFileSync(path.join(dist, folder, file)).toString();
      const suffix = folders[folder];
      const moduleName = createModuleName(file) + suffix;

      moduleNames.push(moduleName);

      fs.mkdirSync(`ui/${moduleName}`);
      fs.writeFileSync(
        `ui/${moduleName}/${moduleName}.svelte`,
        toSvelte(source)
      );
      fs.writeFileSync(
        `ui/${moduleName}/index.js`,
        `import ${moduleName} from "./${moduleName}.svelte";
         export { ${moduleName} };
         export default ${moduleName};`
      );

      imports.push(`export { ${moduleName} } from "./${moduleName}";`);
    });
  });

  fs.writeFileSync("ui/index.js", imports.join(""));
  process.stdout.write(`${moduleNames.length} UI icons` + "\n");

  return { moduleNames };
}

module.exports = { buildUi };
