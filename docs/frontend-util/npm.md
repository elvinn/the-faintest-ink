# npm

## npm ci 命令

一般安装依赖会使用 `npm install` 或者 `npm i` 命令，不过从 npm V6 版本引入了新的命令 - `npm ci`，它与 `npm i` 有什么异同呢？

`npm install` 或者 `npm i` 适用于开发时安装新的依赖或者升级依赖的场景，它主要完成下列事情：

1. 安装依赖；
2. 如果通过 `^` 或者 `~` 声明依赖的版本，那么它可能会安装更新的版本；
3. 当存在更新的时候，会更新 `package-lock.json` 文件。

`npm ci` 适用于持续集成（CI）的场景或者想安装依赖却不想更新 `package-lock.json` 的时候，它主要完成以下事情：

1. 删除 `node_modules` 目录；
2. 根据 `package-lock.json` 的描述，安装一模一样版本的依赖；
3. 检查 `package-lock.json` 是否符合 `package.json` 的内容，不一致的话报错退出。

## package-lock.json 作用

`package-lock.json` 从 npm V5 版本引入，主要有以下作用：

1. `package-lock.json` 的依赖结构与 `node_modules` 的目录结构完全相同，一一映射；
2. 结合 `npm ci` 命令，保证每次安装的依赖版本相同。

考虑到第 2 点作用，强烈建议在代码库中提交 `package-lock.json` 文件，而不是将它忽略。

## package-lock.json 探索

### 层级结构

有的时候，包 A 依赖于包 B，但是在 `package-lock.json` 中，包 A 和包 B 却是同级，这是为什么呢？
有的时候，包 C 在 `package-lock.json` 中层级结构的最外层，但是却不是 `package.json` 中声明的包，这是为什么呢？
有的时候，包 D 和包 E 依赖于不同版本的包 F1 和包 F2，但是包 F1 和 D 同级，但是包 F2 确实 E 的子级，这是为什么呢？

在回答上面这三个问题之前，我们要先弄明白 `package-lock.json` 的生成过程，具体如下：

1. 根据 `package.json` 中声明的包，去 npm 源查询依赖项，生成节点树；
2. 遍历所有包信息节点，尝试将其放在最外层，主要进行如下操作：
    - 若外层没有该包，将其放在最外层
    - 若外层有兼容 semVer 版本的包，舍弃该节点
    - 若外层有不兼容 semVer 版本的包，保持节点位置不动

通过上述操作，最终生成的 `package-lock.json` 其实是 **扁平化** 后的结果。

再来看看一开始提出的问题：

1. 因为扁平化后，A 和 B 同级了。
2. 因为 C 是 `package.json` 中声明的包 A 的依赖，扁平化后就在最外层了。
3. 因为遍历的时候先遍历的 F1 版本，将其扁平化到了外层，后来再遍历到 F2 版本的时候，发现和 F1 版本不兼容，所以没有被扁平化。


### 字段说明

`package-lock.json` 中一个典型的包信息如下：

``` json
{
    "eslint": {
        "version": "6.8.0",
        "resolved": "http://r.tnpm.oa.com/eslint/download/eslint-6.8.0.tgz",
        "integrity": "sha1-YiYtZylzn5J1cjgkMC+yJ8jJP/s=",
        "dev": true,
        "requires": {
            "@babel/code-frame": "^7.0.0",
            // ...
        },
        "dependencies": {
            "ansi-escapes": {
                // ...
            },
            // ...
        }
    }
}
```

常见的字段有：

- `version`：包的具体版本
- `resolved`：包的下载地址
- `integrity`：包的完整性校验
- `dev`：为 `package.json` 中 `dependencies` 声明的包或是子包时，为 false，否则为 true
- `requires`：列出这个包需要的所有子包及版本
- `dependencies`：这个包下需单独安装的子包信息，与 `node_modules` 目录结构相映射

`requires` 和 `dependencies` 的异同点需要额外关注。

## npm VS Yarn

`npm` 是 Node.js 默认的包管理器，而 `Yarn` 则是 Facebook 在 2016 年推出，用于解决当时 `npm` 存在的一些性能和安全问题。

::: tip
2020 年 1 月的时候，Facebook 推出了 Yarn2，在社区引起了巨大的争论，所以下文讨论的内容都针对目前广泛使用的 Yarn1。
:::

经过了几年的发展，npm 从 Yarn 上吸取了不少优点，例如 `package-lock.json` 等，目前主要在以下方面存在差别：

- Yarn 依然更快，而且在有缓存的情况下会快很多，主要是它是并行安装，而 npm 则是顺序安装，并且 Yarn 有离线模式，支持再次安装时从缓存中获取。
- Yarn 输出信息更加简洁.
- `package-lock.json` 层级结构与 `node-modules` 目录结构一一对应，而 `yarn.lock` 则是完全扁平化.


<Vssue title="npm" />
