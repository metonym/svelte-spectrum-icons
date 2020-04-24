const { buildWorkflow } = require("./build-workflow");
const { buildUi } = require("./build-ui");
const { performance } = require("perf_hooks");
const fs = require("fs");
const pkg = require("./package.json");

function build() {
  const start = performance.now();
  const workflow = buildWorkflow();
  const ui = buildUi();

  const timing = (performance.now() - start) / 1000;

  process.stdout.write(`Built in ${timing.toFixed(2)}s.`);

  fs.rmdirSync("docs", { recursive: true });
  fs.mkdirSync("docs");

  const docs = [
    "# docs",
    `> ${workflow.moduleNames.length} Workflow icons built with @adobe/spectrum-css-workflow-icons version ${pkg.devDependencies["@adobe/spectrum-css-workflow-icons"]}.`,
    "\n",
    `> ${ui.moduleNames.length} UI icons built with @spectrum-css/icon version ${pkg.devDependencies["@spectrum-css/icon"]}.`,
    "## Usage",
    "### Workflow icons",
    "```html",
    `<script>
       import WorkflowIcon from "svelte-spectrum-icons/workflow/{ModuleName}";
     </script>

     <WorkflowIcon />`,
    "```",
    "#### List of Workflow icons by `ModuleName`",
    workflow.moduleNames.map((moduleName) => `- ${moduleName}`).join("\n"),
    "### UI icons",
    "```html",
    `<script>
       import UiIcon from "svelte-spectrum-icons/ui/{ModuleName}";
     </script>

     <UiIcon />`,
    "```",
    "#### List of UI icons by `ModuleName`",
    ui.moduleNames.map((moduleName) => `- ${moduleName}`).join("\n"),
  ];

  fs.writeFileSync("docs/README.md", docs.join("\n"));
}

build();
