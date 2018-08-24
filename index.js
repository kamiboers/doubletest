import { mapNumeralsToDigitStrings } from './constants';

export function mapNumeralToDigit (numeralString) {
  return mapNumeralsToDigitStrings[numeralString];
}

export function mapNumeralListToDigitString (numeralList) {
  return numeralList.map( numeral => mapNumeralToDigit(numeral) ).join('');
}
