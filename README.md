# svelte-spectrum-icons

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Adobe Spectrum Workflow and UI SVG icons as Svelte components.

This library builds [Adobe Spectrum Workflow and UI icons](https://spectrum.adobe.com/page/icons/) as Svelte components with zero dependencies.

Spectrum icons have two sizes: `18` for desktop and `24` for mobile.

For Workflow icons, the sizes are appended to the icon name. For example, `Add` becomes `Add18` and `Add24`.

For UI icons, the word "Mobile" is appended to the icon name; `Asterisk` is size `18` while `AsteriskMobile` is size `24`.

Try it in the [Svelte REPL](https://svelte.dev/repl/8b2c2ef9ad68426bb320d455026b666e?version=3.24.1).

## [Icon Preview](https://metonym.github.io/svelte-spectrum-icons/)

## Install

```sh
yarn add -D svelte-spectrum-icons
# OR
npm -i -D svelte-spectrum-icons
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

Refer to [ICON_INDEX.md](ICON_INDEX.md) for a full list of supported icons:

- [Workflow icons](ICON_INDEX.md#workflow-icons)
- [UI icons](ICON_INDEX.md#ui-icons)

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
