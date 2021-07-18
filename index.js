/**
 * @typedef Options
 *   Configuration.
 * @property {string[]} [ignore]
 *   Phrases *not* to warn about.
 */

import unique from 'arr-union'
import difference from 'array-differ'
import {pointStart, pointEnd} from 'unist-util-position'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {fillers} from 'fillers'
import {hedges} from 'hedges'
import {weasels} from 'weasels'

const list = unique([], fillers, hedges, weasels).sort()

const source = 'retext-intensify'

/**
 * Plugin to check for weak and mitigating wording.
 *
 * @type {import('unified').Plugin<[Options?]>}
 */
export default function retextIntensify(options = {}) {
  const phrases = difference(list, options.ignore || [])

  return (tree, file) => {
    search(tree, phrases, (match, _, _1, phrase) => {
      const actual = toString(match)
      let type = 'weasel'

      if (!weasels.includes(phrase)) {
        type = fillers.includes(phrase) ? 'filler' : 'hedge'
      }

      Object.assign(
        file.message(
          'Don’t use ' +
            quotation(actual, '`') +
            ', ' +
            (type === 'weasel'
              ? 'it’s vague or ambiguous'
              : type === 'filler'
              ? 'it doesn’t add meaning'
              : 'it lessens impact'),
          {start: pointStart(match[0]), end: pointEnd(match[match.length - 1])},
          [source, type].join(':')
        ),
        {actual, expected: []}
      )
    })
  }
}
