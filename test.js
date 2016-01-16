/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:intensify
 * @fileoverview Test suite for `retext-intensify`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var retext = require('retext');
var intensify = require('./');

/*
 * Tests.
 */

test('intensify', function (t) {
    t.plan(4);

    retext()
        .use(intensify)
        .process([
            'Some people say there are quite some ',
            'problems, apparently.',
            ''
        ].join('\n'), function (err, file) {
            t.ifError(err, 'should not fail (#1)');

            t.deepEqual(
                file.messages.map(String),
                [
                    '1:1-1:5: Don’t use “Some”, it’s vague or ambiguous',
                    '1:13-1:16: Don’t use “say”, it lessens impact',
                    '1:27-1:32: Don’t use “quite”, it’s vague or ambiguous',
                    '1:33-1:37: Don’t use “some”, it’s vague or ambiguous',
                    '2:11-2:21: Don’t use “apparently”, it doesn’t add meaning'
                ],
                'should warn about weasels, fillers, and hedges'
            );
        });

    retext()
        .use(intensify, {
            'ignore': ['quite', 'some']
        })
        .process([
            'Some people say there are quite some ',
            'problems, apparently.',
            ''
        ].join('\n'), function (err, file) {
            t.ifError(err, 'should not fail (#2)');

            t.deepEqual(
                file.messages.map(String),
                [
                    '1:13-1:16: Don’t use “say”, it lessens impact',
                    '2:11-2:21: Don’t use “apparently”, it doesn’t add meaning'
                ],
                'should not warn for `ignore`d phrases'
            );
        });
});
