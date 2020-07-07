# ESLint

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