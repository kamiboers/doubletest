import { mapNumeralToDigit, mapNumeralListToDigitString } from '../index';
import * as num from '../constants';

test('mapping graphical representation to digit returns correct digit string', () => {
  const four = num.four;
  expect(mapNumeralToDigit(four)).toEqual('4');
});

test('mapping nonexistant numeral to digit returns undefined', () => {
  const nonexistant = "|_|"+
                      "|_|"+
                      "|_|";
  expect(mapNumeralToDigit(nonexistant)).toEqual(undefined);
});

test('mapping list of real numerals to digit returns correct digit string', () => {
  const listZeroToNine = [ 
                           [num.zero], [num.one], [num.two], [num.three], [num.four], 
                           [num.five], [num.six], [num.seven], [num.eight], [num.nine] 
                         ];
  const result = mapNumeralListToDigitString(listZeroToNine);

  expect(result.length).toEqual(listZeroToNine.length);
  expect(result).toEqual('0123456789');
});


// parse graphical numerals to digits
// parse a series of graphical numerals to digits

// parse list of lines into graphical numerals

// parse series of entries (set of lines) into separate collections of numerals
// print series of entries as decimals
// intake small file, read and output
// intake large file, read and output

