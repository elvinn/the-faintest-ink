# 常见实践总结

## 在 template 中使用常量

在视图层，我们经常需要根据不同的状态进行不同的展示，例如加载中、加载成功、加载失败对应不同的展示。比较好的实践是将这些状态抽取成常量进行统一维护，那在 template 中该如何使用的这些常量实现如下的效果呢？

```vue
<div v-if="loginState === LOGIN_STATE.LOADING">正在登陆中...</div>
<div v-else-if="loginState === LOGIN_STATE.FAILED">登录失败，请稍后重试</div>
<div v-else-if="loginState === LOGIN_STATE.SUCCESS">登录成功</div>
```

由于 template 中只能获取到组件实例上的数据，所以需要将常量绑定在组件实例上，具体可以通过下面两种方式来绑定。

### 通过 data 绑定 <Badge text="不推荐" type="warning"/>

简单的方式就是将常量直接当作普通的 data 变量来使用：

```vue {9-11}
<script>
const LOGIN_STATE = {
  LOADING: 0,
  FAILED: -1,
  SUCCESS: 1,
}

export default {
  data () {
    this.LOGIN_STATE = LOGIN_STATE
  }
  // ...
}
</script>
```

这种方式虽然能够解决问题，但是 Vue 会将 data 中绑定的数据通过 getter/setter （Vue 2）或者 Proxy（Vue 3）变成响应式的，实际上我们并不需要这些常量是响应式的。

### 通过 created 生命周期绑定 <Badge text="推荐" />

在 `created` 生命周期中执行也可以将数据绑定在组件实例上。并且因为 `created` 执行的时候，组件的响应式绑定阶段已经结束了，从而避免了在 `data` 中直接绑定带来的问题。

```vue {3-5}
<script>
export default {
  created () {
    this.LOGIN_STATE = LOGIN_STATE
  }
  // ...
}
</script>
```

<Vssue title="Vue 常见实践总结" />
