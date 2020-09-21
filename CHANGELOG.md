# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0](https://github.com/metonym/svelte-spectrum-icons/releases/tag/v2.0.0) - 2020-09-21

- Fix build script to generate full UI/Workflow icon set
- Eliminate folder-level components

**Breaking Changes**

A direct import must be prefixed with the `.svelte` extension.

```diff
- import Icon from "svelte-spectrum-icons/ui/AlertSmall";
+ import Icon from "svelte-spectrum-icons/ui/AlertSmall.svelte";
```

## [1.1.0](https://github.com/metonym/svelte-spectrum-icons/releases/tag/v1.1.0) - 2020-09-21

- [UNRELEASED] Upgrade `@adobe/spectrum-css-workflow-icons` to 1.1.0 (+20 workflow icons)

## [1.0.0](https://github.com/metonym/svelte-spectrum-icons/releases/tag/v1.0.0) - 2020-09-02

- Upgrade `svg-to-svelte` to 2.0.0

## [0.1.1](https://github.com/metonym/svelte-spectrum-icons/releases/tag/v0.1.1) - 2020-04-24

- Update documentation

## [0.1.0](https://github.com/metonym/svelte-spectrum-icons/releases/tag/v0.1.0) - 2020-04-24

- Initial release
