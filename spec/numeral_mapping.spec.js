import AccountNumberParser from '../index';
import * as num from '../constants';

const Parser = new AccountNumberParser();

test('mapping graphical representation to digit returns correct digit string', () => {
  const four = num.four;
  expect(Parser.mapNumeralToDigit(four)).toEqual('4');
});

test('mapping nonexistant numeral to digit returns undefined', () => {
  const nonexistant = "|_|"+
                      "|_|"+
                      "|_|";
  expect(Parser.mapNumeralToDigit(nonexistant)).toEqual(undefined);
});

test('mapping list of real numerals to digit returns correct digit string', () => {
  const listZeroToNine = [ 
                           [num.zero], [num.one], [num.two], [num.three], [num.four], 
                           [num.five], [num.six], [num.seven], [num.eight], [num.nine] 
                         ];
  const result = Parser.mapNumeralListToDigitString(listZeroToNine);

  expect(result.length).toEqual(listZeroToNine.length);
  expect(result).toEqual('0123456789');
});

test('an input of lines is parsed into a list of digits', () => {
  const oneToNineEntry = [ "    _  _     _  _  _  _  _ ",
                                    "  | _| _||_||_ |_   ||_||_|",
                                    "  ||_  _|  | _||_|  ||_| _|",
                                  ]

  const result = Parser.parseAccountEntry(oneToNineEntry);

  expect(result).toEqual('123456789');
});

test('multiple entries are parsed into a separate entries of digits', () => {
  const multipleEntries =        [
                                    "    _  _     _  _  _  _  _ ",
                                    "  | _| _||_||_ |_   ||_||_|",
                                    "  ||_  _|  | _||_|  ||_| _|",
                                    " _  _  _     _  _     _  _ ",
                                    "  | _||_||_||_ |_   ||_||_|",
                                    "  ||_  _|  | _| _|  ||_||_|",
                                 ]

  const result = Parser.parseMultipleAccountEntries(multipleEntries);

  expect(result.length).toEqual(2);
  expect(result[0]).toEqual('123456789');
  expect(result[1]).toEqual('729455188');
});


// parse graphical numerals to digits
// parse a series of graphical numerals to digits
// parse list of lines into graphical numerals
// parse series of entries (set of lines) into separate collections of numerals
// print series of entries as decimals

// intake small file, read and output
// intake large file, read and output

