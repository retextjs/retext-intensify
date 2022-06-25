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
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

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

…and our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {retext} from 'retext'
import retextIntensify from 'retext-intensify'

cosnt file = await retext()
  .use(retextIntensify)
  .process(await read('example.txt'))

console.error(reporter(file))
```

…now running `node example.js` yields:

```txt
example.txt
    1:1-1:5  warning  Don’t use `Some`, it’s vague or ambiguous       weasel  retext-intensify
  1:13-1:16  warning  Don’t use `say`, it lessens impact              hedge   retext-intensify
  1:27-1:32  warning  Don’t use `quite`, it’s vague or ambiguous      weasel  retext-intensify
  1:33-1:37  warning  Don’t use `some`, it’s vague or ambiguous       weasel  retext-intensify
  2:11-2:21  warning  Don’t use `apparently`, it doesn’t add meaning  filler  retext-intensify

⚠ 5 warnings
```

## API

This package exports no identifiers.
The default export is `retextIntensify`.

### `unified().use(retextIntensify[, options])`

Check for weak and mitigating wording.

##### `options`

Configuration (optional).

###### `options.ignore`

Phrases *not* to warn about (`Array<string>`).

## Messages

Each message is emitted as a [`VFileMessage`][message] on `file`, with the
following fields:

###### `message.source`

Name of this plugin (`'retext-intensify'`).

###### `message.ruleId`

Category of warning (`'filler'`, `'hedge'`, or `'weasel'`)

###### `message.actual`

Current not ok phrase (`string`).

###### `message.expected`

Empty array to signal that `actual` should be removed (`[]`).

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Options`.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

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

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-intensify.svg

[size]: https://bundlephobia.com/result?p=retext-intensify

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

[unified]: https://github.com/unifiedjs/unified

[retext]: https://github.com/retextjs/retext

[message]: https://github.com/vfile/vfile-message

[wiki-weasels]: https://en.wikipedia.org/wiki/Weasel_word

[wiki-fillers]: https://en.wikipedia.org/wiki/Filler_%28linguistics%29

[wiki-hedges]: https://en.wikipedia.org/wiki/Hedge_%28linguistics%29
