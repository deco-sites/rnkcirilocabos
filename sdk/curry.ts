// deno-lint-ignore ban-types
export const curry = <F extends Function>(fn: F): Function => {
  try {
    // deno-lint-ignore no-explicit-any
    return function curried<T>(this: any, ...args: T[]) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      } else {
        return (...args2: T[]) => {
          curried.apply(this, args.concat(args2));
        };
      }
    };
  } catch (e) {
    throw new Error(e);
  }
};
