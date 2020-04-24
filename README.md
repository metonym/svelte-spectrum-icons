# svelte-spectrum-icons

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Adobe Spectrum Workflow and UI SVG icons as Svelte components.

This library builds [Adobe Spectrum Workflow and UI icons](https://spectrum.adobe.com/page/icons/) as Svelte components with zero dependencies.

Spectrum icons have two sizes: `18` for desktop and `24` for mobile.

For Workflow icons, the sizes are appended to the icon name. For example, `Add` becomes `Add18` and `Add24`.

For UI icons, the word "Mobile" is appended to the icon name; `Asterisk` is size `18` while `AsteriskMobile` is size `24`.

## Install

```bash
yarn add -D svelte-spectrum-icons
```

## Usage

Workflow icons are located in the `workflow` folder while UI icons are in the `ui` folder.

```html
<script>
  import Add18 from "svelte-spectrum-icons/workflow/Add18";
  import Asterisk from "svelte-spectrum-icons/ui/Asterisk";
</script>

<Add18 />
<Asterisk />
```

Refer to [docs/README.md](docs/README.md) for a full list of supported icons:

- [Workflow icons](docs/README.md#workflow-icons)
- [UI icons](docs/README.md#ui-icons)

## API

`$$restProps` are forwarded to the `svg` element.

### Forwarded events

- on:click
- on:mouseover
- on:mouseenter
- on:mouseout
- on:keydown

## [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-spectrum-icons.svg?color=blue
[npm-url]: https://npmjs.com/package/svelte-spectrum-icons
[build]: https://travis-ci.com/metonym/svelte-spectrum-icons.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/svelte-spectrum-icons
