export function sym(id) {
  return `@@combos/${id}`;
}

export function buildBaseTuple(headItem, restItem) {
  return [headItem, restItem];
}

export function addToTuple(headItem, restItem) {
  return [headItem, ...restItem];
}

export function generateValueCombinations([head, ...tail], initial = false) {
  if (tail.length === 0) {
    return initial
      ? head.map(item => [item])
      : head;
  }

  const result = [];
  const rest = generateValueCombinations(tail);

  const buildTuple = tail.length === 1
    ? buildBaseTuple
    : addToTuple;

  for (let i = 0, l = rest.length; i < l; i++) {
    for (let j = 0, k = head.length; j < k; j++) {
      result.push(buildTuple(head[j], rest[i]));
    }
  }

  return result;
}

export function assertHaveValuesForEveryKey(keys, possibleValues) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const values = possibleValues[i];

    if (!values || !Array.isArray(values) || values.length <= 0) {
      throw new Error(
        `Please provide an array of at least one value for key '${keys[i]}'`
      );
    }
  }
}
