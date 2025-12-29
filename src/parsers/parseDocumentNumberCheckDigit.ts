import { check } from './check.ts';

export default function parseDocumentNumberCheckDigit(
  checkDigit: string,
  source: string,
  optional: string,
) {
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.slice(0, firstFiller - 1);
    checkDigit = optional.charAt(firstFiller - 1);
    try {
      check(`${source}<${tail}`, checkDigit);
      return {
        value: checkDigit,
        start: firstFiller,
        end: firstFiller + 1,
      };
    } catch (error) {
      check(`${source}${tail}`, checkDigit);
      return {
        error: error.message,
        value: checkDigit,
        start: firstFiller,
        end: firstFiller + 1,
      };
    }
  } else {
    check(source, checkDigit);
    return checkDigit;
  }
}
