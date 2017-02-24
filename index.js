'use strict';

var difference = require('array-differ');
var toString = require('nlcst-to-string');
var search = require('nlcst-search');
var position = require('unist-util-position');
var quote = require('quotation');
var fillers = require('fillers');
var hedges = require('hedges');
var weasels = require('weasels');
var unique = require('arr-union');

/* Expose. */
module.exports = intensify;

var list = unique([], fillers, hedges, weasels).sort();

/* Types. */
var T_FILLER = 'filler';
var T_HEDGE = 'hedge';
var T_WEASEL = 'weasel';

/* Messages. */
var messages = {};

messages[T_FILLER] = 'it doesn’t add meaning';
messages[T_WEASEL] = 'it’s vague or ambiguous';
messages[T_HEDGE] = 'it lessens impact';

/* Attacher. */
function intensify(options) {
  var ignore = (options || {}).ignore || [];
  var phrases = difference(list, ignore);

  return transformer;

  /* Search `tree` for validations. */
  function transformer(tree, file) {
    search(tree, phrases, searcher);

    function searcher(match, index, parent, phrase) {
      var type = T_WEASEL;
      var message;

      if (weasels.indexOf(phrase) === -1) {
        type = fillers.indexOf(phrase) === -1 ? T_HEDGE : T_FILLER;
      }

      message = file.warn('Don’t use ' + quote(toString(match), '“', '”') + ', ' + messages[type], {
        start: position.start(match[0]),
        end: position.end(match[match.length - 1])
      });

      message.ruleId = type;
      message.source = 'retext-intensify';
    }
  }
}
