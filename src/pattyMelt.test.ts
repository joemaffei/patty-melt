import { pattyMelt, Tests } from './pattyMelt';

describe('pattyMelt', () => {
  it('returns false when no tests are provided in the array', () => {
    expect(pattyMelt(0, [])).toEqual(false);
  });

  it('returns test[1] when it\'s not a function and the first argument matches test[0]; returns false otherwise' , () => {
    const tests: Tests<number, string> = [[0, 'zero'], [1, 'one']];

    expect(pattyMelt(0, tests)).toEqual('zero');
    expect(pattyMelt(1, tests)).toEqual('one');
    expect(pattyMelt(2, tests)).toEqual(false);
  });

  it('returns the value of test[1]() when it is a function and the first argument matches test[0]; returns false otherwise', () => {
    const fn0: jest.Mock<string> = jest.fn(() => 'zero');
    const fn1: jest.Mock<string> = jest.fn(() => 'one');

    const tests: Tests<number, string> = [[0, fn0], [1, fn1]];

    expect(pattyMelt(0, tests)).toEqual('zero');
    expect(pattyMelt(1, tests)).toEqual('one');
    expect(pattyMelt(2, tests)).toEqual(false);
    expect(fn0).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledTimes(1);
  });

  it('when options.multiple is true, it returns true instead of the first matching result', () => {
    const tests: Tests<number, string> = [[0, 'first zero'], [0, 'second zero']];

    expect(pattyMelt(0, tests, { multiple: true })).toEqual(true);
  });

  it('works with regex matchers', () => {
    const tests: Tests<string, string> = [[/a/, 'ay'], [/b/, 'bee']];

    expect(pattyMelt('a', tests)).toEqual('ay');
    expect(pattyMelt('ab', tests)).toEqual('ay');
    expect(pattyMelt('b', tests)).toEqual('bee');
    expect(pattyMelt('c', tests)).toEqual(false);
  });

  it('stringifies objects when matched against regular expressions', () => {
    expect(pattyMelt({ abc: 123 }, [[/^{"abc":123}$/, 'object matches']])).toEqual('object matches');
    expect(pattyMelt(new Date(2020, 3, 1), [[/2020-04-01/, 'date matches']])).toEqual('date matches');
  });

  it('works with function matchers', () => {
    expect(pattyMelt(-1, [[n => (n < 0), 'negative']])).toEqual('negative');
    expect(pattyMelt(-1, [[n => (n > 0), 'positive']])).toEqual(false);
  });
});
