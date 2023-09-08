import test from 'tape'
import {retext} from 'retext'
import retextIntensify from './index.js'

test('retext-intensify', (t) => {
  t.plan(3)

  retext()
    .use(retextIntensify)
    .process('Some people…')
    .then((file) => {
      t.deepEqual(
        JSON.parse(JSON.stringify(file.messages)),
        [
          {
            column: 1,
            fatal: false,
            message: 'Don’t use `Some`, it’s vague or ambiguous',
            line: 1,
            name: '1:1-1:5',
            place: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 5, offset: 4}
            },
            reason: 'Don’t use `Some`, it’s vague or ambiguous',
            ruleId: 'weasel',
            source: 'retext-intensify',
            actual: 'Some',
            expected: [],
            url: 'https://github.com/retextjs/retext-intensify#readme'
          }
        ],
        'should emit messages'
      )
    }, t.ifErr)

  retext()
    .use(retextIntensify)
    .process('Some people say there are quite some\nproblems, apparently.\n')
    .then((file) => {
      t.deepEqual(
        file.messages.map(String),
        [
          '1:1-1:5: Don’t use `Some`, it’s vague or ambiguous',
          '1:13-1:16: Don’t use `say`, it lessens impact',
          '1:27-1:32: Don’t use `quite`, it’s vague or ambiguous',
          '1:33-1:37: Don’t use `some`, it’s vague or ambiguous',
          '2:11-2:21: Don’t use `apparently`, it doesn’t add meaning'
        ],
        'should warn about weasels, fillers, and hedges'
      )
    }, t.ifErr)

  retext()
    .use(retextIntensify, {ignore: ['quite', 'some']})
    .process('Some people say there are quite some\nproblems, apparently.\n')
    .then((file) => {
      t.deepEqual(
        file.messages.map(String),
        [
          '1:13-1:16: Don’t use `say`, it lessens impact',
          '2:11-2:21: Don’t use `apparently`, it doesn’t add meaning'
        ],
        'should not warn for `ignore`d phrases'
      )
    }, t.ifErr)
})
