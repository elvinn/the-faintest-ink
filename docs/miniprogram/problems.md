# 常见问题

## 如何同时处理单击与长按事件？

有些场景下，对于同一元素，我们既需要响应单击事件，也需要响应长按操作，例如对于图片：既需要单击预览，也需要长按能发送给好友。不过在小程序中，如果我们写出如下代码的话，会导致在长按操作的情况下触发单击事件的响应函数 `onTap`：

``` html{4,5}
<image
    src="https://elvinn.cn/img/xiaohuangji/data/006da5b8bbc58fc8ebe4145d3f34c0d8.gif"
    mode="aspectFit"
    show-menu-by-longpress
    bindtap="onTap"
/>
```

之所以会这样，是因为当用户长按时，触发的事件依次是 `touchstart` -> `longpress` -> `touchend` -> `tap`，所以在触发 `longpress` 事件后，一定会触发 `tap` 事件。为了让 `onTap` 函数仅响应单击操作，可以通过 `touchstart` 和 `touchend` 之间的时间间隔来判断：

``` js{3,7,11-14}
Page({
  onTouchStart(event) {
    this.startTime = event.timeStamp;
  },

  onTouchEnd(event) {
    this.endTime = event.timeStamp;
  },

  onTap(event) {
    if (this.endTime - this.startTime >= 350) {
      // 说明是长按，直接返回
      return;
    }
  },
})
```

<Vssue title="小程序常见问题" />
