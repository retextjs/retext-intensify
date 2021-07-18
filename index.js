import unique from 'arr-union'
import difference from 'array-differ'
import {pointStart, pointEnd} from 'unist-util-position'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {fillers} from 'fillers'
import {hedges} from 'hedges'
import {weasels} from 'weasels'

var list = unique([], fillers, hedges, weasels).sort()

var source = 'retext-intensify'

// Types.
var filler = 'filler'
var hedge = 'hedge'
var weasel = 'weasel'

// Reasons.
var reason = {}

reason[filler] = 'it doesn’t add meaning'
reason[weasel] = 'it’s vague or ambiguous'
reason[hedge] = 'it lessens impact'

// Attacher.
export default function retextIntensify(options) {
  var ignore = (options || {}).ignore || []
  var phrases = difference(list, ignore)

  return transformer

  // Search `tree` for validations.
  function transformer(tree, file) {
    search(tree, phrases, searcher)

    function searcher(match, index, parent, phrase) {
      var type = weasel
      var actual = toString(match)
      var message

      if (weasels.indexOf(phrase) === -1) {
        type = fillers.indexOf(phrase) === -1 ? hedge : filler
      }

      message = file.message(
        'Don’t use ' + quotation(actual, '`') + ', ' + reason[type],
        {
          start: pointStart(match[0]),
          end: pointEnd(match[match.length - 1])
        },
        [source, type].join(':')
      )

      message.actual = actual
      message.expected = []
    }
  }
}
