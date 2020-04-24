const fs = require("fs");
const pkg = require("./package.json");
const { cleanDir, generateFromFolder } = require("svg-to-svelte");

function build() {
  let UI = [];
  let Workflow = [];

  const UI_folders = {
    large: "Mobile",
    medium: "",
  };

  Object.keys(UI_folders).forEach((folder, i) => {
    const ui = generateFromFolder(
      `node_modules/@spectrum-css/icon/${folder}`,
      "ui",
      {
        clean: i === 0,
        onModuleName: (moduleName) => moduleName + UI_folders[folder],
      }
    );

    UI = [...UI, ...ui.moduleNames];
  });

  const Workflow_folders = {
    "18": "18",
    "24": "24",
    "color/24": "24",
  };

  Object.keys(Workflow_folders).forEach((folder, i) => {
    const workflow = generateFromFolder(
      `node_modules/@adobe/spectrum-css-workflow-icons/dist/${folder}`,
      "workflow",
      {
        clean: i === 0,
        onModuleName: (moduleName) => moduleName + Workflow_folders[folder],
      }
    );

    Workflow = [...Workflow, ...workflow.moduleNames];
  });

  cleanDir("docs");

  const docs = [
    "# docs",
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
    Workflow.map((moduleName) => `- ${moduleName}`).join("\n"),
    "### UI icons",
    "```html",
    `<script>
       import UiIcon from "svelte-spectrum-icons/ui/{ModuleName}";
     </script>

     <UiIcon />`,
    "```",
    "#### List of UI icons by `ModuleName`",
    UI.map((moduleName) => `- ${moduleName}`).join("\n"),
  ].join("\n");

  fs.writeFileSync("docs/README.md", docs);
}

build();
