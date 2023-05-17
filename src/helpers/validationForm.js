export function validNumber(number) {
  const validNan = !isNaN(number);
  const validInt = parseInt(number);
  const finalValidation = validInt && validNan;
  return finalValidation;
}

export function validateNonEmptyString(text) {
  return text.trim().length > 0;
}
