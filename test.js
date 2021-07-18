import test from 'tape'
import {retext} from 'retext'
import retextIntensify from './index.js'

test('retext-intensify', (t) => {
  t.plan(3)

  retext()
    .use(retextIntensify)
    .process('Some people…', (error, file) => {
      t.deepEqual(
        [error].concat(JSON.parse(JSON.stringify(file.messages))),
        [
          null,
          {
            name: '1:1-1:5',
            message: 'Don’t use `Some`, it’s vague or ambiguous',
            reason: 'Don’t use `Some`, it’s vague or ambiguous',
            line: 1,
            column: 1,
            source: 'retext-intensify',
            ruleId: 'weasel',
            position: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 5, offset: 4}
            },
            fatal: false,
            actual: 'Some',
            expected: []
          }
        ],
        'should emit messages'
      )
    })

  retext()
    .use(retextIntensify)
    .process(
      'Some people say there are quite some\nproblems, apparently.\n',
      (error, file) => {
        t.deepEqual(
          [error].concat(file.messages.map((d) => String(d))),
          [
            null,
            '1:1-1:5: Don’t use `Some`, it’s vague or ambiguous',
            '1:13-1:16: Don’t use `say`, it lessens impact',
            '1:27-1:32: Don’t use `quite`, it’s vague or ambiguous',
            '1:33-1:37: Don’t use `some`, it’s vague or ambiguous',
            '2:11-2:21: Don’t use `apparently`, it doesn’t add meaning'
          ],
          'should warn about weasels, fillers, and hedges'
        )
      }
    )

  retext()
    .use(retextIntensify, {ignore: ['quite', 'some']})
    .process(
      'Some people say there are quite some\nproblems, apparently.\n',
      (error, file) => {
        t.deepEqual(
          [error].concat(file.messages.map((d) => String(d))),
          [
            null,
            '1:13-1:16: Don’t use `say`, it lessens impact',
            '2:11-2:21: Don’t use `apparently`, it doesn’t add meaning'
          ],
          'should not warn for `ignore`d phrases'
        )
      }
    )
})
