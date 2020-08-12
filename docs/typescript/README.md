# Typescript

## 动态引入模块

运用 `Dynamic Import` 动态引入主要有两个场景：

1. 前端按需引入，仅在执行相关逻辑的时再去加载，从而减小初始的 JS 代码大小。
2. 引入的模块名不是在编码期就确定，而需要在运行时确定。

从 TS 2.4 版本开始，支持写如下代码进行动态引入：

``` ts
async function getZipFile(name: string, files: File[]): Promise<File> {
  const zipUtil = await import('./utils/create-zip-file');
  const zipContents = await zipUtil.getContentAsBlob(files);
  return new File(zipContents, name);
}
```

对于前端和 Node.js 项目，在 `tsconfig.json` 中需要进行不同的配置。

### 前端项目

对于前端的项目，一般会通过 Webpack 进行构建，那么可以结合它的能力 [Code Splitting - Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) 来做按需加载。

``` ts
async function loadLodash() {
  const package = await import(/* webpackChunkName: "lodash" */ 'lodash');
  return package.default;
}
```

相应的 `tsconfig.json` 中 `module` 字段要配置成 `esnext`，从而保证 `import` 在编译后仍保留 `import` 的形式，而不是被变成了 `Promise.resolve()`，从而能让 webpack 识别，一个简单的例子如下：

``` json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    ...
  }
  ...
}
```

### Node.js 项目

对于 Node.js 项目而言，其实可以直接写 `require` 来实现按需引入，例如加载指定目录下的所有模块可以按如下方式：

``` ts
const getDirModules = (dirName: string) => {
  const files = fs.readdirSync(dirName);
  const modules = files.map((file) => require(path.join(dirName, file)));
  return modules;
};
```

虽然这种方式十分简单，不过 `require` 并不是 Typescript 的一部分，运用 `Dynamic Import` 的话可以改写成如下代码：

``` ts
const getDirModules = async (dirName: string) => {
  const files = fs.readdirSync(dirName);
  const importPromises = files.map(async (file) => import(path.join(dirName, file)));
  const modules = await Promise.all(importPromises);
  return modules;
};
```

相应的 `tsconfig.json` 中 `module` 字段配置成 `commonjs`，表示编译成 Node.js 项目，一个简单的例子如下：


``` json
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    ...
  }
  ...
}
```

<Vssue title="TypeScript" />
