# 基础使用

## 解构时指定类型

在解构对象时很容易写出如下的类型声明：

``` ts
// wrong
const { name: string } = obj;
```

然而这种写法时错误的，这其实是将 `name` 重命名为 `string`，正确的写法如下：

``` ts
// right
const { name } : { name: string } = obj;
```

## 扩充第三方依赖

有一些第三方依赖有提供 `d.ts` 的类型声明，但实际并不完善，例如有的方法并未暴露在声明。

以 [wx-server-sdk](https://www.npmjs.com/package/wx-server-sdk) 为例，它虽然提供了 `d.ts`，但是存在两个问题：
- 未暴露 `registerService` 方法
- `IDatabaseConfig` 仅声明了 `env` 属性，实际还有 `throwOnNotFound` 属性未声明

针对这种情况，可以编写一个专门的 `shim.ts` 进行类型补充：

``` ts
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

``` ts
const small: number = 1;
const big: bigint = 9007199254740992n; // 注意：需要以 n 结尾
```

### 数组混合类型推断

假如数组中有元素的类型不一致的话，那么 TypeScript 会自定进行推断，认为每一个元素都有可能是多种类型：

``` ts
// mixedArray 的类型是 (number | string)[]
const mixedArray = [1, 2, 'hello'];
```

<Vssue title="TypeScript 基础使用" />
