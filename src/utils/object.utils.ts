import { camelToSnake, snakeToCamel } from './string.utils'

function generateKeyTransformer (applier: (str: string) => string) {
  return (obj: Record<string, any>) => {
    const newObj = Object.create(null)
    for (const key of Object.keys(obj)) {
      newObj[applier(key)] = obj[key]
    }

    return newObj
  }
}

/**
 *
 * Returns a new object with snake_case keys
 */
export const transformKeysSnakeToCamel = generateKeyTransformer(snakeToCamel)

/**
 * Returns a new object with camelCase keys
 */
export const transformKeysCamelToSnake = generateKeyTransformer(camelToSnake)
