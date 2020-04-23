import { transformKeysCamelToSnake, transformKeysSnakeToCamel } from '../src/utils/object.utils'

describe('testing object utils', () => {

  const subjects = [
    {
      snake: { key_one: 'val1', key_num_two: 'val2' },
      camel: { keyOne: 'val1',  keyNumTwo: 'val2' }
    },
    {
      snake: { key1_one: 'val1', key2num3_two: 'val2' },
      camel: { key1One: 'val1',  key2num3Two: 'val2' }
    },
    {
      snake: { key: 'python', key2_: 'python2' },
      camel: { key: 'python', key2_: 'python2' }
    }
  ]


it('can transform snake_case keys to camelCase', () => {
    for (const subject of subjects) {
      expect(transformKeysSnakeToCamel(subject.snake)).toEqual(subject.camel)
    }
  })

  it('can transform camelCase keys to snake_case', () => {
    for (const subject of subjects) {
      expect(transformKeysCamelToSnake(subject.camel)).toEqual(subject.snake)
    }
  })
})
