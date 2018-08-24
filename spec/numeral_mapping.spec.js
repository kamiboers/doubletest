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
  const oneToNineEntry = [          "    _  _     _  _  _  _  _ ",
                                    "  | _| _||_||_ |_   ||_||_|",
                                    "  ||_  _|  | _||_|  ||_| _|",
                                  ]

  const result = Parser.parseAccountEntry(oneToNineEntry);

  expect(result).toEqual('123456789');
});

test('sample file can be opened and parsed with a simpler method', () => {
  const expected = [  '000000000',
                      '111111111 ILL',
                      '222222222 ILL',
                      '333333333 ILL',
                      '444444444 ILL',
                      '555555555 ILL',
                      '666666666 ILL',
                      '777777777 ILL',
                      '888888888 ILL',
                      '999999999 ILL',
                      '123456789', 
                    ]
  const result = Parser.readFile('./spec/test_input_1.txt');
  
  expect(result).toEqual(expected);
});

test('validity of account number can be determined', () => {
  const validAccount = '000000051' // expected sum (with multipliers) 11
  const invalidAccount = '000000052' // expected sum (with multpliers) 12
  
  const validResult = Parser.verifyAccountNumber(validAccount);
  const invalidResult = Parser.verifyAccountNumber(invalidAccount);
  
  expect(validResult).toEqual(true);
  expect(invalidResult).toEqual(false);
});
