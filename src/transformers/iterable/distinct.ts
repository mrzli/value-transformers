import { Fn1 } from '@gmjs/generic-types';

export function distinct<T, THash = T>(
  distinctBy?: (item: T) => THash,
): Fn1<Iterable<T>, Iterable<T>> {
  return function* (input: Iterable<T>): Iterable<T> {
    const previousItemsSet = new Set<T | THash>();
    for (const inputItem of input) {
      const hash = distinctBy ? distinctBy(inputItem) : inputItem;
      if (!previousItemsSet.has(hash)) {
        previousItemsSet.add(hash);
        yield inputItem;
      }
    }
  };
}
