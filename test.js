import test from 'ava';
import combos from './src';

function createObjectFinder(t, objects) {
  const map = {};

  return {
    assertHasObjectOnce(finder) {
      const index = objects.findIndex(finder);

      t.true(index >= 0);
      t.falsy(map[index]);

      map[index] = true;
    },

    assertAllChecked() {
      t.is(Object.keys(map).length, objects.length);
    },
  };
}

test('generates all possible combinations', t => {
  const result = combos({
    foo: [true, false],
    bar: [1, 0],
    baz: ['hello', 'world'],
  });

  const objectFinder = createObjectFinder(t, result);

  t.is(result.length, 8);

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === true && bar === 1 && baz === 'hello'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === true && bar === 1 && baz === 'world'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === true && bar === 0 && baz === 'hello'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === true && bar === 0 && baz === 'world'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === false && bar === 1 && baz === 'hello'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === false && bar === 1 && baz === 'world'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === false && bar === 0 && baz === 'hello'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === false && bar === 0 && baz === 'world'
  ));

  objectFinder.assertAllChecked();
});

test('generates all possible combinations, holding one constant', t => {
  const result = combos({
    foo: [true, false],
    bar: [1, 0],
    baz: ['hello'],
  });

  const objectFinder = createObjectFinder(t, result);

  t.is(result.length, 4);

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === true && bar === 1 && baz === 'hello'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === true && bar === 0 && baz === 'hello'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === false && bar === 1 && baz === 'hello'
  ));

  objectFinder.assertHasObjectOnce(({ foo, bar, baz }) => (
    foo === false && bar === 0 && baz === 'hello'
  ));

  objectFinder.assertAllChecked();
});

test('handles single key with one value', t => {
  const result = combos({ foo: ['bar'] });

  t.deepEqual(result, [{ foo: 'bar' }]);
});

test('handles single key with multiple values', t => {
  const result = combos({ foo: ['bar', 'baz'] });

  t.deepEqual(result, [
    { foo: 'bar' },
    { foo: 'baz' },
  ]);
});

test('throws without argument', t => {
  t.throws(_ => combos());
});

test('throws with null', t => {
  t.throws(_ => combos(null));
});

test('throws with empty object', t => {
  t.throws(_ => combos({}));
});

test('throws with array', t => {
  t.throws(_ => combos([]));
});

test('throws with non-object', t => {
  t.throws(_ => combos(42));
});

test('throws with single key and no values', t => {
  t.throws(_ => combos({ foo: null }));
});

test('throws with single key and empty array', t => {
  t.throws(_ => combos({ foo: [] }));
});

test('throws when a key is missing values', t => {
  t.throws(_ => combos({ foo: ['hello'], bar: null }));
});

test('throws when a key has an empty array of values', t => {
  t.throws(_ => combos({ foo: ['hello'], bar: [] }));
});
