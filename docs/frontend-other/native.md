# 内嵌页面

在腾讯课堂工作时，曾负责 Windows/Mac 客户端内嵌页面的开发，大体上的开发体验和在浏览器中开发差不多，只有一些小地方存在差异：

- **调试方法不同**：在浏览器中可以很方便的通过 F12 唤起开发者工具，但是在客户端中，往往仅嵌入了 Webview，需要通过特殊的手段进行调试，包括但不限于远程调试、注入调试工具、调用系统的 Webview 调试工具等。

- **loading 处理不同**：在客户端中，由于需要先加载 Webview，然后再加载网页，所以白屏时间更长。往往客户端会进行一些优化，例如在加载 Webview 的时候会显示 loading 的状态，等页面加载完成后再隐藏客户端的 loading 样式，。不过有时候由于客户端和 Webview 的通信存在延时，可能导致用户同时看到客户端和 Webview loading 的样式一起展示。

- **错误定位不同**：在客户端内嵌页中，除了网页本身的代码可能出错外，也有可能是 Native 端本身出了问题（例如 API 实现错误、内存错误等），所以在定位问题时，除了需要收集 Webview 的错误信息之外，有时还需要查看客户端的日志信息。

## Webview 调用客户端方法

客户端内嵌页面相较于浏览器中的页面多了更多的能力，而这主要是由于客户端提供了额外的 API 让 Webview 进行调用，目前有三种常见的实现方法：

1. **拦截页面请求**：客户端可以通过解析页面发出的请求中是否还有特殊的标志，来进行特殊的逻辑处理，例如 iOS/Mac 上著名的 [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge) 就是通过拦截 `https://__bridge_loaded__` 进行初始化操作。

2. **全局注入 API**：客户端在启动 Webview 的时候，可以选择性的往 `window` 全局变量上注入对象或者方法，当 Webview 中的 JavaScript 调用这些方法时，即可被客户端感知到。

2. **重写 JavaScript 方法**：客户端通过重写 Webview 中的 `alert/prompt/confirm` 等方法，达到和 *2-全局注入 API* 类似的效果。

## 客户端调用 Webview 方法

总的思想是 Webview 在 window.xxx 上绑定函数让客户端调用，比较有意思的是 Webview 调用客户端的时候，通过参数传递函数名给客户端，然后客户端在一段时间在调用指定的函数，整个思想非常类似 JSONP 的原理，示例代码如下：

```js {6,14,22}
/**
 * @description 生成客户端回调的全局函数，
 * @param {function} callback
 */
function generateGlobal(callback) {
  const key = `temp_callback_${Date.now()}${Math.ceil(Math.random() * 100)}`;
  const callbackWrap = function (...params) {
    callback(...params);
    if (window[key]) {
      delete window[key];
    }
  };

  window[key] = callbackWrap;
  return key;
}

function callMacNative(params) {
  return new Promise((resolve) => {
    const defaultCallback = (res) => resolve(res);
    const key = generateGlobal(defaultCallback);
    window.WebViewJavascriptBridge.callHandler(params.nativeApi, { ...params, callbackName: key });
  })
}
```

在上述的代码中，主要完成了三件事情：

1. 第 6 行生成了全局唯一的 key
2. 第 14 行将回调函数绑定在全局的 window 上
3. 第 22 行调用客户端接口，并传递包括回调函数名在内的参数。

<Vssue title="客户端内嵌页面开发" />