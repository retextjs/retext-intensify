/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:intensify
 * @fileoverview Warn about possible insensitive,
 *   inconsiderate language with Retext.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var difference = require('array-differ');
var nlcstToString = require('nlcst-to-string');
var quotation = require('quotation');
var search = require('nlcst-search');
var fillers = require('fillers');
var hedges = require('hedges');
var weasels = require('weasels');
var unique = require('arr-union');

/* List of patterns. */
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

/**
 * Attacher.
 *
 * @param {Retext} processor
 *   - Instance.
 * @param {Object?} [options]
 *   - Configuration.
 * @param {Array.<string>?} [options.ignore]
 *   - List of phrases to _not_ warn about.
 * @return {Function} - `transformer`.
 */
function attacher(processor, options) {
    var ignore = (options || {}).ignore || [];
    var phrases = difference(list, ignore);

    /**
     * Search `tree` for validations.
     *
     * @param {Node} tree - NLCST node.
     * @param {VFile} file - Virtual file.
     */
    function transformer(tree, file) {
        search(tree, phrases, function (match, position, parent, phrase) {
            var type = weasels.indexOf(phrase) !== -1 ? T_WEASEL :
                fillers.indexOf(phrase) !== -1 ? T_FILLER :
                T_HEDGE;

            var message = file.warn([
                'Don’t use',
                quotation(nlcstToString(match), '“', '”') + ',',
                messages[type]
            ].join(' '), {
                start: match[0].position.start,
                end: match[match.length - 1].position.end
            });

            message.ruleId = type;
            message.source = 'retext-intensify';
        });
    }

    return transformer;
}

/* Expose. */
module.exports = attacher;
