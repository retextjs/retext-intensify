# retext-intensify

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to check for weak and mitigating wording.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(retextIntensify[, options])`](#unifieduseretextintensify-options)
    *   [`Options`](#options)
*   [Messages](#messages)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin to check for words that are
weak: [weasels][wiki-weasels], [hedges][wiki-hedges], and
[fillers][wiki-fillers].

## When should I use this?

You can opt-into this plugin when you’re dealing with content that might contain
vague wording, and have authors that can fix that content.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install retext-intensify
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextIntensify from 'https://esm.sh/retext-intensify@6'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextIntensify from 'https://esm.sh/retext-intensify@6?bundle'
</script>
```

## Use

Say our document `example.txt` contains:

```txt
Some people say there are quite some
problems, apparently.
```

…and our module `example.js` contains:

```js
import {retext} from 'retext'
import retextIntensify from 'retext-intensify'
import {read} from 'to-vfile'
import {reporter} from 'vfile-reporter'

const file = await retext()
  .use(retextIntensify)
  .process(await read('example.txt'))

console.error(reporter(file))
```

…then running `node example.js` yields:

```txt
example.txt
1:1-1:5   warning Unexpected weasel (vague or ambiguous) word `Some`    weasel retext-intensify
1:13-1:16 warning Unexpected hedge (uncertain or indecisive) word `say` hedge  retext-intensify
1:27-1:32 warning Unexpected weasel (vague or ambiguous) word `quite`   weasel retext-intensify
1:33-1:37 warning Unexpected weasel (vague or ambiguous) word `some`    weasel retext-intensify
2:11-2:21 warning Unexpected filler (meaningless) word `apparently`     filler retext-intensify

⚠ 5 warnings
```

## API

This package exports no identifiers.
The default export is [`retextIntensify`][api-retext-intensify].

### `unified().use(retextIntensify[, options])`

Check for weak and mitigating wording.

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `ignore` (`Array<string>`, optional)
    — phrases *not* to warn about

## Messages

Each message is emitted as a [`VFileMessage`][vfile-message] on `file`, with
`source` set to `'retext-intensify'`, `ruleId` to `'filler'`, `'hedge'`, or
`'weasel'`, `actual` to the unexpected phrase, and `expected` to an empty
array.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `retext-intensify@^7`,
compatible with Node.js 16.

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — check possible insensitive, inconsiderate language
*   [`retext-passive`](https://github.com/retextjs/retext-passive)
    — check passive voice
*   [`retext-profanities`](https://github.com/retextjs/retext-profanities)
    — check profane and vulgar wording
*   [`profanities`](https://github.com/words/profanities)
    — list of profane words
*   [`hedges`](https://github.com/words/hedges)
    — list of hedge words
*   [`fillers`](https://github.com/words/fillers)
    — list of filler words
*   [`weasels`](https://github.com/words/weasels)
    — list of weasel words

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-intensify/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-intensify/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-intensify.svg

[coverage]: https://codecov.io/github/retextjs/retext-intensify

[downloads-badge]: https://img.shields.io/npm/dm/retext-intensify.svg

[downloads]: https://www.npmjs.com/package/retext-intensify

[size-badge]: https://img.shields.io/bundlejs/size/retext-intensify

[size]: https://bundlejs.com/?q=retext-intensify

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[vfile-message]: https://github.com/vfile/vfile-message

[wiki-weasels]: https://en.wikipedia.org/wiki/Weasel_word

[wiki-fillers]: https://en.wikipedia.org/wiki/Filler_%28linguistics%29

[wiki-hedges]: https://en.wikipedia.org/wiki/Hedge_%28linguistics%29

[api-options]: #options

[api-retext-intensify]: #unifieduseretextintensify-options
