/* @flow */
export function buildBaseTuple<T, U>(headItem: T, restItem: U): [T, U] {
  return [headItem, restItem];
}

export function addToTuple(headItem, restItem) {
  return [headItem, ...restItem];
}

export function generateValueCombinations(
  [head, ...tail]
) {
  if (tail.length === 0) {
    return head;
  }

  const result = [];
  const rest = generateValueCombinations(tail);

  const buildTuple = tail.length === 1 ?
    buildBaseTuple :
    addToTuple;

  for (let i = 0, l = rest.length; i < l; i++) {
    for (let j = 0, k = head.length; j < k; j++) {
      result.push(buildTuple(head[j], rest[i]));
    }
  }

  return result;
}
