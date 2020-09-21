const fs = require("fs");
const pkg = require("./package.json");
const { cleanDir, generateFromFolder } = require("svg-to-svelte");

async function build() {
  let UI = [];
  let Workflow = [];

  const UI_folders = {
    large: "Mobile",
    medium: "",
  };

  await cleanDir("ui");

  await Promise.all(
    Object.keys(UI_folders).map(async (folder) => {
      const ui = await generateFromFolder(
        `node_modules/@spectrum-css/icon/${folder}`,
        "ui",
        {
          clean: false,
          onModuleName: (moduleName) => {
            const module_name = moduleName + UI_folders[folder];
            UI.push(module_name);
            return module_name;
          },
        }
      );
    })
  );

  await cleanDir("workflow");

  const Workflow_folders = {
    18: "18",
    24: "24",
    "color/24": "24",
  };

  await Promise.all(
    Object.keys(Workflow_folders).map(async (folder) => {
      const workflow = await generateFromFolder(
        `node_modules/@adobe/spectrum-css-workflow-icons/dist/${folder}`,
        "workflow",
        {
          clean: false,
          onModuleName: (moduleName) => {
            const module_name = moduleName + Workflow_folders[folder];
            Workflow.push(module_name);
            return module_name;
          },
        }
      );
    })
  );

  return { UI, Workflow };
}

function write({ UI, Workflow }) {
  const docs = [
    "# Icon Index",
    `> ${Workflow.length} Workflow icons from @adobe/spectrum-css-workflow-icons@${pkg.devDependencies["@adobe/spectrum-css-workflow-icons"]}.\n`,
    `> ${UI.length} UI icons from @spectrum-css/icon@${pkg.devDependencies["@spectrum-css/icon"]}.`,
    "## Usage",
    "### Workflow icons",
    "```html",
    `<script>
       import WorkflowIcon from "svelte-spectrum-icons/workflow/{ModuleName}";
     </script>

     <WorkflowIcon />`,
    "```",
    "#### List of Workflow icons by `ModuleName`",
    Workflow.sort()
      .map((moduleName) => `- ${moduleName}`)
      .join("\n"),
    "### UI icons",
    "```html",
    `<script>
       import UiIcon from "svelte-spectrum-icons/ui/{ModuleName}";
     </script>

     <UiIcon />`,
    "```",
    "#### List of UI icons by `ModuleName`",
    UI.sort()
      .map((moduleName) => `- ${moduleName}`)
      .join("\n"),
  ].join("\n");

  fs.writeFileSync("ICON_INDEX.md", docs);
}

(async () => {
  const result = await build();
  write(result);
})();
