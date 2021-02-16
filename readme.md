# retext-intensify

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**retext**][retext] plugin to check for weak and mitigating wording.

## Install

[npm][]:

```sh
npm install retext-intensify
```

## Use

Say we have the following file, `example.txt`:

```txt
Some people say there are quite some
problems, apparently.
```

…and our script, `example.js`, looks as follows:

```js
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var retext = require('retext')
var intensify = require('retext-intensify')

retext()
  .use(intensify)
  .process(vfile.readSync('example.txt'), function(err, file) {
    console.error(report(err || file))
  })
```

Yields:

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

### `retext().use(intensify[, options])`

Check for weak and mitigating wording: [weasels][wiki-weasels],
[hedges][wiki-hedges], and [fillers][wiki-fillers].

###### `options.ignore`

Phrases *not* to warn about (`Array.<string>`).

### Messages

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

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — Check possible insensitive, inconsiderate language
*   [`retext-passive`](https://github.com/retextjs/retext-passive)
    — Check passive voice
*   [`retext-profanities`](https://github.com/retextjs/retext-profanities)
    — Check profane and vulgar wording
*   [`profanities`](https://github.com/words/profanities)
    — List of profane words
*   [`hedges`](https://github.com/words/hedges)
    — List of hedge words
*   [`fillers`](https://github.com/words/fillers)
    — List of filler words
*   [`weasels`](https://github.com/words/weasels)
    — List of weasel words

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

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/retextjs/.github/blob/HEAD/support.md

[coc]: https://github.com/retextjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[message]: https://github.com/vfile/vfile-message

[wiki-weasels]: https://en.wikipedia.org/wiki/Weasel_word

[wiki-fillers]: https://en.wikipedia.org/wiki/Filler_%28linguistics%29

[wiki-hedges]: https://en.wikipedia.org/wiki/Hedge_%28linguistics%29
