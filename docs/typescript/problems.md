# 常见问题

## never 和 void 区别

这两者中文都有空的意思，而且往往都用来标示函数的返回值类型，不过实际的含义差别很大。

函数返回值类型为 `void` 时，表示返回值可以是 `null`（当没有开启 --strictNullChecks 编译选项）或者`undefined`（没有 `return` 语句时返回值也为 `undefined`）。

``` ts
function warnUser1(): void {
  console.log("This is my warning message");
}

function warnUser2(): void {
  console.log("This is my warning message");
  return undefined;
}

function warnUser3(): void {
  console.log("This is my warning message");
  return null;
}
```

函数返回值类型为 `never` 时，表示函数永远不会正常返回，例如一定抛出异常或者陷入死循环中。

``` ts
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

```



<Vssue title="TypeScript 常见问题" />
