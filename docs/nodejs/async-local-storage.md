# AsyncLocalStorage 的妙用

**AsyncLocalStorage** 可以在 web 请求或其它任何异步处理流程中，将数据存储起来，以便在接下来的子流程中使用，实现类似本地存储的效果。

兼容性如下：

| 版本               | 变化                             |
| ------------------ | -------------------------------- |
| v13.10.0, v12.17.0 | API 可以开始使用，处于实验状态。 |
| v16.4.0            | API 进入稳定状态。               |

## 基本用法

AsyncLocalStorage 的功能很强大，不过用法非常简单，核心是两个 API：

1. `asyncLocalStorage.run(store, callback)`: 将数据 store 保存起来，并令其可以在 callback 中获取（包括 callback 内部的子函数）。
2. `asyncLocalStorage.get(store)`: 获取 run 方法保存的 store 数据。

下面通过一个官方文档的示例来演示 AsyncLocalStorage 的用法：

1. 首先通过第 13 行的 `asyncLocalStorage.run({ id: idSeq++ }, callback)` 方法， 为每一个请求分配一个递增的唯一 id，并将其保存起来。
2. 接着在第 7 行 `const { id } = asyncLocalStorage.getStore();` 代码中，获取到了这个请求的 id，并进行输出。

```js{7,13}
import http from 'node:http';
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const { id } = asyncLocalStorage.getStore();
  console.log(id, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
  asyncLocalStorage.run({ id: idSeq++ }, () => {
    logWithId('start');
    // 内部的子流程仍然可以通过 getStore 获取到数据
    setImmediate(() => {
      logWithId('finish');
      res.end();
    });
  });
}).listen(8080);

// 并行触发两个异步流程
http.get('http://localhost:8080');
http.get('http://localhost:8080');
```

对应的输出为：

```text
0: start
1: start
0: finish
1: finish
```

在这个例子中，可以看到哪怕同时有多个并发请求来临，并行触发了对请求进行处理的异步流程，但每一个流程中通过 `asyncLocalStorage.getStore()` 获取到的数据也是彼此分离开来的，并不会互相影响，从而在异步流程中实现了本地存储的效果。

## 日志自动携带请求 traceId

### 存在的问题

在 node 服务中，需要特别关注日志信息的上报，当出现问题时能帮助我们快速定位原因。

假设有一段获取用户信息的代码，往往会进行如下错误处理：

```js
import logger from 'custom-logger-library';

async function getUserInfo(userId) {
  try {
    const user = await getUser(userId);
    // ...
  } catch (error) {
    logger.error(`getUserInfo 失败： ${userId} ${error.message}`);
  }
}
```

那么当 `getUser` 抛出错误时，可以收集到如下的日志信息：

> getUserInfo 失败：test-user xxxx

不过在业务线上环境，日志信息往往不会这么简单，还会带上时间、全链路 ID（traceId）等信息，例如：

> [2022-07-16 21:48 bf01b75f-7805-4cfa-a3f5-e582e8bb883a]getUserInfo 失败：test-user xxxx。

时间信息很容易获取，但是像 traceId 这种涉及到请求上下文的信息，对于通过 `import logger from 'custom-logger-library';` 这样通过全局引入的 logger 模块而言，是不可见的。

### 解决的办法

一种折中的方法就是服务初始化时，在请求上下文中注入上报能力，然后通过 `ctx.logger.error(...)` 进行上报，平时可以看到不少 koa 服务就是这样实现的。不过这种方式有个缺点：日志上报能力依赖 ctx，所以 `getUserInfo(userId)` 需要变成 `getUserInfo(ctx, userId)`，增加一个 ctx 参数，这样才能在函数内部上报时携带 traceId 信息。

现在借助于 **asyncLocalStorage**，我们可以通过中间件的方式，在请求的入口处将 traceId 等日志上报需要的请求上下文信息存到 store 当中，然后在实际上报时，内部再通过 `asyncLocalStorage.getStore()` 获取到 traceId 信息。

一个简单的例子如下所示，完整的代码可以参考 [asyncLocalStorage usage in logger](https://github.com/elvinn/async-local-storage-demo "asyncLocalStorage usage in logger")。

```js{10,15}
// logger.js
import { AsyncLocalStorage } from 'node:async_hooks';
import { v4 as uuidV4 } from 'uuid';

const asyncLocalStorage = new AsyncLocalStorage();

export async function loggerMiddleware(ctx, next) {
  // 请求头中没有 tradeId，则生成一个新的 tradeId 并存到 store 当中
  const traceId = ctx.get('x-trace-id') || uuidV4();
  await asyncLocalStorage.run(traceId, () => next());
}

// 上报时使用的方法
export function info(...args) {
  const traceId = asyncLocalStorage.getStore();
  console.log(`[${Date.now()} ${traceId}]`, ...args);
}

// app.js
import Koa from 'koa';
import logger from './logger';

const app = new Koa();

function reportRequest() {
  logger.info('收到请求');
}

app.use(logger.loggerMiddleware);
app.use((ctx) => {
  reportRequest();
  ctx.body = 'Hello World';
});
app.listen(3000);
```

## 其它

除了上报日志信息，`AsyncLocalStorage` 还可以用来简化其它依赖请求上下文的场景，例如为了避免在业务代码中，请求上下文 `ctx` 一层层向下传递，我们也可以采用类似方法通过 `AsyncLocalStorage.run(ctx, callback)` 的方式将其存储到 store 当中，具体的实现非常简单就不再赘述。

需要注意的是，使用 `AsyncLocalStorage` 后，nodejs 会对异步函数进行 hook 处理，从而带来 [约 8% 的性能损失](https://github.com/kuzzleio/kuzzle/pull/1604 "大约 8% 的性能损失")，而且在 node v16 上性能损失得到降低），在绝大部分情况下，这种损失相对获得的收益而言是可以接受的。
