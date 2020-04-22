import * as stringUtils from '../src/utils/string.utils'

describe('testing string utils', () => {
  it('applies quotes', () => {
    expect(stringUtils.quoteIfString('hello world')).toBe("'hello world'")
    expect(stringUtils.quoteIfString(NaN)).toBeNaN()
    expect(stringUtils.quoteIfString({ hello: 'world' })).toEqual({ hello: 'world' })
  })

  it('converts snake-case to camelCase', () => {
    expect(stringUtils.snakeToCamel('my_snake-str')).toBe('mySnake-str')
    expect(stringUtils.snakeToCamel('my--snake_str')).toBe('my--snakeStr')
    expect(stringUtils.snakeToCamel('_snake_two')).toBe('SnakeTwo')
    expect(stringUtils.snakeToCamel('string_with_1_number')).toBe('stringWith1Number')
  })

  it('converts camelCase to snake-case', () => {
    expect(stringUtils.camelToSnake('mySnake-str')).toBe('my_snake-str')
    expect(stringUtils.camelToSnake('my-SnakeStr')).toBe('my-_snake_str')
    expect(stringUtils.camelToSnake('SnakeTwo')).toBe('_snake_two')
    expect(stringUtils.camelToSnake('stringWith1Number')).toBe('string_with_1_number')
    expect(stringUtils.camelToSnake('stringWith234Numbers')).toBe('string_with_234_numbers')
  })
})
