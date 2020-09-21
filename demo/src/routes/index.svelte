<script>
  import * as workflow from "svelte-spectrum-icons/workflow";
  import * as ui from "svelte-spectrum-icons/ui";
  import { Navigation, Box } from "svelte-primer";
  import Copy from "../components/Copy.svelte";

  let tabIndexInstall = 0;

  $: codeInstall =
    tabIndexInstall === 0
      ? "yarn add -D svelte-spectrum-icons"
      : "npm -i -D svelte-spectrum-icons";
</script>

<div class="clearfix mb-6">
  <div class="col-6 float-left px-1">
    <h1 class="mb-3">svelte-spectrum-icons</h1>
    <h2 class="mb-2">Install</h2>
    <Navigation.TabNav>
      <Navigation.TabNavItem
        current={tabIndexInstall === 0}
        on:click={(e) => {
          e.preventDefault();
          tabIndexInstall = 0;
        }}>
        yarn
      </Navigation.TabNavItem>
      <Navigation.TabNavItem
        current={tabIndexInstall === 1}
        on:click={(e) => {
          e.preventDefault();
          tabIndexInstall = 1;
        }}>
        npm
      </Navigation.TabNavItem>
    </Navigation.TabNav>
    <Box.Box class="d-flex">
      <pre class="d-flex flex-1">
        <code class="p-3">{codeInstall}</code>
      </pre>
      <Copy text={codeInstall} />
    </Box.Box>
  </div>
</div>

<div class="clearfix mb-6">
  <div class="col-6 float-left px-1">
    <h2 class="mb-2">Usage</h2>
    <Box.Box class="d-flex">
      <pre class="d-flex flex-1">
        <code class="p-3">
          {`<script>
  import Asterisk from "svelte-spectrum-icons/ui/Asterisk.svelte";
  import Add24 from "svelte-spectrum-icons/workflow/Add24.svelte";
<\/script>

<Asterisk />
<Add24 />`}
        </code>
      </pre>
    </Box.Box>
  </div>
</div>

<div class="d-flex flex-column">
  <h3 class="mb-2">UI</h3>
  <div class="mb-3">{Object.keys(ui).length} icons</div>
  <div class="d-flex flex-wrap mb-6">
    {#each Object.keys(ui) as icon, i (icon)}
      <Box.Box class="p-2 mr-1 mb-2">
        <div class="mb-1">
          <h6>{icon}</h6>
        </div>
        <div>
          <svelte:component this={ui[icon]} />
        </div>
      </Box.Box>
    {/each}
  </div>

  <h2 class="mb-2">Available icons</h2>
  <h3 class="mb-2">Workflow</h3>
  <div class="mb-3">{Object.keys(workflow).length} icons</div>
  <div class="d-flex flex-wrap">
    {#each Object.keys(workflow) as icon, i (icon)}
      <Box.Box class="p-2 mr-1 mb-2">
        <div class="mb-1">
          <h6>{icon}</h6>
        </div>
        <div>
          <svelte:component this={workflow[icon]} width="24" height="24" />
        </div>
      </Box.Box>
    {/each}
  </div>
</div>
