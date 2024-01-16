# Github

## Github Action

Github Action 允许我们通过 YAML 文件来灵活自定义工作流程，包括 CI/CD、测试、定时任务等等。

下面是一个定时查询股票信息的例子，通过 `on.schedule` 声明了定时时间，用 `jobs.notify` 声明了具体的步骤，包括：

- *Checkout*: 获取代码
- *Setup pnpm*: 安装 pnpm
- *Setup node*: 安装 node
- *Execute*: 执行脚本

``` yaml
name: 查询股票信息
on:
  schedule:
    - cron: "0 10 * * 1-5"
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          run_install: true
      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - name: Execute
        env:
          BARK_KEY: ${{ secrets.BARK_KEY }}
        run: node scripts/notify-stock.js
```

### 常见问题

1. 为什么定时任务没有在指定时间运行？

首先，时间的定义是 `cron` 语法，推荐使用 [crontab.guru](https://crontab.guru/#0_10_*_*_1-5) 编写，例如 `0 10 * * 1-5` 表示周一到周五早上 10 点执行。

其次，在 Github Action 中声明的定时任务是以 **UTC** 时间为准，北京属于 UTC+8 的时区，所以这里的 `0 10 * * 1-5` 实际表示在北京时间的周一到周五 18 点执行（即下午 6 点）。

最后，Github Action 不保证任务在指定的时间准时执行，在高峰期会排队有延迟，甚至延迟过长时会干脆不执行任务，从我的经验来看，延迟几十分钟很常见。