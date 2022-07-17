# 奇奇怪怪

## Symbol.unscopables

在 with 环境中，通过 **Symbol.unscopables** 让它不要读取原型链上的某些方法名，用法很简单：

```js{5}
const object1 = {
  property1: 42
};

object1[Symbol.unscopables] = {
  property1: true
};

with (object1) {
  console.log(property1); // 异常错误：property1 is not defined
}
```

**Symbol.unscopables** 唯一作用就是解决 with 执行环境下的历史兼容性问题，所以在一些微前端的框架中，为了模拟执行环境，会使用到它。对于新的代码而言，基本是没有意义的。

为了保证历史兼容性这点，可以看到 ES6 中给数组新增的方法均位于 **Symbol.unscopables** 中：

```js
console.log(Array.prototype[Symbol.unscopables])

// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   flat: true,
//   flatMap: true,
//   includes: true,
//   keys: true,
//   values: true
// }
```

> 参考文档： [知乎 - ES6 的 Symbol 为什么还有 Symbol.unscopables 这个内置方法？](https://www.zhihu.com/question/364970876)

