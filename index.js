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

// Types.
var filler = 'filler'
var hedge = 'hedge'
var weasel = 'weasel'

// Messages.
var messages = {}

messages[filler] = 'it doesn’t add meaning'
messages[weasel] = 'it’s vague or ambiguous'
messages[hedge] = 'it lessens impact'

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
      var message

      if (weasels.indexOf(phrase) === -1) {
        type = fillers.indexOf(phrase) === -1 ? hedge : filler
      }

      message = file.message(
        'Don’t use ' + quote(toString(match), '“', '”') + ', ' + messages[type],
        {
          start: position.start(match[0]),
          end: position.end(match[match.length - 1])
        }
      )

      message.ruleId = type
      message.source = 'retext-intensify'
    }
  }
}
