# 基本使用

[Vue](https://vuejs.org/) 是一个渐进式的 JS 框架，虽然平时工作中使用不多，但是我会通过它快速地启动一些个人项目，主要是因为它配置简单，方便上手，可用于最小可行性验证。

## [slot 插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

`slot` 的概念来源于 Web Component，类似于 React 当中的 `render props`，从而形成一种多态的效果，实现代码的复用。

例如存在一个 `<submit-button>` 组件：

``` vue
<button type="submit">
  <slot>Submit</slot>
</button>
```

那么既可以不提供内容展示默认的 Submit，也可以传入文本进行覆盖：

```vue
<!-- 展示 Submit -->
<submit-button /> 

<!-- 展示 Save -->
<submit-button>Save</submit-button>
```

### 具名插槽

当需要多个 slot 的时候，得通过不同的名称进行区分。

例如刚刚的 `<submit-button />` 需要进行升级，让其除了能让外部传入文本之外，还支持传入图标，那么可以进行如下变更：

``` vue
<button type="submit">
  <slot name="icon"></slot>
  <slot>Submit</slot>
</button>
```

使用的时候，通过在 `<template>` 元素上使用 `v-slot` 指令指定相应的名称：

``` vue {3}
<!-- 传入文案的同时，传入 icon -->
<submit-button>
  <template v-slot:icon>
    <icon type="file" />
  </template>
  Save
</submit-button>
```

::: tip
1. 默认的 slot 其实也有名字，为 `default` 。
2. `v-slot="icon"` 可以简写为 `#icon`
:::

::: warning
在 2.6.0 版本以前，可以使用 `slot="name"` 的方式来使用具名插槽， 不过已经被 `v-slot:name` 替代，并将在 3.0 版本中移除老写法的支持。
:::

### 作用域插槽

由于父级模板里的所有内容都是在父级作用域中编译的，子模板里的所有内容都是在子作用域中编译的，所以默认情况下，作为 slot 的元素只能获取到父组件中的数据，无法访问到子组件中的数据。

不过有时让 slot 元素能够访问子组件中才有的数据是很有用的，这种时候就可以通过作用域插槽来实现。

设想一个带有如下模板的 `<current-user>` 组件，可以将子组件中的数据作为 `<slot>` 元素的一个属性绑定上去：

``` vue {2}
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

现在就可以在父组件中的，通过作用域插槽访问到子组件的数据：

``` vue {2,8,13}
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

<!-- 只有默认插槽的时候，可以不使用 template -->
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

 <!-- 利用解构，进一步精简代码 -->
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

## 属性绑定

有的时候会看到通过 `:attr="xxx"` 的方式传值，有的时候也会看到去掉省略号的方式 `attr="yyy"` 传值，那么这两者有什么区别呢？

``` vue
<user-info
  :name="username"
  age="24"
>
```

其实 `:name="username"` 是 `v-bind:name="username"` 的简写，属于动态绑定，会将 `username` 这个变量的值传递到子组件的属性 `name` 上，而 `age="24"` 则只是简单的字符串传递。

例如对于如下实现的子组件 `<user-info>`：

``` vue
<template>
  <div>
    Hello {{name}}, your age is {{age}}. <br>

    Prop name type is {{typeof name}}. <br>
    Prop age type is {{typeof age}}. <br>
  </div>
</template>
```

当在父组件中进行如下调用时：

``` vue
<template>
  <div id="app">
    <user-info :name="username" age="24" />
  </div>
</template>

<script>
import UserInfo from './components/UserInfo'

export default {
  name: 'App',
  components: {
    UserInfo,
  },
  data() {
    return {
      username: 'elvinn',
    }
  }
}
</script>
```

渲染结果为:

``` html
Hello elvinn, your age is 24. 
Prop name type is string. 
Prop age type is string. 
```

<Vssue title="Vue 基本使用" />
