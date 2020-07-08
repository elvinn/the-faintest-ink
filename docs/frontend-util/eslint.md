# ESLint

## 编写自己的 plugin

有幸于社区的蓬勃发展，大部分情况下我们需要使用的代码规范都可以直接引用他人编写的 npm 包，不过有时候我们想要一些定制化的能力，所以仍需自己动手来编写一些自定义的规则。

相关的文档和博客非常多，这里推荐几个不错的资料，就不具体、详细地展开了：

1. [官方文档 - Working with Plugins](https://eslint.org/docs/developer-guide/working-with-rules)
2. [【AST篇】教你如何动手写 Eslint 插件](https://juejin.im/post/5d91be23f265da5ba532a07e)
3. [手摸手教你写个ESLint插件以及了解ESLint的运行原理](http://obkoro1.com/web_accumulate/accumulate/tool/ESLint%E6%8F%92%E4%BB%B6.html)

ESLint 官方提供了很方便的脚手架，我们按照下面的流程即可编写、发布自己的 plugin：

1. 通过 [yeoman-generator](https://www.npmjs.com/package/yeoman-generator) 和 [generator-eslint](https://www.npmjs.com/package/generator-eslint) 生成模版代码
2. 通过 [在线 AST 解析 - astexplorer](http://astexplorer.net/) 进行实验，找到需要检查的语法信息
3. 编写模板中 `rules` 目录下的文件，实现插件信息的配置、目标代码的校验、问题的自动修复等
4. 编写模板中 `tests` 目录下的文件，进行测试验证
5. 编写模版中 `docs` 目录下的文件，对规则进行说明
5. 发布插件到 npm 上

其中比较麻烦的就是第三步中插件信息的配置、目标代码的校验和问题的自动修复，这里通过编写一个插件，实现指定函数必须通过 return 语句来调用的规则进行举例说明，完整的代码可以看这里 [Github - eslint-plugin-call-func-with-return](https://github.com/elvinn/eslint-plugin-call-func-with-return)。

最终效果是假设我们配置 `jsonRet` 函数必须通过 return 语句来调用，那么可以实现如下代码的检查：

``` js
function main() {
    jsonRet({ author: 'elvinn' }); // error
    return jsonRet({ author: 'elvin' }); // ok
}
```

### 插件信息的配置

插件的信息配置在 `meta` 字段中，关键的有两个地方:

- `fixable`: `code` | `whitespace`，用来表示是修复代码还是仅修复空白字符问题。假如不配置这个字段的话，就算实现了自动修复的代码，也不会调用。
- `schema`: 通过 JSON Schema 的形式，指定传给 rule 的参数格式，例如下方的配置表示传入一个字符串数组。

``` js
// meta 对象
{
  ...
  fixable: 'code',
  // the rule options schema
  schema: [{
    type: 'array',
    items: { type: 'string' },
    description: 'function name list'
  }]
}
```

### 目标代码的校验和修复

代码的校验通过一个 `function create(context) { ... }` 的函数实现。

该函数返回一个对象，`key` 为抽象语法树中需要检查的节点或者是节点选择器，例如：

- `CallExpression:exit` 表示函数调用的节点，`:exit` 表示遍历语法树时，离开该节点的时候。
- `IfStatement > BlockStatement` 表示有块级语句跟随的 If 条件语句。

当 ESLint 解析到 `key` 所指定的节点时，就会调用相应的函数进行检查。若发现错误，则通过 `context.report({ ... })` 进行报错，主要关注参数中的两个字段：

- `message`: 提示给用户的报错信息。
- `fix`: autofix 时调用的函数，修复错误代码。

``` js {8,17-23}
function create(context) {
  var functionNameList = context.options[0];
  if (!functionNameList || !functionNameList.length) {
    return;
  }

  return {
    "CallExpression:exit": (node) => {
      if (functionNameList.indexOf(node.callee.name) === -1) {
        return;
      }

      if (node.parent.type === "ReturnStatement") {
        return;
      }

      return context.report({
        node,
        message: node.callee.name + " should be called with return",
        fix: function(fixer) {
          return fixer.insertTextBefore(node, "return ");
        }
      });
    },
  };
}

```

## plugins 和 extends 字段的区别

在 `.eslintrc.js` 中，我们经常在 `plugins` 和 `extends` 两个地方来引用第三方的配置，那这两个部分有什么区别呢？

``` js{3,6}
module.exports = {
  //...
  plugins: [
    'react',
  ],
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  rules: [
    // ... 声明需要使用的规范
  ]
}
```

简单地说，`extends` 中使用的是由一系列配置好的规则组成的配置文件，拿来就可以直接用了；而 `plugins` 则是提供了一系列可以用于代码检查的规则，至于如何配置这些规则，则依赖于用户在 `rules` 中的配置。也就是说，如果仅仅只是声明了 `plugins` 的话，并不会应用任何代码检查的规则。有一些 `plugins` 也提供了配置好的规则，可以通过 `plugin:react/recommended` 这种形式使用。

接下里进行更进一步地说明。

### config 介绍

每一个 config 都是名如 `eslint-config-<config-name>` 的 npm 模块，例如社区使用最多的配置 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)，用在 ESLint 配置文件中的 `extends` 字段。config 并不会涉及代码检查规则的实现，而是专注于规则的组合与配置，从而实现规则的共享，

从如下的 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) 源码中可以看到，它其实是三大块的组合：

- eslint-config-airbnb-base：es6+ 代码规范
- react：react 代码规范
- react-a11y：react 的网络无障碍（web accessibility）规范

```js
// https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js
module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    './rules/react',
    './rules/react-a11y',
  ].map(require.resolve),
  rules: {}
};
```

### plugin 介绍

每一个 plugin 都是名如 `eslint-plugin-<plugin-name>` 的 npm 模块，例如 [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)，它提供的能力非常多：

- 提供对非 JavaScript 类型文件的解析（processors）
- 实现新的代码检查规则（rules）和可能的自动修复能力（fix)
- 声明全局环境变量（environments）
- 配置可选的规范（configs）