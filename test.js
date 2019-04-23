
const theFunctions = require('./functions')

test('b', () => {
    expect (theFunctions.b()).toBe('b')
  })

test('this one', () => {
    expect (theFunctions.op.action('bob')).toBe('bob')
})