# 编译优化

随着业务的发展，项目一般会越来越大，导致编译的耗时越来越长。当 TypeScript 项目的编译耗时大于 30 秒时，作为开发者的幸福感就会大大下降了。

本文主要介绍 TypeScript Compiler（简称 tsc） 提供的一些排查方法和优化的思路。

## tsc 排查方法

当项目编译耗时长时，我们首先需要弄清楚的是具体哪一步耗时长，是文件 I/O 耗时长、语法树解析时间长还是类型检测时间长呢？我们可以在编译时通过开启 `extendedDiagnostics` 选项输出如下各个阶段的耗时（同时也包含了 JavaScript / TypeScript 文件行数、节点数等数据）：

``` text
Files:                         440
Lines of Library:             7944
Lines of Definitions:        29702
Lines of TypeScript:         37619
Lines of JavaScript:            91
Lines of JSON:                   0
Lines of Other:                  0
Nodes of Library:            22313
Nodes of Definitions:       147694
Nodes of TypeScript:        128074
Nodes of JavaScript:           316
Nodes of JSON:                   0
Nodes of Other:                  0
Identifiers:                103346
Symbols:                     85718
Types:                       14503
Instantiations:              15138
Memory used:               151126K
Assignability cache size:     1622
Identity cache size:            80
Subtype cache size:            608
Strict subtype cache size:     408
I/O Read time:               0.03s
Parse time:                  0.43s
ResolveModule time:          0.06s
ResolveTypeReference time:   0.01s
Program time:                0.56s
Bind time:                   0.25s
Check time:                  0.90s
transformTime time:          0.13s
commentTime time:            0.07s
I/O Write time:              0.04s
printTime time:              0.59s
Emit time:                   0.59s
Total time:                  2.31s
```

其中关键的各个字段具体含义如下：

| 字段           | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| Files          | 包含的文件数量（可以用 `--listFiles` 查看具体是哪些文件）    |
| I/O Read time  | 读取文件的时间（包含遍历目录的时间）                         |
| Parse time     | 扫描和解析代码的时间                                         |
| Program time   | 读取文件、扫描和解析代码的时间、计算依赖图的时间（可以认为是前述几个时间的和） |
| Bind time      | 构建本地文件的各种语义化信息                                 |
| Check time     | 类型检查的时间（一般是耗时的大头）                           |
| transformTime  | 将 TypeScript 语法树重写为能在更早的 runtimes 运行的形式     |
| commentTime    | 计算评论的时间                                               |
| I/O Write time | 写/更新文件的时间                                            |
| printTime      | 计算文件的字符串并将其输出到磁盘所花费的时间。   |

除了 `extendedDiagnostics` 外，还有其他 3 个编译选项也很有用：

1. `listFiles`: 显示全部被编译的文件。
2. `listFilesOnly`: 仅仅展示会被编译的文件，而不真正编译代码，可以大量节约定位问题的时间。
3. `explainFiles`: 逐一说明文件被编译的原因，会展示在代码中哪里被引用。

## 优化方法

1. 善用 `include` / `exclude`

通过合理的配置 `include` / `exclude`，可以将无用文件排除在被编译的文件列表中（例如子目录下的 `node_modules`)，从而节约编译时间。

::: tip
若文件通过 `import` 的形式被其他代码引用，那么哪怕它在 `exclude` 中，也会被编译。
:::

2. 特殊情况使用 `require`

一般来说，在 TypeScript 中能够使用 `import` 的地方我们都会推荐使用 `import`， 而不是 `require` 来表示模块的引入。

不过在如下的特殊情况中，使用 `require` 会带来极大的编译性能提升：**被引用的模块用 JavaScript 编写，同时代码量巨大，而且没有对应的 `d.ts` 类型声明**。

使用 require 引入的模块，TypeScript 不会将其包含进需要编译的文件，从而节省时间，尤其是对于工具生成的 js 文件而言，效果明显。举个例子，我们项目中有一个工具根据 pb 文件生成的 js 代码，有 8.6 万行，当使用 `import` 引用它的时候，整个项目编译耗时需要 1 分钟，而使用 `require` 替代后，编译耗时下降到只需要 5-10 秒。

## 参考文档

1. [TypeScript Wiki - Performance](https://github.com/microsoft/TypeScript/wiki/Performance)

<Vssue title="TypeScript 编译优化" />
