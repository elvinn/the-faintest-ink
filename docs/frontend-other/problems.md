# 问题解决记录

## 测试用例导致内存爆炸

### 问题

在跑抽奖概率相关的测试用例时（重复一百万次测试中奖概率），发现持续二十多分钟后内存爆炸异常退出。

### 原因

每次抽奖都会调用 `console.log/console.warn` 等向 shell 打印日志，但是测试框架 jest 在执行测试用例的过程中不会直接输出日志，而是等测试用例成功后再输出，所以 jest 在持续的收集日志（保存在内存中），最终一百万次测试用例的日志将内存撑爆。

### 解决方式

1. 通过 silent=true 配置，让 jest 直接抛弃 `console.log/console.warn` 等输出。
2. 让 jest 立即输出日志，而不是将其收集起来后输出，不过这个功能仍在开发中，参考 [issue: Jest eats up all console.log messages during debugging](https://github.com/facebook/jest/issues/8208)。

<right-text>2020.11.26</right-text>

<Vssue title="前端问题解决记录" />