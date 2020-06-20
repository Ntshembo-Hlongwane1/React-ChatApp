# simple-update-in

A lightweight `updateIn` for immutable objects.

[![npm version](https://badge.fury.io/js/simple-update-in.svg)](https://badge.fury.io/js/simple-update-in) [![Build Status](https://travis-ci.org/compulim/simple-update-in.svg?branch=master)](https://travis-ci.org/compulim/simple-update-in)

We love [ImmutableJS](https://facebook.github.io/immutable-js). But sometimes, we want to start something from small. Thus, we created this package with zero dependencies.

Under the [cover](src/index.js), we use Rest Operator to do most of the heavylifting.

# Install

For latest stable, run `npm install simple-update-in`.

For active development (`master` branch), run `npm install simple-update-in@master`.

# How to use

For example, `obj.one.two = 1.2`, call `updateIn(obj, ['one', 'two'], 1.2)`. It will return a new object with changes in deep clone.

We share similar signature as [ImmutableJS.updateIn](https://facebook.github.io/immutable-js/docs/#/Map/updateIn):

```js
updateIn<T: Array|Map>(
  target: T,
  path: (Number|String)[],
  updater?: (value: any) => any
): T
```

To make `updateIn` efficient, especially, when paired with React. It will return a mixed deep/shallow clone of the `target`. It only deep clone on objects that it modified along the `path`, and shallow clone objects that it did not modify.

Like other immutable framework, `updater` is expected to return a new object if there is a change. If the update do not result in a change (triple-equal `===`), then, the original object is returned.

## Example

Just like ImmutableJS, we want to make both `Array` and `Map` a first-class citizen. To work on a map, use a `string` as key. For arrays, use a `number` as key.

### Map

```js
import updateIn from 'simple-update-in';

const from = { one: 1, two: { number: 2 }, thirty: 3 };
const actual = updateIn(from, ['thirty'], three => three * 10);

expect(actual).toEqual({ one: 1, two: { number: 2 }, thirty: 30 });

expect(actual).not.toBe(from);   // Something under this tree has changed
expect(actual.two).toBe(to.two); // Nothing under this tree has changed
expect(actual.thirty).toBe(30);  // We multiplied it by 10
```

> This is in fact an "upsert" operation.

### Array in map

```js
const from = { one: [1.1, 1.2, 1.3], two: [2] };
const actual = updateIn(from, ['one', 1], value => 'one point two');

expect(actual).toEqual({ one: [1.1, 'one point two', 1.3], two: [2] });
```

## Remove a key

You can also use `updateIn` to remove a key by passing a falsy value to the `updater` argument, or return `undefined`.

```js
const from = { one: 1, two: 2 };
const actual = updateIn(from, ['two']);

expect(actual).toEqual({ one: 1 });

expect(actual).not.toBe(from);
expect(actual).not.toHaveProperty('two');
```

> When removing a non-existing key, the original object will be returned.

The sample code above also works with `updater` returning `undefined`, for example, `updateIn(from, ['two'], () => undefined)`.

## Remove an item in array

```js
const from = ['zero', 'one', 'two'];
const actual = updateIn(from, [1]);

expect(actual).toEqual(['zero', 'two']);
```

> Also for `updater` returning `undefined`

## Automatic expansion

```js
const from = {};
const actual = updateIn(from, ['one', 'two'], 1.2);

expect(actual).toEqual({ one: { two: 1.2 } });
```

> If the `updater` return `undefined`, the object will be untouched.

## Replace incompatible types

If incompatible types is found along the walk, they will be replaced. For example, in the following example, an `Array` is replaced by a `Map`.

```js
const from = [0, 1, 2];
const actual = updateIn(from, ['one'], 1);

expect(actual).toEqual({ one: 1 });
```

> In the path, `'one'` is a string, it implies that user want a `Map` instead of `Array`

It will also replace `number` with `Map`.

```js
const from = { one: 1 };
const actual = updateIn(from, ['one', 'two'], 1.2);

expect(actual).toEqual({ one: { two: 1.2 } });
```

### Corner case

If the target value is of incompatible type, we will convert it to correct type before setting it. In the following sample, the actual value is an empty map instead of the original array.

```js
const from = [0, 1, 2];
const actual = updateIn(from, ['one']);

expect(actual).toEqual({});
```

## Adding an item to array

You can use special index value `-1` to indicate an append to the array.

```js
const from = [0, 1];
const actual = updateIn(from, [-1], () => 2);

expect(actual).toEqual([0, 1, 2]);
```

> If `updater` returned `undefined`, the value will not be appended.

There is no support on prepend or insertion, however, you can use Rest Operator for array manipulation.

```js
const from = { numbers: ['one', 'two'] };
const actual = updateIn(from, ['numbers'], array => ['zero', ...array]);

expect(actual).toEqual({ numbers: ['zero', 'one', 'two'] });
```

## Using predicate

For path accessor, instead of `number` and `string`, you can also use `function`.

Predicate for array has signature of `(value, index) => truthy/falsy`. And for map, `(value, key) => truthy/falsy`.

```js
const from = [1, 2, 3, 4, 5];
const actual = updateIn(from, [value => value % 2], value => value * 10);

expect(actual).toEqual([10, 2, 30, 4, 50]);
```

### Branching with predicate

You can also use predicate to update multiple subsets at the same time.

```js
const from = [{ v: 1 }, { v: 2 }, { v: 3 }];
const actual = updateIn(from, [() => true, 'v'], v => v * 10);

expect(actual).toEqual([{ v: 10 }, { v: 20 }, { v: 30 }]);
```

### Non-existing key/index with predicate

Since it is impossible to guess if the predicate is performing on an array or map. [automatic expansion](#automatic-expansion) will not be performed if the key/index does not exists. Nevertheless, even we expand it into an empty array or map, it will not be enumerated thru the predicate since the new item is empty. Thus, nothing will change.

```js
const from = {};
const actual = updateIn(from, ['Hello', () => true], () => 'World!']);

expect(actual).toBe(from);
```

```js
const from = [];
const actual = updateIn(from, [0, () => true], () => 'Aloha']);

expect(actual).toBe(from);
```

# Contributions

Like us? [Star](https://github.com/compulim/simple-update-in/stargazers) us.

Want to make it better? [File](https://github.com/compulim/simple-update-in/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/simple-update-in/pulls) a pull request.
