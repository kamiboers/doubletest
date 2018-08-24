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

  readFile (filePath) {
    if (filePath) {
      const inputLines = fs.readFileSync(filePath).toString().split("\n")
      const outputLines = [];

      while (inputLines.length) {
        outputLines.push(this.parseAccountEntry(inputLines.splice(0,3)));
        inputLines.splice(0,1);
      }

      return outputLines;
    }
  }

}


