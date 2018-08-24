import { mapNumeralsToDigitStrings } from './constants';
const fs = require('fs');

export default class AccountNumberParser {

  mapNumeralToDigit (numeralString) {
    return mapNumeralsToDigitStrings[numeralString];
  }

  mapNumeralListToDigitString (numeralList) {
    return numeralList.map( numeral => this.mapNumeralToDigit(numeral) ).join('');
  }

  parseAccountEntry (accountEntry, outputLineLength=9, numberWidth=3) {
    const chars = accountEntry.join('').split('')
    const newArray = Array(outputLineLength).fill('');

    accountEntry.forEach(function(n) {
      for (let i = 0; i < newArray.length; i++) {
        const splicedChars = chars.splice(0, numberWidth).join('')
        newArray[i] += splicedChars
      }
    })
    const accountNumber = this.mapNumeralListToDigitString(newArray);
    return this.verifyAccountNumber(accountNumber) ? accountNumber : (accountNumber + ' ILL')
  }

  readFile (filePath, entryLengthLines=3, outputLineLength=9, numberWidth=3) {
    if (filePath) {
      const inputLines = fs.readFileSync(filePath).toString().split("\n")
      const outputLines = [];
      
      while (inputLines.length) {
        var accountEntry = inputLines.splice(0, entryLengthLines);
        var parsedEntry = this.parseAccountEntry(accountEntry, outputLineLength, numberWidth);
        outputLines.push(parsedEntry);
        inputLines.splice(0,1); // discard delineating blank line
      }
      return outputLines;
    }
  }

  verifyAccountNumber(accountNumberString) {
    const reversedChars = accountNumberString.split('')
    var multiplier = accountNumberString.length

    const total = reversedChars.reduce(function (acc, curr) {
      var sum = acc + parseInt(curr)*multiplier;
      multiplier--;
      return sum;
    }, 0);

    return ( total % 11 === 0 );
  }
}


