// deno-lint-ignore ban-types
export const debounce = <F extends Function>(fn: F, time = 300): Function => {
  try {
    let timer = setTimeout(() => {});

    const debounced = <T>(...args: T[]): void => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, time);
    };

    return debounced;
  } catch (e) {
    throw new Error(e);
  }
};
