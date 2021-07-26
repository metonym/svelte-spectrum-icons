# svelte-spectrum-icons

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Adobe Spectrum Workflow and UI SVG icons as Svelte components.

This library builds [Adobe Spectrum Workflow and UI icons](https://spectrum.adobe.com/page/icons/) as Svelte components with zero dependencies.

Spectrum icons have two sizes: `18` for desktop and `24` for mobile.

For Workflow icons, the sizes are appended to the icon name. For example, `Add` becomes `Add18` and `Add24`.

For UI icons, the word "Mobile" is appended to the icon name; `Asterisk` is size `18` while `AsteriskMobile` is size `24`.

Try it in the [Svelte REPL](https://svelte.dev/repl/8b2c2ef9ad68426bb320d455026b666e).

## [Icon Preview](https://metonym.github.io/svelte-spectrum-icons/)

## Install

```sh
yarn add -D svelte-spectrum-icons
# OR
npm i -D svelte-spectrum-icons
```

## Usage

```html
<script>
  import Asterisk from "svelte-spectrum-icons/ui/Asterisk.svelte";
  import Add24 from "svelte-spectrum-icons/workflow/Add24.svelte";
</script>

<Asterisk />
<Add24 />
```

For a full list of supported icons:

- **UI**: [UI_ICONS.md](UI_ICONS.md)
- **Workflow**: [WORKFLOW_ICONS.md](WORKFLOW_ICONS.md)

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
