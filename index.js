'use strict'

var difference = require('array-differ')
var toString = require('nlcst-to-string')
var search = require('nlcst-search')
var position = require('unist-util-position')
var quote = require('quotation')
var fillers = require('fillers')
var hedges = require('hedges')
var weasels = require('weasels')
var unique = require('arr-union')

module.exports = intensify

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
function intensify(options) {
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
