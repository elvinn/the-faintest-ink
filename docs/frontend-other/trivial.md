# 冷知识

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

<Vssue title="前端冷知识" />