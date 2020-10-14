# 常见问题

## Hooks 的优缺点

React 从 16.8 版本引入了 Hooks，主要有以下优点：

1. 增强了函数组件，让其从原来的纯展示组件，变成也能拥有自己的状态：返回值负责展示，Hooks 负责有副作用的操作。
2. 相较于 `渲染属性（render props）` 和 `高阶函数（higher-order components）`，Hooks 可以在不改变组件层级的情况下，实现组件状态相关代码的复用。
3. 将分散在 `componentDidMount`/`componentDidUpdate`/`componentWillUnmount` 等声明周期函数中的代码统一起来。

至于 Hooks 的缺点，个人认为它对于使用者提出了更高的要求，需要在开发中额外关注：

1. Hooks 依赖的处理，如果依赖处理错误，可能会造成错误的触发或者是该触发的时候未触发。
2. Hooks 拆分的粒度，如果拆分的粒度太小，会造成代码中散落着各种 Hooks，增加了代码的复杂性；如果拆分的粒度太大，又难以利用它提高复用性。

另外 Hooks 的原理可以看一下[这篇文章](https://github.com/brickspert/blog/issues/26)，**not magic, just arrays**。

<Vssue title="React 常见问题" />
