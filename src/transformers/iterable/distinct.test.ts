import { describe, expect, it } from '@jest/globals';
import { distinct } from './distinct';
import { getArrayResult } from '../_test';

describe('distinct', () => {
  describe('distinct()', () => {
    interface Example {
      readonly input: {
        readonly input: readonly number[];
        readonly distinctByFn: ((item: number) => number) | undefined;
      };
      readonly expected: readonly number[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          input: [],
          distinctByFn: undefined,
        },
        expected: [],
      },
      {
        input: {
          input: [1],
          distinctByFn: undefined,
        },
        expected: [1],
      },
      {
        input: {
          input: [1, 2],
          distinctByFn: undefined,
        },
        expected: [1, 2],
      },
      {
        input: {
          input: [1, 2, 1, 3, 1, 3],
          distinctByFn: undefined,
        },
        expected: [1, 2, 3],
      },
      {
        input: {
          input: [1, 2, 3, 4, 5],
          distinctByFn: (item) => item % 2,
        },
        expected: [1, 2],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(
          example.input.input,
          distinct(example.input.distinctByFn),
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
