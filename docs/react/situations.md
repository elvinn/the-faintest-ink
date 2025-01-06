# 通用场景

抽象常见的使用场景，并给出解决方案。

## 如何执行异步任务，并展示 Loading、Error、Success 状态？

大部分 React 页面的的逻辑都是通过接口异步请求数据，然后展示相应的结果，需要注意以下几点：

1. 如何展示 Loading、Error、Success 状态？
2. 如何处理请求竞争的情况？ 例如参数变化后，需要使上一次请求失效，避免上一次请求响应速度慢，导致页面展示错误数据。

有多种解决方案，例如：

1. 通过三个不同的 `useState` 分别控制 loading、error 和 data，然后利用 `useRef` 手动更新 `latestRequestId` 来处理请求竞争问题。
2. 通过三个不同的 `useState` 分别控制 loading、error 和 data，然后利用 `useEffect` 的 cleanup 函数控制竞态问题。
3. 通过 `ErrorBoundary` 捕获错误，`Suspense` 捕获 loading 状态，然后利用 `use` 和 `useMemo` 处理异步请求。

具体的代码可以参考如下：

<iframe src="https://codesandbox.io/embed/yrd3d5?view=preview&module=%2Fsrc%2FApp.js"
  style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
  title="async-task"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>