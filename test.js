import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextIntensify from './index.js'

test('retext-intensify', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  await t.test('should emit a message w/ metadata', async function () {
    const file = await retext().use(retextIntensify).process('Some people…')

    assert.deepEqual(
      JSON.parse(JSON.stringify({...file.messages[0], ancestors: []})),
      {
        ancestors: [],
        column: 1,
        fatal: false,
        message: 'Unexpected weasel (vague or ambiguous) word `Some`',
        line: 1,
        name: '1:1-1:5',
        place: {
          start: {line: 1, column: 1, offset: 0},
          end: {line: 1, column: 5, offset: 4}
        },
        reason: 'Unexpected weasel (vague or ambiguous) word `Some`',
        ruleId: 'weasel',
        source: 'retext-intensify',
        actual: 'Some',
        expected: [],
        url: 'https://github.com/retextjs/retext-intensify#readme'
      }
    )
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
        '1:1-1:5: Unexpected weasel (vague or ambiguous) word `Some`',
        '1:13-1:16: Unexpected hedge (uncertain or indecisive) word `say`',
        '1:27-1:32: Unexpected weasel (vague or ambiguous) word `quite`',
        '1:33-1:37: Unexpected weasel (vague or ambiguous) word `some`',
        '2:11-2:21: Unexpected filler (meaningless) word `apparently`'
      ])
    }
  )

  await t.test('should not warn for `ignore`d phrases', async function () {
    const file = await retext()
      .use(retextIntensify, {ignore: ['quite', 'some']})
      .process('Some people say there are quite some\nproblems, apparently.\n')

    assert.deepEqual(file.messages.map(String), [
      '1:13-1:16: Unexpected hedge (uncertain or indecisive) word `say`',
      '2:11-2:21: Unexpected filler (meaningless) word `apparently`'
    ])
  })
})
