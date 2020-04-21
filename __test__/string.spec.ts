import * as stringUtils from '../src/utils/string.utils'

describe('testing string utils', () => {
  it('applies quotes', () => {
    expect(stringUtils.quoteIfString('hello world')).toBe("'hello world'")
    expect(stringUtils.quoteIfString(NaN)).toBeNaN()
    expect(stringUtils.quoteIfString({ hello: 'world' })).toEqual({ hello: 'world' })
  })
})
