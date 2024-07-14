# 热更新

热加载（Hot Module Replacement，HMR）是一种在前端开发中非常有用的技术，它允许在无需开发者手动刷新页面的情况下，自动替换、添加或删除模块，从而可以极大地提高开发效率，让开发者在不丢失应用程序状态的情况下看到代码的实时变化。

虽然不同的打包工具（Vite / Webpack / Parcel）等有不同的实现，但基本的原理相同，本文以 Vite 为例进行说明。

## 基本原理

热更新的核心原理是监听源代码的变化（可通过 [chokidar](https://github.com/paulmillr/chokidar) 实现），在变化发生时只更新那些发生变化的模块，而不是重新加载整个页面。具体步骤如下：

1. **监听文件变化**：当文件发生变化时，Vite 会重新编译这些文件。
2. **通知客户端**：Vite Dev Server 会通过 WebSocket 通知浏览器端有文件变化。
3. **更新模块**：浏览器端接收到通知后，会通过 HMR API 请求新的模块代码。
4. **替换模块**：新的模块代码被加载并替换旧的模块，应用程序状态保持不变。

其中第 1、2、3 步是构建工具实现的（例如 Vite），第 4 布是由框架实现的（例如 Vue / React）的。

接下来我们主要讲一讲第 4 步的实现。

## 简单例子

可以打开 [CodeSandBox - vite-hmr-example](https://codesandbox.io/p/github/elvinn/vite-hmr-example/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clyl88ljt00073b5wson9j13k%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clyl88ljt00023b5w7c99ln0n%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clyl88ljt00043b5w7y5bsln5%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clyl88ljt00063b5w7lum0x65%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clyl88ljt00023b5w7c99ln0n%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clyl88ljt00013b5wupzp02xn%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clyl88ljt00023b5w7c99ln0n%2522%252C%2522activeTabId%2522%253A%2522clyl88ljt00013b5wupzp02xn%2522%257D%252C%2522clyl88ljt00063b5w7lum0x65%2522%253A%257B%2522id%2522%253A%2522clyl88ljt00063b5w7lum0x65%2522%252C%2522activeTabId%2522%253A%2522clyl8dzpr002b3b5wd96lz1nz%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522port%2522%253A5173%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clyl8dzpr002b3b5wd96lz1nz%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522clyl88ljt00043b5w7y5bsln5%2522%253A%257B%2522id%2522%253A%2522clyl88ljt00043b5w7y5bsln5%2522%252C%2522activeTabId%2522%253A%2522clyl8dx8y001w3b5w73mywla0%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clyl8dx8y001w3b5w73mywla0%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D) 进行体验，首先在 `index.html` 中注册了 ESM 模块 `main.js`：

``` html {4}
<body>
  <h1>Counter: <span id="counter">0</span></h1>
  <button id="increment">点击 +1</button>
  <script type="module" src="/main.js"></script>
</body>
```

然后在 `main.js` 通过对 HMR API 的回调的注册实现了热更新的能力：

``` javascript {22-34}
console.log('执行 main.js');

let counter = 0;

// 更新 HTML 中的 counter
function updateCounter() {
  document.getElementById('counter').innerText = counter;
}

// 点击事件响应函数
function onIncrement() {
  counter++;
  updateCounter();
}

// 绑定监听事件
const incrementButton = document.getElementById('increment');
incrementButton.addEventListener('click', onIncrement);

// HMR API 处理
if (import.meta.hot) {
  // 注册新代码生效时的回调
  import.meta.hot.accept(() => {
    console.log('执行 accept');
  });

  // 注册旧代码被移除时的回调
  import.meta.hot.dispose((data) => {
    console.log('执行 dispose', data);
    // 保存旧数据
    data.counter = counter;
    // 移除副作用
    incrementButton.removeEventListener('increment', onIncrement);
  });

  if (typeof import.meta.hot.data.counter!== 'undefined') {
    // 恢复旧数据
    console.log('回复数据');
    counter = import.meta.hot.data.counter;
  }
}
```

我们可以点击“+1”按钮，发现 `counter` 值增加。然后编辑并保存本地的 `main.js`，发现它被自动重新加载，而且 `counter` 保持之前的值不变。

打开控制台，可以发现如下顺序输出：

1. *执行 main.js*：第一次加载，开始执行 `main.js`。
2. *执行 dispose*：收到热更新通知，移除旧的 main.js。
3. *执行 main.js*：第二次加载，开始执行新的 main.js。
4. *恢复数据*：第二次加载，执行到新的 main.js 尾部。
5. *执行 accept*：第二次加载完成。

## 核心 API

### import.meta.hot

通过 `import.meta.hot` 来守护所有的 HMR API 使用，这样代码就可以在生产环境中被 tree-shaking 优化。

### import.meta.hot.accept

注册新模块加载完成时的回调。

### import.meta.hot.dispose

注册旧模块被移除时的回调。

### import.meta.hot.prune

注册模块在页面上不再被导入时的回调。

### import.meta.hot.data

`import.meta.hot.data` 对象在同一个更新模块的不同实例之间会被持久化，它可以用于将信息从模块的前一个版本传递到下一个版本（如上一节的例子中用于保存 `counter` 数据）。

## Vue 的热更新实现

Vue 热更新的实现主要是借助全局变量 `__VUE_HMR_RUNTIME__`。通过它，浏览器的运行时和本地启动的构建服务实现了交互。

### 运行时

Vue 运行时对热更新的实现代码在 [Github - runtime-core/src/hmr.ts](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/hmr.ts#L78)，主要是做了以下几件事情：

1. **全局暴露 __VUE_HMR_RUNTIME__**：在开发环境中，将 HMR 运行时暴露到全局对象上，以便构建插件使用。
2. **创建和管理 HMR 记录**：通过 `createRecord` 函数创建组件的 HMR 记录，并将其存储在一个全局的 `map` 中。
3. **注册和注销组件实例**：通过 `registerHMR` 和 `unregisterHMR` 函数，管理组件实例的注册和注销。
4. **重新渲染组件**：通过 `rerender` 函数，在组件模板或渲染函数发生变化时，重新渲染组件。
5. **重新加载组件**：通过 `reload` 函数，在组件的逻辑或样式发生变化时，重新加载组件。

### 构建插件

Vue 构建插件 Vite-plugin-vue 对热更新的实现代码在 [Github - plugin-vue/src/main.ts](https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/src/main.ts)，核心代码如下，主要是注册了 `import.meta.hot.accept` 的回调函数，用于调用 `rerender` 或者 `reload` 函数：

``` javascript
// HMR
if (
  devServer &&
  devServer.config.server.hmr !== false &&
  !ssr &&
  !isProduction
) {
  output.push(`_sfc_main.__hmrId = ${JSON.stringify(descriptor.id)}`)
  output.push(
    `typeof __VUE_HMR_RUNTIME__ !== 'undefined' && ` +
      `__VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main)`,
  )
  // check if the template is the only thing that changed
  if (prevDescriptor && isOnlyTemplateChanged(prevDescriptor, descriptor)) {
    output.push(`export const _rerender_only = true`)
  }
  output.push(
    `import.meta.hot.accept(mod => {`,
    `  if (!mod) return`,
    `  const { default: updated, _rerender_only } = mod`,
    `  if (_rerender_only) {`,
    `    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render)`,
    `  } else {`,
    `    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated)`,
    `  }`,
    `})`,
  )
}
```

## 参考文章

1. [Vite - HMR API](https://vitejs.dev/guide/api-hmr)。
2. [Bjorn Lu - Hot Module Replacement is Easy](https://bjornlu.com/blog/hot-module-replacement-is-easy)。

## 示例代码

1. [Github - elvinn/vite-hmr-example](https://github.com/elvinn/vite-hmr-example)。

<Vssue title="Vue 热更新" />
