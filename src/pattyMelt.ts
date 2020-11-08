export type Test<V, R> = [V | RegExp | ((value: V) => boolean), R | (() => R)];

export type Tests<V, R> = Test<V, R>[];

export type Result<R> = R | boolean;

export type Options = {
  /** continue testing after the first match, return true if there are any matches */
  multiple?: boolean;
};

export function pattyMelt<V = any, R = any>(value: V, tests: Tests<V, R>, options?: Options): Result<R> {
  if (tests.length === 0) return false;

  let returnWhenMultiple = false;

  for (const [matcher, result] of tests) {
    let match = value === matcher;
    if (matcher instanceof RegExp) {
      if (typeof value === 'object') {
        match = matcher.test(JSON.stringify(value));
      } else {
        match = matcher.test(`${value}`);
      }
    } else if (typeof matcher === 'function') {
      // @ts-ignore TODO: figure out why result is typed here as (() => R) | (R & Function)
      match = matcher(value);
    }

    if (match) {
      if (options?.multiple) {
        returnWhenMultiple = true;
        continue;
      }

      if (typeof result === 'function') {
        // @ts-ignore TODO: figure out why result is typed here as (() => R) | (R & Function)
        return result();
      }
      return result;
    }
  }

  return returnWhenMultiple;
}
