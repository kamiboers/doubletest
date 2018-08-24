import { mapNumeralsToDigitStrings } from './constants';
const fs = require('fs');

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

  readFile (filePath) {
    if (filePath) {
      const inputLines = fs.readFileSync(filePath).toString().split("\n");
      const cleanedLines = inputLines.filter((line, index) => (index+1)%4 != 0);
      const blankLine = ' '*27;
      const linesWithSpaces = cleanedLines.map( line => line.length ? line : blankLine )

      return this.parseMultipleAccountEntries(linesWithSpaces)
    }
    return []
  }

}


