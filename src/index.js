/* @flow */
import { generateValueCombinations } from './utils';

export default function shape(definition: Object): Array {
  const { keys, possibleValues } = Object.keys(definition).reduce(
    (memo, key) => {
      memo.keys.push(key);
      memo.possibleValues.push(definition[key]);
      return memo;
    },

    { keys: [], possibleValues: [] }
  );

  const combinations = generateValueCombinations(possibleValues);

  return combinations.map(values => values.reduce(
    (memo, value, i) => {
      // eslint-disable-next-line no-param-reassign
      memo[keys[i]] = value;
      return memo;
    },

    {}
  ));
}
