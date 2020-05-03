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

  Object.keys(UI_folders).forEach(async (folder) => {
    const ui = await generateFromFolder(
      `node_modules/@spectrum-css/icon/${folder}`,
      "ui",
      {
        onModuleName: (moduleName) => moduleName + UI_folders[folder],
      }
    );

    UI = [...UI, ...ui.moduleNames];
  });

  await cleanDir("workflow");

  const Workflow_folders = {
    "18": "18",
    "24": "24",
    "color/24": "24",
  };

  Object.keys(Workflow_folders).forEach(async (folder) => {
    const workflow = await generateFromFolder(
      `node_modules/@adobe/spectrum-css-workflow-icons/dist/${folder}`,
      "workflow",
      {
        onModuleName: (moduleName) => moduleName + Workflow_folders[folder],
      }
    );

    Workflow = [...Workflow, ...workflow.moduleNames];
  });

  await cleanDir("docs");

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

  fs.writeFileSync("docs/README.md", docs);
}

build();
