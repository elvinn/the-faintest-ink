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

## 联合类型常用技巧

联合类型（Union Type）是形如 `typeA | typeB` 的类型，主要有两个用途：

1. 表示函数参数、返回值的多个可能
2. 方便通过已有类型组合出新的类型

例如可以将已有的 `User` 类型、`Admin` 类型组合出 `Person` 类型：

``` ts{13}
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;
```

### 使用 `in` 操作符

假如我们通过如下的 `logPerson` 函数打印 `Person` 类型的变量：

``` ts {3,4,6}
function logPerson(person: Person) {
  let additionalInformation: string;
  if (person.role) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

上面的代码在 TypeScript 中会报错，因为编译器认为 `Person` 类型只有 `name` / `age` 这样公有的字段是确定的， 直接使用 `person.role` / `person.occipation` 这样非公有的字段则取不到，

在这种情况下，可以通过 `in` 操作符来帮助缩小类型的范围，将 `Person` 缩小到 `User` 类型或者 `Admin` 类型：

``` ts {3,6}
function logPerson(person: Person) {
  let additionalInformation: string;
  if ('role' in person) {
    // 在这个分支下，person 变量都是 Admin 类型
    additionalInformation = person.role;
  } else {
    // 在这个分支下，person 变量都是 User 类型
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

### 使用类型推断

除了直接使用 `in` 操作符外，也可以使用类型推断（type predicates），也就是将相关判断写成函数，然后返回值的类型写成 `person is Admin` / `person is User`：

``` ts{1,5,11,15}
function isAdmin(person: Person): person is Admin {
  return  (person as Admin).role !== undefined;
}

function isUser(person: Person): person is User {
    return (person as User).occupation !== undefined;
}

function logPerson(person: Person) {
    let additionalInformation: string = '';
    if (isAdmin(person)) {
      // 在这个分支下，person 变量都是 Admin 类型
      additionalInformation = person.role;
    }
    if (isUser(person)) {
      // 在这个分支下，person 变量都是 User 类型
      additionalInformation = person.occupation;
    }
    console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

其实这些操作都是为了更精准的确定类型，在官方文档中被称之为 Type Guards，强烈推荐下面两个连接：

1. [官方文档 - Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)
2. [在线练习 - TypeScript exercises 第 2, 3, 4 节](https://typescript-exercises.github.io/)


## Map 映射中使用枚举

在开发中常见的场景是用枚举定义操作的类型，然后使用一个空对象将操作的类型和其处理函数对应起来，例如：

``` ts{19}
enum Action {
  ADD_LIST = 'ADD_LIST',
  DELETE_LIST = 'QUERY_LIST',
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
}

function handleAddItem() {}
function handleDeleteItem() {}

function main(type: Action) {
  // 仅处理单个 item 操作
  // 将类型和操作对应起来
  const actionToFuncMap = {
    [Action.ADD_ITEM]: handleAddItem,
    [Action.DELETE_ITEM]: handleDeleteItem,
  }

  const func = actionToFuncMap[type]

  if (!func) {
    return undefined;
  }

  return func();
}
```

这种方式相较于使用 `if` / `switch` 更加简洁，不过上述代码第 19 行在 typescript 中会报错：

> Element implicitly has an 'any' type because expression of type 'Action' can't be used to index type '{ ADD_ITEM: () => void; DELETE_ITEM: () => void; }'. Property '[Action.ADD_LIST]' does not exist on type '{ ADD_ITEM: () => void; DELETE_ITEM: () => void; }'.

翻译一下就是说 `type` 还可能是 `ADD_LIST` / `QUERY_LIST`，但是没在 `actionToFuncMap` 中列出来，所以 `func` 有可能为 `any`。

面对这个问题当然可以直接根据报错提示，将 `actionToFuncMap` 的 key 补充完整：

```ts
// 不推荐做法：将 key 补充完成
const actionToFuncMap = {
  [Action.ADD_ITEM]: handleAddItem,
  [Action.DELETE_ITEM]: handleDeleteItem,
  [Action.ADD_LIST]: null,
  [Action.DELETE_LIST]: null,
}
```

但是这种做法不太好，因为就算用不到的类型也需要将它写出来。更好的方式是通过 **可选属性** 与 `in` 操作符结合使用：

``` ts
// 推荐做法：可选属性与 in 操作符结合
interface ItemHandler {
  (): void;
}

const actionToFuncMap: {
  [index in Action]?: ItemHandler;
} = {
  [Action.ADD_ITEM]: handleAddItem,
  [Action.DELETE_ITEM]: handleDeleteItem,
}
```

<Vssue title="TypeScript 使用" />
