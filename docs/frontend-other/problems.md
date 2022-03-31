# 问题解决记录

## 测试用例导致内存爆炸

### 问题

在跑抽奖概率相关的测试用例时（重复一百万次测试中奖概率），发现持续二十多分钟后内存爆炸异常退出。

### 原因

每次抽奖都会调用 `console.log/console.warn` 等向 shell 打印日志，但是测试框架 jest 在执行测试用例的过程中不会直接输出日志，而是等测试用例成功后再输出，所以 jest 在持续的收集日志（保存在内存中），最终一百万次测试用例的日志将内存撑爆。

### 解决方式

1. 通过 silent=true 配置，让 jest 直接抛弃 `console.log/console.warn` 等输出。
2. 让 jest 立即输出日志，而不是将其收集起来后输出，不过这个功能仍在开发中，参考 [issue: Jest eats up all console.log messages during debugging](https://github.com/facebook/jest/issues/8208)。

<right-text>2020.11.26</right-text>

::: tip
27.2.5 版本已经修复了这个问题，在 `verbose` 模式下，会立即输出日志而不是缓存起来。

`[@jest/reporters] Do not buffer console.logs when using verbose reporter.`
:::

## 微信分享链接自定义分享内容

### 问题

在微信中分享自己的笔记时，发现仅能展示标题，无法自动爬取文章内容和缩略图，显示效果比较丑陋。

![微信分享效果](./public/wechat-share-empty.jpeg)

### 原因

按照网上说的方法，有两种实现的方式：

1. 在有一个通过微信认证的公众号前提下，使用 [JSSDK 分享接口](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#111) 自定义分享的内容：

```js
wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
  wx.updateAppMessageShareData({ 
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    success: function () {
      // 设置成功
    }
  })
}); 
```

2. 分享的标题会自动抓取页面的 `title`，缩略图会自动抓取网页的第一张图片，所以可以通过如下方式注入缩略图：

```html
<!-- 该方法已失效 -->
<div id='wx_pic' style='margin:0 auto;display:none;'>
  <img src="/path/图片路径" alt="微信分享缩略图" />
</div>
```

然而遗憾的是，经验证发现第二种方法已无法使用，根据[微信团队的说法](https://mp.weixin.qq.com/s?__biz=MjM5NDAxMDg4MA==&mid=2650959286&idx=1&sn=0827bb3e1a2cc6fd21d4e01eb82ea1be&chksm=bd788fd98a0f06cfd318c01ec3d800698d47d54964eed389c5e7a1590a711bd6535b71479475&mpshare=1&scene=23&srcid=0331eSY1QUWHhUBxxEsSmnM1#rd)，*对于未接入微信JSSDK或已接入但JSSDK调用失败的网页，被用户分享时，分享卡片将统一使用默认缩略图和标题简介，不允许自定义*。

### 解决方式

若想在微信分享时自定义分享内容，则必须通过 JSSDK 分享接口进行自定义，因而需要有一个通过微信认证的公众号。对于公司而言这不存在障碍，但是对于个人开发者来说，由于微信公众号关闭了个人的微信认证能力，所以目前个人也就暂时没有办法能够自定义分享了。

<right-text>2020.12.24</right-text>


## CSS transform 在 Safari 上的问题

### 问题

在做小程序的过程中，发现有一段 CSS 动画在 Android 和 iPhone 效果不一致，最开始还以为小程序的兼容性问题，最后发现是 Chrome / Safari 对样式的渲染不同。

下面这个是简化之后的例子：

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNEjmPO" data-user="elvinn" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/elvinn/pen/WNEjmPO">
  stacking context</a> by Elvin Peng (<a href="https://codepen.io/elvinn">@elvinn</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<ClientOnly><CodePen /></ClientOnly>

在 Chrome 中子元素的内容不会溢出父元素（因为 `overflow:hidden`），而在 Safari 中却会溢出：

![Safari 问题显示](./public/overflow-bug-safari.jpg)

概括的来说，在 Safari 中，当父元素有 `overflow:hidden` 和 `border-radius: Xpx` 时，如果子元素有一些涉及 3D 的 `transform` 效果（例如 `translate3d`），那么会导致子元素溢出，而不是如预期一样被隐藏。

### 原因

搜索了一些资料，发现这个问题很早之前就有人提出并向 Safari 反馈了，不过一直以来并没有被修复，个人认为这可能是因为 Safari 的开发团队对 3D 效果的理解和实现与众不同，他们并不认为这是 bug ，所以并没有进行修复。

更详细的讨论可以访问下面这些资料：

1. [张鑫旭 - Safari 3D transform变换z-index层级渲染异常的研究](https://www.zhangxinxu.com/wordpress/2016/08/safari-3d-transform-z-index/)
2. [gist - Safari border-radius + overflow: hidden + CSS transform fix](https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b)
3. [stackoverflow - Webkit border-radius and overflow bug when using any animation/transition](https://stackoverflow.com/questions/14383632/webkit-border-radius-and-overflow-bug-when-using-any-animation-transition/16681137)

### 解决方式

从上面的一些讨论资料可以看出来主要是子元素的 z-index 发生了改变导致的溢出，于是自然而然的想法就是对于父元素创建一个层叠上下文。

改变层叠上下文的方式有不少，我试了下 [MDN - 层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) 提到的几种方式，基本上都是有效的：

1. 对于父元素 `.container` 设置 `position: relative; z-index: 1;`
2. 对于父元素 `.container` 设置 `-webkit-mask-image: -webkit-radial-gradient(white, black);` (来自 [gist](https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b) 的骚操作)
3. 对于父元素 `.container` 设置 `opacity: 0.999;`
4. 对于父元素 `.container` 设置 `will-change: transform;`

我个人比较推荐第一种方式，它的可读性更高，而且也不会有什么渲染性能上的额外开销。

<Vssue title="前端问题解决记录" />