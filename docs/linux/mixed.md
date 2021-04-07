# 杂

## 常见用法解释

### 网络编程

1. `AF_INET`: 表示 IPv4，其中 `AF` 是 `Address Family` 的缩写


## 常用命令

1. `du -h --max-depth=1`: 查看当前目录下所有子目录的总大小

## 配置文件加载顺序

在 Linux 下有好几个地方可以存放配置数据，例如：
- /etc/profile
- ~/.bash_profile
- ~/.bashrc
- ...

甚至有人专门画了一个图来表示它们的加载关系：

![bash startup files](./public/bash-startup-files.png)

在我们个人使用的过程中，不需要记得这么复杂，只需要记住下面这两点就可以了：

1. `/etc/profile` 对所有用户都生效
2. `~/.bashrc` 和 `~/.bash_profile` 仅对当前用户生效

::: tip
1. `rc` 是 *run commands* 的缩写，也就是表示运行命令。
2. `~/.bash_profile` 只在会话开始时被读取一次，而 `~/.bashrc` 则在每次打开新的终端时，都会被读取，所以一般配置在 rc 文件中即可。
:::

<Vssue title="Linux 杂" />
