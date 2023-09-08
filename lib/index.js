/**
 * @typedef {import('nlcst').Root} Root
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {Array<string>} [ignore]
 *   Phrases *not* to warn about.
 */

import {pointStart, pointEnd} from 'unist-util-position'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {fillers} from 'fillers'
import {hedges} from 'hedges'
import {weasels} from 'weasels'

const list = [...new Set([...fillers, ...hedges, ...weasels])].sort()

const source = 'retext-intensify'
const url = 'https://github.com/retextjs/retext-intensify#readme'

/**
 * Plugin to check for weak and mitigating wording.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
export default function retextIntensify(options = {}) {
  const ignore = options.ignore || []
  const phrases =
    ignore.length > 0 ? list.filter((d) => !ignore.includes(d)) : list

  return (tree, file) => {
    search(tree, phrases, (match, _, _1, phrase) => {
      const actual = toString(match)
      let ruleId = 'weasel'
      const start = pointStart(match[0])
      const end = pointEnd(match[match.length - 1])

      if (!weasels.includes(phrase)) {
        ruleId = fillers.includes(phrase) ? 'filler' : 'hedge'
      }

      Object.assign(
        file.message(
          'Don’t use ' +
            quotation(actual, '`') +
            ', ' +
            (ruleId === 'weasel'
              ? 'it’s vague or ambiguous'
              : ruleId === 'filler'
              ? 'it doesn’t add meaning'
              : 'it lessens impact'),
          {
            /* c8 ignore next -- hard to test */
            place: start && end ? {start, end} : undefined,
            source,
            ruleId
          }
        ),
        {actual, expected: [], url}
      )
    })
  }
}
