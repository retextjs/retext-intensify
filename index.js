import difference from 'array-differ'
import toString from 'nlcst-to-string'
import search from 'nlcst-search'
import position from 'unist-util-position'
import quote from 'quotation'
import {fillers} from 'fillers'
import {hedges} from 'hedges'
import {weasels} from 'weasels'
import unique from 'arr-union'

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
        'Don’t use ' + quote(actual, '`') + ', ' + reason[type],
        {
          start: position.start(match[0]),
          end: position.end(match[match.length - 1])
        },
        [source, type].join(':')
      )

      message.actual = actual
      message.expected = []
    }
  }
}
