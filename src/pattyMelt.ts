export type Test<V, R> = [V, R | (() => R)];

export type Tests<V, R> = Test<V, R>[];

export type Result<R> = R | boolean;

export type Options = {
  /** continue testing after the first match, return true if there are any matches */
  multiple?: boolean;
};

export function pattyMelt<V = any, R = any>(value: V, tests: Tests<V, R>, options?: Options): Result<R> {
  if (tests.length === 0) return false;

  for (const [comparator, result] of tests) {
    if (value === comparator) {
      if (typeof result === 'function') {
        // @ts-ignore TODO: figure out why result is typed here as (() => R) | (R & Function)
        return result();
      }
      return result;
    }
  }

  return false;
}
