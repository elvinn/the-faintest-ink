import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '烂笔头',
  description: '好记性不如烂笔头 ｜ elvinn 的个人博客',
  lang: 'zh-CN',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: '上次更新时间',
    editLinks: true,
    editLinkText: '编辑此页',
    repo: 'elvinn/the-faintest-ink',
    docsDir: 'docs',
    docsBranch: 'master',
    algolia: {
      appId: 'MLPV9ICOY8',
      apiKey: '362b3bb9e5d19d96a41f5b3abd6bc0b5',
      indexName: 'elvinn',
    },
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '大前端',
        items: [
          {
            text: 'React',
            link: '/react/problems.html',
            activeMatch: '^/$|^/react/'
          },
          {
            text: 'Vue',
            link: '/vue/usage.html',
          },
          {
            text: '小程序',
            link: '/miniprogram/problems.html',
          },
          {
            text: 'TypeScript',
            link: '/typescript/situation.html',
          },
          {
            text: 'TypeScript 大挑战',
            link: '/typescript-challenge/1.html',
          },
          {
            text: 'Node.js',
            link: '/nodejs/memory.html',
          },
          {
            text: '音视频',
            link: '/audio-video/file-forma.html',
          },
          {
            text: '网络',
            link: '/network/https.html',
          },
          {
            text: '工具',
            link: '/frontend-util/eslint.html',
          },
          {
            text: '前端基础',
            link: '/frontend-basic/trivial.html'
          },
          {
            text: '总结记录',
            link: '/frontend-other/problems.html'
          }
        ],
      },
      {
        text: '后台',
        items: [
          {
            text: 'C++',
            link: '/cpp/stl-container.html',
          },
          {
            text: 'Linux',
            link: '/linux/file-descriptor.html',
          },
          {
            text: 'MySQL',
            link: '/mysql/usage.html',
          },
          {
            text: '常见场景',
            link: '/backend-common-situation/lock.html'
          }
        ]
      },
      {
        text: 'LeetCode',
        link: '/leetcode/skill.html',
      },
      {
        text: '阅读',
        items: [
          {
            text: '2024',
            link: '/reading/2024.html',
          },
          {
            text: '2023',
            link: '/reading/2023.html',
          },
          {
            text: '2022',
            link: '/reading/2022.html',
          },
          {
            text: '2021',
            link: '/reading/2021.html',
          },
          {
            text: '2020',
            link: '/reading/2020.html',
          }
        ],
      },
      {
        text: '个人项目',
        items: [
          {
            text: 'memo',
            link: '/self-project/memo.html'
          }
        ]
      }
    ],
    sidebar: {
      '/react/': [{
        text: 'React',
        children: [
          { text: '常见问题', link: '/react/problems.html' },
          { text: 'Hook', link: '/react/hooks.html' },
          { text: '升级变化', link: '/react/version-update.html' },
        ]
      }],
      '/vue/': [{
        text: 'Vue',
        children: [
          { text: '基本使用', link: '/vue/usage.html' },
          { text: '常见实践总结', link: '/vue/situation.html' },
        ]
      }],
      '/miniprogram/': [{
        text: '小程序',
        children: [
          { text: '基本使用', link: '/miniprogram/problems.html' },
        ]
      }],
      '/typescript/': [{
        text: 'TypeScript',
        children: [
          { text: '常用场景', link: '/typescript/situation.html' },
          { text: '常见问题', link: '/typescript/problems.html' },
          { text: '基础使用', link: '/typescript/basic.html' },
          { text: '编译优化', link: '/typescript/compile-improve.html' },
        ]
      }],
      '/typescript-challenge/': [{
        text: 'TypeScript 大挑战',
        children: [
          { text: '大挑战（一）', link: '/typescript-challenge/1.html' },
          { text: '大挑战（二）', link: '/typescript-challenge/2.html' },
          { text: '大挑战（三）', link: '/typescript-challenge/3.html' },
          { text: '大挑战（四）', link: '/typescript-challenge/4.html' },
          { text: '大挑战（五）', link: '/typescript-challenge/5.html' },
        ],
      }],
      '/nodejs/': [{
        text: 'Node.js',
        children: [
          { text: '有意思的 Node.js 内存泄漏问题', link: '/nodejs/memory.html' },
          { text: 'AsyncLocalStorage 的妙用', link: '/nodejs/async-local-storage.html' },
        ]
      }],
      '/audio-video/': [{
        text: '音视频',
        children: [
          { text: '视频格式', link: '/audio-video/file-format.html' },
          { text: '传输协议', link: '/audio-video/transform-protocol.html' },
        ]
      }],
      '/network/': [{
        text: '网络',
        children: [
          { text: 'HTTPS', link: '/network/https.html' },
          { text: 'TCP 协议', link: '/network/tcp.html' },
          { text: 'CDN', link: '/network/cdn.html' },
          { text: '网络名词释义', link: '/network/glossary.html' },
        ]
      }],
      '/frontend-util/': [{
        text: '工具',
        children: [
          { text: 'ESLint', link: '/frontend-util/eslint.html' },
          { text: 'npm', link: '/frontend-util/npm.html' },
          { text: 'pnpm', link: '/frontend-util/pnpm.html' },
          { text: 'Git', link: '/frontend-util/git.html' },
          { text: '杂', link: '/frontend-util/mixed.html' },
        ]
      }],
      '/frontend-basic/': [{
        text: '前端基础',
        children: [
          { text: '前端基础知识', link: '/frontend-basic/trivial.html' },
          { text: '迭代器与生成器', link: '/frontend-basic/iterator.html' },
          { text: '奇奇怪怪', link: '/frontend-basic/mix.html' },
        ]
      }],
      '/frontend-other/': [{
        text: '总结记录',
        children: [
          { text: '问题解决记录', link: '/frontend-other/problems.html' },
          { text: '客户端内嵌页面', link: '/frontend-other/native.html' },
        ]
      }],
      '/cpp/': [{
        text: 'C++',
        children: [
          { text: 'STL 容器', link: '/cpp/stl-container.html' },
          { text: '移动语义', link: '/cpp/move-semantic.html' },
          { text: '常见问题', link: '/cpp/problems.html' },
        ],
      }],
      '/linux/': [{
        text: 'Linux',
        children: [
          { text: '文件描述符 File Descriptor', link: '/linux/file-descriptor.html' },
          { text: '杂', link: '/linux/mixed.html' },
        ]
      }],
      '/mysql/': [{
        text: 'MySQL',
        children: [
          { text: '基本使用', link: '/mysql/usage.html' },
        ]
      }],
      '/backend-common-situation/': [{
        text: '后台常见场景',
        children: [
          { text: '并发中的锁机制', link: '/backend-common-situation/lock.html' },
          { text: '日志滚动切割', link: '/backend-common-situation/log-rotate.html' },
        ]
      }],
      '/leetcode/': [{
        text: 'LeetCode',
        children: [
          { text: '常用技巧', link: '/leetcode/skill.html' },
          { text: '好玩的题目', link: '/leetcode/interesting.html' },
        ]
      }],
      '/reading/': [{
        text: '阅读',
        children: [
          { text: '2024 阅读记录', link: '/reading/2024.html' },
          { text: '2023 阅读记录', link: '/reading/2023.html' },
          { text: '2022 阅读记录', link: '/reading/2022.html' },
          { text: '2021 阅读记录', link: '/reading/2021.html' },
          { text: '2020 阅读记录', link: '/reading/2020.html' },
        ]
      }],
      '/self-project/': [{
        text: '个人项目',
        children: [
          { text: 'memo', link: '/self-project/memo.html' },
          { text: 'Oauth 登录', link: '/self-project/oauth.html' },
        ]
      }],
    },
  },
  head: []
});
