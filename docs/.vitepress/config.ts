import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '烂笔头',
  description: '好记性不如烂笔头 ｜ elvinn 的个人博客',
  lang: 'zh-CN',
  themeConfig: {
    lastUpdated: '上次更新时间',
    editLinks: true,
    editLinkText: '编辑此页',
    repo: 'elvinn/the-faintest-ink',
    docsDir: 'docs',
    docsBranch: 'master',
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
            link: '/react/problems',
            activeMatch: '^/$|^/react/'
          },
          {
            text: 'Vue',
            link: '/vue/usage',
          },
          {
            text: '小程序',
            link: '/miniprogram/problems',
          },
          {
            text: 'TypeScript',
            link: '/typescript/situation',
          },
          {
            text: 'Node.js',
            link: '/nodejs/memory',
          },
          {
            text: '音视频',
            link: '/audio-video/file-format',
          },
          {
            text: '网络',
            link: '/network/https',
          },
          {
            text: '工具',
            link: '/frontend-util/eslint',
          },
          {
            text: '前端基础',
            link: '/frontend-basic/trivial'
          },
          {
            text: '总结记录',
            link: '/frontend-other/problems'
          }
        ],
      },
      {
        text: '后台',
        items: [
          {
            text: 'C++',
            link: '/cpp/stl-container',
          },
          {
            text: 'Linux',
            link: '/linux/file-descriptor',
          },
          {
            text: 'MySQL',
            link: '/mysql/usage',
          },
          {
            text: '常见场景',
            link: '/backend-common-situation/lock'
          }
        ]
      },
      {
        text: 'LeetCode',
        link: '/leetcode/skill',
      },
      {
        text: '阅读',
        items: [
          {
            text: '2021',
            link: '/reading/2021',
          },
          {
            text: '2020',
            link: '/reading/2020',
          }
        ],
      },
      {
        text: '个人项目',
        items: [
          {
            text: 'memo',
            link: '/self-project/memo'
          }
        ]
      }
    ],
    sidebar: {
      '/react/': [{
        text: 'React',
        children: [
          { text: '常见问题', link: '/react/problems' },
          { text: 'Hook', link: '/react/hooks' },
          { text: '升级变化', link: '/react/version-update' },
        ]
      }],
      '/vue/': [{
        text: 'Vue',
        children: [
          { text: '基本使用', link: '/vue/usage' },
          { text: '常见实践总结', link: '/vue/situation' },
        ]
      }],
      '/miniprogram/': [{
        text: '小程序',
        children: [
          { text: '基本使用', link: '/miniprogram/problems' },
        ]
      }],
      '/typescript/': [{
        text: 'TypeScript',
        children: [
          { text: '常用场景', link: '/typescript/situation' },
          { text: '常见问题', link: '/typescript/problems' },
          { text: '基础使用', link: '/typescript/basic' },
        ]
      }],
      '/nodejs/': [{
        text: 'Node.js',
        children: [
          { text: '有意思的 Node.js 内存泄漏问题', link: '/nodejs/memory' },
        ]
      }],
      '/audio-video/': [{
        text: '音视频',
        children: [
          { text: '视频格式', link: '/audio-video/file-format' },
          { text: '传输协议', link: '/audio-video/transform-protocol' },
        ]
      }],
      '/network/': [{
        text: '网络',
        children: [
          { text: 'HTTPS', link: '/network/https' },
          { text: 'TCP 协议', link: '/network/tcp' },
          { text: 'CDN', link: '/network/cdn' },
          { text: '网络名词释义', link: '/network/glossary' },
        ]
      }],
      '/frontend-util/': [{
        text: '工具',
        children: [
          { text: 'ESLint', link: '/frontend-util/eslint' },
          { text: 'npm', link: '/frontend-util/npm' },
          { text: 'Git', link: '/frontend-util/git' },
          { text: '杂', link: '/frontend-util/mixed' },
        ]
      }],
      '/frontend-basic/': [{
        text: '前端基础',
        children: [
          { text: '前端基础知识', link: '/frontend-basic/trivial' },
          { text: '迭代器与生成器', link: '/frontend-basic/iterator' },
        ]
      }],
      '/frontend-other/': [{
        text: '总结记录',
        children: [
          { text: '问题解决记录', link: '/frontend-other/problems' },
          { text: '客户端内嵌页面', link: '/frontend-other/native' },
        ]
      }],
      '/cpp/': [{
        text: 'C++',
        children: [
          { text: 'STL 容器', link: '/cpp/stl-container' },
          { text: '移动语义', link: '/cpp/move-semantic' },
          { text: '常见问题', link: '/cpp/problems' },
        ],
      }],
      '/linux/': [{
        text: 'Linux',
        children: [
          { text: '文件描述符 File Descriptor', link: '/linux/file-descriptor' },
          { text: '杂', link: '/linux/mixed' },
        ]
      }],
      '/mysql/': [{
        text: 'MySQL',
        children: [
          { text: '基本使用', link: '/mysql/usage' },
        ]
      }],
      '/backend-common-situation/': [{
        text: '后台常见场景',
        children: [
          { text: '并发中的锁机制', link: '/backend-common-situation/lock' },
          { text: '日志滚动切割', link: '/backend-common-situation/log-rotate' },
        ]
      }],
      '/leetcode/': [{
        text: 'LeetCode',
        children: [
          { text: '常用技巧', link: '/leetcode/skill' },
          { text: '好玩的题目', link: '/leetcode/interesting' },
        ]
      }],
      '/reading/': [{
        text: '阅读',
        children: [
          { text: '2021 阅读记录', link: '/reading/2021' },
          { text: '2020 阅读记录', link: '/reading/2020' },
        ]
      }],
      '/self-project/': [{
        text: '个人项目',
        children: [
          { text: 'memo', link: '/self-project/memo' },
          { text: 'Oauth 登录', link: '/self-project/oauth' },
        ]
      }],
    },
  },
  head: [
    // 百度统计脚本，https://tongji.baidu.com/
    ['script', {}, `var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.defer = true; hm.src = "https://hm.baidu.com/hm.js?52f7e9c204c79cd3e7f026f6159474b6"; document.body.appendChild(hm); })();`]
  ]
});
