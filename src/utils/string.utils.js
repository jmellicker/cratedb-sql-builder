export function quoteIfString (input) {
  return typeof input === 'string' ? `'${input}'` : input;
}

export function addAdditionalSingleQuoteIfString (input) {
  return typeof input === 'string' ? input.replace(/'/g, "''") : input;
}
