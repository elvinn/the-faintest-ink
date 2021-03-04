# 日志滚动切割

对于长期运行的服务而言，日志文件会越来越大，一方面会挤占磁盘空间，另一方面在搜索日志时也不方便。为了解决这些问题，常见的作法是对日志进行滚动切割，例如按天进行切割的话可以看到日志文件变成：

- example.log（正在写入的日志文件）
- example.log.2021-03-03（2021-03-03 的日志文件）
- example.log.2021-03-02（2021-03-02 的日志文件）
- example.log.2021-03-01（2021-03-01 的日志文件）
- ...

一般来说可以通过 Linux 下的 [logrotate](https://linux.die.net/man/8/logrotate) 工具实现，对于 Node.js 应用而言，也可以使用 [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) 或者 [egg-logrotator](https://github.com/eggjs/egg-logrotator)。

这些工具是如何实现日志滚动切割的能力的呢？ 在切割文件的过程中如果仍然在写入数据会怎么样呢？

目前主要是通过 `create` 和 `copytruncate` 两种方式实现，首先给出这两种方式的对比总结，接下来再具体介绍一下。

|      | create 方式                                                      | copytruncate 方式                                                           |
| ---- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 介绍 | 先重命名，再让应用重载日志                                       | 先复制，再清空原日志                                                        |
| 优点 | - 不复制文件，不会造成磁盘使用量突然上升<br>- 没有丢失日志的风险 | - 使用简单                                                                  |
| 缺点 | - 需应用程序支持重载日志的信号                                   | - 复制文件时，磁盘使用量突然上升<br/>- 清空原日志时，可能丢失正在写入的日志 |



## create 方式

这种方式的主要步骤如下：

1. 先将当前的日志文件 `example.log` 重命名为 `example.log.xxx`（此时新的日志会输出至 `example.log.xxx`）。
2. 创建新的空日志文件 `example.log`（此时新的日志仍会输出至 `example.log.xxx`）。
3. 通知应用程序，让其重新加载 `example.log`（此时新的日志会输出至 `example.log`）。

其中的关键在于利用了 Linux 的两个特性：

1. 修改文件的名字并不会影响它的 inode 号。
2. 打开一个文件以后，系统就以 inode 号来识别这个文件，不再考虑文件名。

所以说在重命名后、通知应用程序重新加载前的这段时间，应用程序仍然会保持向原来的 inode 号文件输出日志。

这种方式需要应用程序响应特殊的加载信号，所以会存在一定的侵入性。

Node.js 中，egg 框架使用的就是这种方式：

```js
// 滚动切割日志 egg-logrotator/rotator
async function rotate() {
  const files = await this.getRotateFiles();
  const rotatedFile = [];
  for (const file of files.values()) {
    await renameOrDelete(file.srcPath, file.targetPath);
    rotatedFile.push(`${file.srcPath} -> ${file.targetPath}`);
  }

  if (rotatedFile.length) {
    // 通知应用重载日志
    this.logger.info('[egg-logrotator] broadcast log-reload');
    this.app.messenger.sendToApp('log-reload');
    this.app.messenger.sendToAgent('log-reload');
  }
}

// 应用程序响应重载日志信号 egg-logger/transports
function reload() {
  this._closeStream(); // 关闭当前的日志文件
  this._stream = this._createStream(); // 重新加载日志文件
}
```

## copytruncate 方式

为了在无侵入的情况下实现日志的滚动切割，提出了 copy & truncate 的方式，主要步骤如下：

1. `copy`: 复制当前正在输出的日志文件 `example.log`，保存为 `example.log.xxx`（此时新的日志会输出至 `example.log`）。
2. `truncate`: 清空 `example.log` 文件（此时新的日志仍输出至 `example.log`）。

这种方式无需应用程序实现特殊的逻辑，所以没有侵入性，实现起来非常简单，不过问题就是在第 2 布清空数据的时候，有可能应用程序正在写日志文件，从而导致这一小部分数据丢失。

Node.js 中，pm2 使用的是这种方式：

``` js
function proceed(file) {
  var final_time = moment().format(DATE_FORMAT);
  var final_name = file.substr(0, file.length - 4) + '__' + final_time + '.log';
  
  // 通过流实现文件复制
	var readStream = fs.createReadStream(file);
	var writeStream = fs.createWriteStream(final_name, {'flags': 'w+'});
  readStream.pipe(writeStream);

  writeStream.on('finish', function() {
    readStream.close();
    writeStream.close();
    // 复制完成后删除原文件
    fs.truncate(file, function (err) {
      if (typeof(RETAIN) === 'number') 
        delete_old(file);
    });
  };
```

<Vssue title="日志滚动切割" />