# 迭代器与生成器

## 迭代器 iterator

如果一个对象有 `next` 方法，而且这个方法返回的对象包含 `done` 和 `value` 这两个属性，那么就可以称它是迭代器（iterator）：

``` js{6,7,10,15}
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  // rangeIterator 是一个迭代器
  const rangeIterator = {
    next: function () {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true }
    }
  };
  return rangeIterator;
}

let it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
  console.log(result.value); // 1 3 5 7 9
  result = it.next();
}

console.log("Iterated over sequence of size: ", result.value); // 5
```

## 可迭代对象

如果一个对象的 `Symbol.iterator` 属性是一个函数，它的返回值是迭代器的话，那么就可以称它为可迭代对象，可以通过 `for ... of ...` 进行遍历：

``` js{2-4,6}
// makeRangeIterator 是上文中的函数
const iterableObj = {
  [Symbol.iterator]: () => makeRangeIterator(1, 10, 2),
};

for (const value of iterableObj) {
  console.log(value); // 1 3 5 7 9
}
```

## 异步可迭代对象

类似于可迭代对象，如果一个对象的 `Symbol.asyncIterator` 属性是一个异步函数，它的返回值是异步迭代器的话，那么就可以称它为可迭代对象，可以通过 `for await ... of ...` 进行遍历：

``` js{7,25-27,29}
function makeAsyncRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  // asyncRangeIterator 是一个异步迭代器对象
  const asyncRangeIterator = {
    next: async function () {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let result;

      if (nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true }
    }
  };
  return asyncRangeIterator;
}

(async () => {
  const asyncIterableObj = {
    [Symbol.asyncIterator]: () => makeAsyncRangeIterator(1, 10, 2),
  };

  for await(const value of asyncIterableObj) {
    console.log(value); // 1 3 5 7 9
  }
})()
```

## 生成器 generator

上文中，为了得到一个可迭代对象，我们花了十多行写了 `makeRangeIterator` 函数用来生成迭代器，又手动绑定迭代器到 `Symbol.iterator` 属性最终得到可迭代对象，花来一番大功夫。

不过借助于生成器 `generator` 的话，通过 `*` 和 `yield` 语法糖，仅仅三四行代码，就能得到一个可迭代对象：

```js{1-5}
function* rangeGenerator(start = 0, end = Infinity, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

// it 是一个可迭代对象
const it = rangeGenerator(1, 10, 2);
let result = it.next();
while (!result.done) {
  console.log(result.value); // 1 3 5 7 9
  result = it.next();
}

for (const value of rangeGenerator(1, 10, 2)) {
  console.log(value); // 1 3 5 7 9
}
```


## 参考文档

1. [MDN - 迭代器和生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)
2. [ES2018 新特征之：异步迭代器 for-await-of](https://segmentfault.com/a/1190000013387616)

<Vssue title="JavaScript Iterator" />