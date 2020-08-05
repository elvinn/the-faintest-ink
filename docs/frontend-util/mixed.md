# 杂

## 关闭 Chrome CORS 检查

在本地开发的时候，经常会碰到需要进行跨域请求的情况。

一般情况下，可以通过 [whistle](https://github.com/avwo/whistle) 的 [resCors](https://wproxy.org/whistle/rules/resCors.html) 规则来修改请求的响应头来变成合法的 CORS 请求。

不过某些研发环境无法使用 whistle，这个时候可以直接关闭 Chrome 的 CORS 检查：

``` shell
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/<username>/MyChromeDevUserData/
```

<Vssue title="前端工具杂谈" />