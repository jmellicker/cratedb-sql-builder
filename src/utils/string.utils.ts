export function quoteIfString (input: any) {
  return typeof input === 'string' ? `'${input}'` : input;
}

export function addAdditionalSingleQuoteIfString (input: any) {
  return typeof input === 'string' ? input.replace(/'/g, "''") : input;
}
