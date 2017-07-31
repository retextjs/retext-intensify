# retext-intensify [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

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
var vfile = require('to-vfile');
var report = require('vfile-reporter');
var retext = require('retext');
var intensify = require('retext-intensify');

retext()
  .use(intensify)
  .process(vfile.readSync('example.txt'), function (err, file) {
    console.error(report(err || file));
  });
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

*   [`retext-equality`](https://github.com/wooorm/retext-equality)
    — Check possible insensitive, inconsiderate language
*   [`retext-passive`](https://github.com/wooorm/retext-passive)
    — Check passive voice
*   [`retext-profanities`](https://github.com/wooorm/retext-profanities)
    — Check profane and vulgar wording
*   [`profanities`](https://github.com/wooorm/profanities)
    — List of profane words
*   [`hedges`](https://github.com/wooorm/hedges)
    — List of hedge words
*   [`fillers`](https://github.com/wooorm/fillers)
    — List of filler words
*   [`weasels`](https://github.com/wooorm/weasels)
    — List of weasel words

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-intensify.svg

[travis]: https://travis-ci.org/wooorm/retext-intensify

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-intensify.svg

[codecov]: https://codecov.io/github/wooorm/retext-intensify

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext

[wiki-weasels]: https://en.wikipedia.org/wiki/Weasel_word

[wiki-fillers]: https://en.wikipedia.org/wiki/Filler_%28linguistics%29

[wiki-hedges]: https://en.wikipedia.org/wiki/Hedge_%28linguistics%29
