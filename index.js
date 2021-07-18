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

// Reasons.
const reason = {}

reason.filler = 'it doesn’t add meaning'
reason.weasel = 'it’s vague or ambiguous'
reason.hedge = 'it lessens impact'

// Attacher.
export default function retextIntensify(options = {}) {
  const phrases = difference(list, options.ignore || [])

  return transformer

  // Search `tree` for validations.
  function transformer(tree, file) {
    search(tree, phrases, searcher)

    function searcher(match, index, parent, phrase) {
      const actual = toString(match)
      let type = 'weasel'

      if (!weasels.includes(phrase)) {
        type = fillers.includes(phrase) ? 'filler' : 'hedge'
      }

      Object.assign(
        file.message(
          'Don’t use ' + quotation(actual, '`') + ', ' + reason[type],
          {
            start: pointStart(match[0]),
            end: pointEnd(match[match.length - 1])
          },
          [source, type].join(':')
        ),
        {
          actual,
          expected: []
        }
      )
    }
  }
}
