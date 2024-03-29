import { describe, expect, it } from '@jest/globals';
import { groupBy } from './group-by';
import { getArrayResult } from '../_test';

describe('group-by', () => {
  describe('groupBy()', () => {
    interface ExampleItem {
      readonly key: string;
      readonly value: number;
    }

    interface Example {
      readonly input: readonly ExampleItem[];
      readonly expected: readonly [string, readonly ExampleItem[]][];
    }

    const KEY_SELECTOR = (item: ExampleItem): string => item.key;

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [
          { key: 'k1', value: 0 },
          { key: 'k2', value: 1 },
        ],
        expected: [
          ['k1', [{ key: 'k1', value: 0 }]],
          ['k2', [{ key: 'k2', value: 1 }]],
        ],
      },
      {
        input: [
          { key: 'k1', value: 0 },
          { key: 'k2', value: 0 },
          { key: 'k1', value: 0 },
        ],
        expected: [
          [
            'k1',
            [
              { key: 'k1', value: 0 },
              { key: 'k1', value: 0 },
            ],
          ],
          ['k2', [{ key: 'k2', value: 0 }]],
        ],
      },
      {
        input: [
          { key: 'k1', value: 1 },
          { key: 'k2', value: 2 },
          { key: 'k1', value: 3 },
          { key: 'k2', value: 4 },
        ],
        expected: [
          [
            'k1',
            [
              { key: 'k1', value: 1 },
              { key: 'k1', value: 3 },
            ],
          ],
          [
            'k2',
            [
              { key: 'k2', value: 2 },
              { key: 'k2', value: 4 },
            ],
          ],
        ],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, groupBy(KEY_SELECTOR));
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
