export const defaultCase = Symbol('defaultCase');

export type MatcherFunction<V> = (value: V) => boolean;

export type ResultFunction<R> = () => R;

export type Test<V, R> = [V | RegExp | MatcherFunction<V> | typeof defaultCase, R | (() => R)];

export type Tests<V, R> = Test<V, R>[];

export type Result<R> = R | boolean;

export type Options = {
  /** continue testing after the first match, return true if there are any matches */
  multiple?: boolean;
};


export function pattyMelt<V, R>(value: V, tests: Tests<V, R>, options?: Options): Result<R> {
  if (tests.length === 0) return false;

  let returnWhenMultiple = false;
  let defaultResult: Result<R> = false;
  let defaultResultSet = false;

  for (const [matcher, result] of tests) {
    if (matcher === defaultCase) {
      defaultResultSet = true;

      if (typeof result === 'function') {
        defaultResult = (result as ResultFunction<R>)();
      } else {
        defaultResult = result;
      }
      continue;
    }

    let match = value === matcher;

    if (matcher instanceof RegExp) {
      if (typeof value === 'object') {
        match = matcher.test(JSON.stringify(value));
      } else {
        match = matcher.test(`${value}`);
      }
    } else if (typeof matcher === 'function') {
      match = (matcher as MatcherFunction<V>)(value);
    }

    if (match) {
      if (options?.multiple) {
        returnWhenMultiple = true;
        continue;
      }

      if (typeof result === 'function') {
        return (result as ResultFunction<R>)();
      }
      return result;
    }
  }

  if (defaultResultSet) {
    return defaultResult;
  } else {
    return returnWhenMultiple;
  }
}
