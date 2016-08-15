import {
  assertHaveValuesForEveryKey,
  generateValueCombinations,
  sym,
} from './utils';

const UNDEF = sym('UNDEF');

function combos(definition) {
  const valid = (
    definition
    && typeof definition === 'object'
    && !Array.isArray(definition)
    && Object.keys(definition).length > 0
  );

  if (!valid) {
    throw new Error(
      'Please provide an object with at least one key and array of values'
    );
  }

  const { keys, possibleValues } = Object.keys(definition).reduce(
    (memo, key) => {
      memo.keys.push(key);
      memo.possibleValues.push(definition[key]);
      return memo;
    },

    { keys: [], possibleValues: [] }
  );

  assertHaveValuesForEveryKey(keys, possibleValues);

  const combinations = generateValueCombinations(possibleValues, true);

  return combinations.map(values => values.reduce(
    (memo, value, i) => {
      if (value !== UNDEF) {
        // eslint-disable-next-line no-param-reassign
        memo[keys[i]] = value;
      }

      return memo;
    },

    {}
  ));
}

combos.UNDEF = UNDEF;

combos.__esModule = true;
combos.default = combos;

module.exports = combos;
