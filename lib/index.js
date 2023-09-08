/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {ReadonlyArray<string> | null | undefined} [ignore]
 *   Phrases *not* to warn about (optional).
 */

import {fillers} from 'fillers'
import {hedges} from 'hedges'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {pointEnd, pointStart} from 'unist-util-position'
import {weasels} from 'weasels'

/** @type {Readonly<Options>} */
const emptyOptions = {}
/** @type {ReadonlyArray<never>} */
const emptyIgnore = []

const list = [...new Set([...fillers, ...hedges, ...weasels])].sort()

/**
 * Check for weak and mitigating wording.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function retextIntensify(options) {
  const settings = options || emptyOptions
  const ignore = settings.ignore || emptyIgnore
  const phrases =
    ignore.length > 0
      ? list.filter(function (d) {
          return !ignore.includes(d)
        })
      : list

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree, file) {
    search(tree, phrases, function (match, _, parent, phrase) {
      const actual = toString(match)
      const start = pointStart(match[0])
      const end = pointEnd(match[match.length - 1])
      const ruleId = weasels.includes(phrase)
        ? 'weasel'
        : fillers.includes(phrase)
        ? 'filler'
        : 'hedge'

      const message = file.message(
        'Don’t use ' +
          quotation(actual, '`') +
          ', ' +
          (ruleId === 'weasel'
            ? 'it’s vague or ambiguous'
            : ruleId === 'filler'
            ? 'it doesn’t add meaning'
            : 'it lessens impact'),
        {
          ancestors: [parent],
          /* c8 ignore next -- hard to test */
          place: start && end ? {start, end} : undefined,
          ruleId,
          source: 'retext-intensify'
        }
      )

      message.actual = actual
      message.expected = []
      message.url = 'https://github.com/retextjs/retext-intensify#readme'
    })
  }
}
