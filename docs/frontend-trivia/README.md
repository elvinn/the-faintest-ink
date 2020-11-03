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
const date2 = new Date('2020-11-03') // 2020-11-02T16:00:00.000Z
const date3 = new Date('2020 11 03') // 2020-11-02T16:00:00.000Z
const date4 = new Date(2020, 11, 03) // 2020-12-02T16:00:00.000Z
```

从上面的结果中可以看出来，除了 `yyyy-mm-dd` 形式的字符串被认为是 UTC 0 时区的日期外，其它的连接符表示均被认为是本地时区的日期，需要格外注意。

<Vssue title="前端冷知识" />