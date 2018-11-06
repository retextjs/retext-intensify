# retext-intensify [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Chat][chat-badge]][chat]

Check for weak and mitigating wording with [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-intensify
```

## Usage

Say we have the following file, `example.txt`:

```text
Some people say there are quite some
problems, apparently.
```

And our script, `example.js`, looks as follows:

```javascript
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

```text
example.txt
    1:1-1:5  warning  Don’t use “Some”, it’s vague or ambiguous       weasel  retext-intensify
  1:13-1:16  warning  Don’t use “say”, it lessens impact              hedge   retext-intensify
  1:27-1:32  warning  Don’t use “quite”, it’s vague or ambiguous      weasel  retext-intensify
  1:33-1:37  warning  Don’t use “some”, it’s vague or ambiguous       weasel  retext-intensify
  2:11-2:21  warning  Don’t use “apparently”, it doesn’t add meaning  filler  retext-intensify

⚠ 5 warnings
```

## API

### `retext().use(intensify[, options])`

Check for weak and mitigating wording: [weasels][wiki-weasels],
[hedges][wiki-hedges], and [fillers][wiki-fillers].

###### `options.ignore`

phrases _not_ to warn about (`Array.<string>`).

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

See [`contributing.md` in `retextjs/retext`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext-intensify.svg

[build]: https://travis-ci.org/retextjs/retext-intensify

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-intensify.svg

[coverage]: https://codecov.io/github/retextjs/retext-intensify

[downloads-badge]: https://img.shields.io/npm/dm/retext-intensify.svg

[downloads]: https://www.npmjs.com/package/retext-intensify

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[wiki-weasels]: https://en.wikipedia.org/wiki/Weasel_word

[wiki-fillers]: https://en.wikipedia.org/wiki/Filler_%28linguistics%29

[wiki-hedges]: https://en.wikipedia.org/wiki/Hedge_%28linguistics%29

[contributing]: https://github.com/retextjs/retext/blob/master/contributing.md

[coc]: https://github.com/retextjs/retext/blob/master/code-of-conduct.md
