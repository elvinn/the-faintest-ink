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


<Vssue title="TypeScript 基础使用" />
