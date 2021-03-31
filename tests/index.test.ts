import * as tmind from '../lib/index';

// const add = (a: number, b: number): number => a + b;
// const tCheckType = (val: any): string => {
// 	return `${(Object.prototype.toString.call(val)).replace(/\[object\s|\]/g, '').toLowerCase()}`;
// };

console.clear(); // eslint-disable-line
// console.log(tmind); // eslint-disable-line

describe('tCheckType', () => {
  it('tCheckType(a string)', () => {
    expect(tmind.tCheckType('a string val')).toBe('string');
  });
  // it('1 + 1 = 2', () => {
  //   expect(add(1, 1)).toEqual(2);
  // });
});