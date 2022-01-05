# 基础使用

## 类似 keyof 的 ValueOf

对于类型 `type Foo = { a: string, b: number };` 而言，可以通过 `keyof Foo` 获取到 `Foo` 的 key 类型为 `'a' | 'b'`，那怎么类似地获取到 `Foo` 的 value 类型呢？ts 并没有提供内置的方法，不过我们可以写出如下的工具类型：

```ts
type ValueOf<T> = T[keyof T];
type valueOfFoo = ValueOf<Foo>; // string | number
```

> 参考文档: [stack overflow - Is there a `valueof` similar to `keyof` in TypeScript?](https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript)。


## 获取 union 类型所有可能的 key

假如有以下的类型声明：

```ts
type A = { a: string; z: number };
type B = { b: string; z: number };
type AOrB = A | B;
```

那么 `keyof AOrB` 获取到的是 `z` 而不是 `a | b | z`，也就是说对于 union 类型而言，`keyof` 获取到的是类型 key 的交集而不是并集，那有什么办法可以获取到并集的数据呢？

我们可以实现一个如下的工具类型:
```ts
type KeysOfUnion<T> = T extends T ? keyof T : never;
type AllKeys = KeysOfUnion<AOrB>; // a | b | z
```

具体原理是因为这里是利用了 [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)，简单来说对于 `KeysOfUnion<T>` 而言，假如 T 是 union 类型 `A | B` 的话，那么它等价于 `(A extends A ? keyof A : never) | (B extends B ? keyof B : never)`。

> 参考文档: [stack overflow - all possible keys of an union type](https://stackoverflow.com/questions/49401866/all-possible-keys-of-an-union-type)。

## 获取已有类型属性的类型

假如已经有一个如下的 `Student` 类型，那么该怎么获取它的 `hobbies` 的类型呢？

```ts
// 学生
interface Student {
  name: string; // 学生名字
  hobbies: {
    name: string; // 爱好名字
    startTime: Date; // 爱好开始时间
  }[]; // 所有爱好
}
```

直接写 `Student.hobbies` 是不行的，正确的写法是 `Student['hobbies']`。

## 解构时指定类型

在解构对象时很容易写出如下的类型声明：

```ts
// wrong
const { name: string } = obj;
```

然而这种写法时错误的，这其实是将 `name` 重命名为 `string`，正确的写法如下：

```ts
// right
const { name } : { name: string } = obj;
```

## 扩充第三方依赖

有一些第三方依赖有提供 `d.ts` 的类型声明，但实际并不完善，例如有的方法并未暴露在声明。

以 [wx-server-sdk](https://www.npmjs.com/package/wx-server-sdk) 为例，它虽然提供了 `d.ts`，但是存在两个问题：
- 未暴露 `registerService` 方法
- `IDatabaseConfig` 仅声明了 `env` 属性，实际还有 `throwOnNotFound` 属性未声明

针对这种情况，可以编写一个专门的 `shim.ts` 进行类型补充：

```ts
import 'wx-server-sdk';

declare module 'wx-server-sdk' {
  function registerService(service: any): void;
  namespace DB {
    interface IDatabaseConfig {
      throwOnNotFound: boolean;
    }
  }
}
```

## 基本类型

### 数字类型

由于 ES2020 引入了 [BigInt 大数类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)，它提供了一种方法来表示大于 `2^53 - 1` 的整数，所以在 TypeScript 中除了普通的 `number` 类型外，还有一种 `bigint` 的数字类型：

```ts
const small: number = 1;
const big: bigint = 9007199254740992n; // 注意：需要以 n 结尾
```

### 数组混合类型推断

假如数组中有元素的类型不一致的话，那么 TypeScript 会自定进行推断，认为每一个元素都有可能是多种类型：

```ts
// mixedArray 的类型是 (number | string)[]
const mixedArray = [1, 2, 'hello'];
```

<Vssue title="TypeScript 基础使用" />
