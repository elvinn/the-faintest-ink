# 基础知识

在学习前端的过程中，总能时不时发现一些出乎意料的事情，我称它们为“冷知识”，虽然不是很有用，但是很有意思，而且一不小心就会掉进坑里。

## 日期

Javascript 中内置的 `Date` 日期模块一直饱受诟病，所以才会有 [moment](https://github.com/moment/moment) / [dayjs](https://github.com/iamkun/dayjs) 等优秀的日期库出现。最近刚好学习到了原生日期模块的一个冷知识，你觉得下面这段代码表示的是同一个时间点吗？

``` js
const date1 = new Date('2020-11-03')
const date2 = new Date('2020.11.03')
const date3 = new Date('2020 11 03')
const date4 = new Date(2020, 11, 03)
```

一开始我以为 `date1`/`date2`/`date3`/`date4` 表示的都是 2020 年 11 月 03 日这一天，然而现实总是那么的出乎意料：Javascript 会自动判断传入的字符串是否符合国际标准的日期格式，若符合则用 UTC 0 时区的时间，否则则用本地的时区。

上面的例子中，输出日期后可以得到如下结果：

``` js
const date1 = new Date('2020-11-03') // 2020-11-03T00:00:00.000Z
const date2 = new Date('2020.11.03') // 2020-11-02T16:00:00.000Z
const date3 = new Date('2020 11 03') // 2020-11-02T16:00:00.000Z
const date4 = new Date(2020, 11, 03) // 2020-12-02T16:00:00.000Z
```

从上面的结果中可以看出来，除了 `yyyy-mm-dd` 形式的字符串被认为是 UTC 0 时区的日期外，其它的连接符表示均被认为是本地时区的日期，需要格外注意。

## Object.create(null)

在 Vue 的源码中，经常可以看到作者使用 `Object.create(null)` 而不是直接使用对象自变量 `{}` 创建一个空对象，那么这种方式有什么好处呢？

主要优点是通过 `Object.create(null)` 创建的对象是一个干净的 map，它的原型（prototype）为空，对于字典查找时效率会高那么一丢丢，举个例子：

- 对于使用自变量 `{a: 1}` 创建的对象，在查找 `b` 属性的的时候，会先检查自身有没有，然后再去原形链上查找。
- 对于使用 `Object.create(null)` 创建的对象，在查找 `b` 属性的的时候，仅会在自身进行检查。

虽然这种方式会提升一点性能，但是只有在追求极至的工具库（例如 Vue）才需要考虑，平时写业务代码的时候其实差别可以忽略。

另外需要注意的是，通过 `Object.create(null)` 创建的对象，由于没有原型，所以诸如 `hasOwnProperty` / `toString` 等方法都无法直接调用：

``` js
const obj = Object.create(null)
obj.name = 'test-obj'

obj.hasOwnProperty // undefined
obj.toString // undefined

Object.prototype.hasOwnProperty.call(obj, 'name') // true
Object.prototype.toString.call(obj) // '[object Object]'
```

## 页面初始化事件

面试题很喜欢考察的一个点是 `load/DomContentLoaded/readystatechange` 事件之间有什么区别，并讲出它们的执行顺序，例如你能说出下面代码的输出吗？

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>
    window.addEventListener('load', (event) => console.log('load'));

    document.addEventListener('readystatechange', (event) => console.log(`ready state: ${document.readyState}`));

    document.addEventListener('DOMContentLoaded', (event) => console.log(`DOMContentLoaded\n`));
  </script>
</head>
<body></body>
</html>
```

除了触发事件的目标元素不同（`readystatechange/DOMContentLoaded` 在 `document` 上，而 `load` 在 `window`）上，最大的区别就是触发时间不同：

- `load`：表示全部资源加载完成。
- `DomContentLoaded`：表示 document 已经解析完成，即将加载图片、CSS 样式等子资源。
- `readystatechange`：有 `loading`/`interactive`/`complete` 三种值，其中 `loading` 表示正在加载资源；`interactive` 表示用户可进行交互，此时表示 document 已经解析完成，即将加载图片、CSS 样式等子资源；`complete` 表示全部资源加载完成，即将触发 `load` 事件。

需要说明的是在 `readystatechange` 事件触发之后，才会触发相应的 `DomContentLoaded`/`load` 事件，这非常有利于我们记忆。对于最开始列出的代码，它的输出即为:

```
ready state: interactive
DOMContentLoaded
ready state: complete
load
```

除了上述三个原生的事件之外，经常被问起的还有 jQuery 中 `$.ready(fn)` 和它们的区别。在我个人看来，对于现代浏览器而言，可以将其等价为在 `DomContentLoaded` 事件触发时执行 `fn` 函数。

另外监听这些事件一般都是为了在页面加载完成后执行相应的 JavaScript 代码，我更喜欢的方法是将这段代码放在 HTML 的尾部：

``` html
<!DOCTYPE html>
<html lang="en">

<head><!-- ... --></head>
<body>
  <!-- ... -->
  <script>
    // 在页面加载完成后执行
    // ...      
  <script>   
</body>

</html>
```

## String.raw

对于一些含有转义字符的字符串，例如 Windows 下的路径 `C:\Program Files (x86)\Tencent`，使用 `String.raw` 可以很方便的表示，节省转义字符 `\`：

- 传统表示：'C:\\\\Program Files (x86)\\\\Tencent'
- 模板字符串表示：String.raw\`C:\Program Files (x86)\Tencent\`

## 惰性加载函数

对于前端代码而言，必须要考虑的一个问题就是兼容性，为了实现一个功能，时常需要针对不同的浏览器环境编写不同的代码。例如一个简单的事件绑定函数如下所示：

``` js
function bindEvent(element, eventName, handler) {
  if (document.addEventListener) {
    element.addEventListener(eventName, handler);
    return;
  }

  const typeString = 'on' + eventName;
  if (document.attachEvent) {
    element.attachEvent(typeString, handler);
    return;
  }

  element[typeString] = handler;
}
```

通过这种 `if ... else ...` 的代码可以很方便地解决兼容性问题，但是每次调用都进行兼容性判断是不必要的，其实仅在第一次运行的时候进行判断就足够了，这种做法就叫做**惰性加载**，具体的实现方式有两种：

- 在函数定义时，通过自执行函数完成逻辑判断
- 在函数第一次执行时，进行逻辑判断覆盖函数本身

相应的代码如下：

``` js
// 方式一：在函数定义时，通过自执行函数就完成逻辑判断
const bindEvent = (element, eventName, handler) {
  if (document.addEventListener) {
    return (element, eventName, handler) => {
      element.addEventListener(eventName, handler);
    };
  }

  if (document.attachEvent) {
    return (element, eventName, handler) => {
      element.attachEvent('on' + eventName, handler);
    };
  }

  return (element, eventName, handler) => {
    element['on' + eventName] = handler;
  }
}()
```

``` js
// 方式二：在函数第一次执行时，进行逻辑判断覆盖函数本身
const bindEvent = (element, eventName, handler) {
  if (document.addEventListener) {
    bindEvent = (element, eventName, handler) => {
      element.addEventListener(eventName, handler);
    };
  }

  if (document.attachEvent) {
    bindEvent = (element, eventName, handler) => {
      element.attachEvent('on' + eventName, handler);
    };
  }

  bindEvent = (element, eventName, handler) => {
    element['on' + eventName] = handler;
  }
}
```

## 稀疏数组

在初始化一个 `[0, 1, 2, 3, 4, 5, 6, 7]` 数组的时候，我写出了如下代码：

``` js
const array = new Array(8).map((_, index) => index);
```

然而运行结果出乎意料，`map` 中代码并未执行，`array` 变成了 `[empty × 8]`，这是为什么呢？

实际上这里 `array` 是一个**稀疏数组（sparse array）**，就是索引不连续，数组长度大于元素个数的数组，也就是有空隙的数组，可以通过如下五种方式产生：

``` js
// 1. 直接使用 new Array
const arrA = new Array(8);

// 2. 连续的逗号
const arrB = [1, 2,, 3];

// 3. 指定大于元素个数的长度
const arrC = [];
arrC.length = 5;

// 4. 指定的索引值大于当前数组长度
const arrD = [1];
arrD[5] = 9;

// 5. 删除元素
const arrE = [1, 2, 3];
delete arrE[1];
```

对于这类稀疏数组，用 ES6 `map/forEach` 等方法遍历的时候，会跳过其中的 `empty` 元素：

``` js
const arrB = [1, 2,, 3];
console.log(arrB.length);
// 输出 4

arrB.forEach((item) => console.log(item));
// 输出 1 2 3

for (let i = 0; i < arrB.length; i++) {
  console.log(arrB[i]);
}
// 输出 1 2 undefined 3
```

回到最开始的问题，假如想初始化一个 `[0, 1, 2, 3, 4, 5, 6, 7]` 数组的时候，有什么简单的方法呢？我们可以使用 `Array.from` 来实现这个效果：

``` js
Array.from({ length: 8 }, (_, i) => i);
```

## Set-Cookie

请求响应头部的 `Set-Cookie` 被用来由服务器端向客户端设置 cookie，有几个有意思的字段记录下。

### SameSite

`SameSite` 用于规定相关的 cookie 是仅能被本网站使用（first-party）还是会在第三方网站（third-party）中访问本网站链接时，也能使用。它有三个可选的值：

1. `None`: 在本所有网站请求中均可发送 cookie（需同时设置 Secure 以保证通过 HTTPS 传递 cookie）。
2. `Lax`: 在本网站的请求和在其它网站通过导航到本网站的 GET 请求都可以发送 cookie。
3. `Strict`: 仅在本网站的请求中可发送 cookie（对于从其他页面点击跳转到本网站的初始请求，也不会携带 cookie）。

在 Chrome 80 版本之后，对于没有设置 `SameSite` 字段的情况，会使用默认值 `SameSite=Lax`，主要是为了防止 CSRF 攻击，避免在恶意网站中提交的伪造请求携带被攻击网站的 cookie。

参考文档：

1. [阮一峰 - Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
2. [MDN - SameSite cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

### Secure

当设置了 Secure 属性的时候，仅有在使用 SSL 和 HTTPS 协议的时候， cookie 才会被发送到服务器。

### HttpOnly

当设置了 HttpOnly 属性的时候，被设置的 cookie 无法在 JavaScript 中被 `Document.cookie` / `XMLHttpRequest` / `Request` 使用到，可以用于防范 XSS 攻击。

### Expires & Max-age

Expires 和 Max-age 都可以用于指定 cookie 的有效期，前者值是具体的时间点，后者是一段时间（单位秒）：

1. 当两者都未设置值时，cookie 仅在本会话期有效。
2. 当两者均设置值时，以 Max-age 为准。

<Vssue title="前端基础知识" />