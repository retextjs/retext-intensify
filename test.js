import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextIntensify from './index.js'

test('retext-intensify', async function (t) {
  await t.test('should emit a message w/ metadata', async function () {
    const file = await retext().use(retextIntensify).process('Some people…')

    assert.deepEqual(JSON.parse(JSON.stringify(file.messages[0])), {
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
    })
  })

  await t.test(
    'should warn about weasels, fillers, and hedges',
    async function () {
      const file = await retext()
        .use(retextIntensify)
        .process(
          'Some people say there are quite some\nproblems, apparently.\n'
        )

      assert.deepEqual(file.messages.map(String), [
        '1:1-1:5: Don’t use `Some`, it’s vague or ambiguous',
        '1:13-1:16: Don’t use `say`, it lessens impact',
        '1:27-1:32: Don’t use `quite`, it’s vague or ambiguous',
        '1:33-1:37: Don’t use `some`, it’s vague or ambiguous',
        '2:11-2:21: Don’t use `apparently`, it doesn’t add meaning'
      ])
    }
  )

  await t.test('should not warn for `ignore`d phrases', async function () {
    const file = await retext()
      .use(retextIntensify, {ignore: ['quite', 'some']})
      .process('Some people say there are quite some\nproblems, apparently.\n')

    assert.deepEqual(file.messages.map(String), [
      '1:13-1:16: Don’t use `say`, it lessens impact',
      '2:11-2:21: Don’t use `apparently`, it doesn’t add meaning'
    ])
  })
})
