import { mapNumeralsToDigitStrings } from './constants';

export default class AccountNumberParser {

  mapNumeralToDigit (numeralString) {
    return mapNumeralsToDigitStrings[numeralString];
  }

  mapNumeralListToDigitString (numeralList) {
    return numeralList.map( numeral => this.mapNumeralToDigit(numeral) ).join('');
  }

  parseAccountEntry (accountEntry) {
    const chars = accountEntry.join('').split('')
    const newArray = Array(9).fill('');

    accountEntry.forEach(function(n) {
      for (let i = 0; i < newArray.length; i++) {
        const splicedChars = chars.splice(0, 3).join('')
        newArray[i] += splicedChars
      }
    })
    return this.mapNumeralListToDigitString(newArray)
  }

  parseMultipleAccountEntries (accountEntries) {
    const entries = [];

    while (accountEntries.length) {
      entries.push(accountEntries.splice(0, 3))
    }
    return entries.map( entry => this.parseAccountEntry(entry) );
  }
}



