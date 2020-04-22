export function quoteIfString (input: any) {
  return typeof input === 'string' ? `'${input}'` : input;
}

export function addAdditionalSingleQuoteIfString (input: any) {
  return typeof input === 'string' ? input.replace(/'/g, "''") : input;
}

export const snakeToCamel = (str: string) => str.replace(/([_]\w)/g, g => g[1].toUpperCase())

export const camelToSnake = (str: string) => {
  let result = str.split(/(?=[A-Z 0-9])/).join('_').toLowerCase()
  if (str[0].match(/(?=[A-Z])/)) {
    result = '_' + result
  }
  return result
}
