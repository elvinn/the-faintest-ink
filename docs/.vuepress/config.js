const moment = require('moment')

module.exports = {
  title: '烂笔头',
  description: '好记性不如烂笔头',
  base: '/notes/',
  dest: 'dist',
  theme: '@vuepress/default',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: '上次更新',
    repo: 'https://github.com/elvinn/the-faintest-ink',
    repoLabel: 'Github',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此页',
    sidebarDepth: 2,
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
            link: '/typescript/',
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
            text: '基础知识',
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
            link: '/mysql/',
          },
          {
            text: '常见场景',
            link: '/backend-common-situation/lock'
          }
        ]
      },
      {
        text: 'LeetCode',
        link: '/leetcode/',
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
            link: '/self-project/memo/'
          }
        ]
      }
    ],
    sidebar: {
      '/react/': [
        'problems',
        'hooks',
        'version-update',
      ],
      '/vue/': [
        'usage',
        'situation',
      ],
      '/miniprogram/': [
        'problems',
      ],
      '/typescript/': [
        '',
        'problems',
        'basic',
      ],
      '/audio-video/': [
        'file-format',
        'transform-protocol',
      ],
      '/network/':[
        'https',
        'tcp',
        'cdn',
        'glossary',
      ],
      '/frontend-util/': [
        'eslint',
        'npm',
        'git',
        'mixed',
      ],
      '/frontend-basic/': [
        'trivial',
        'iterator',
      ],
      '/frontend-other/': [
        'problems',
        'native',
      ],
      '/cpp/': [
        'stl-container',
        'move-semantic',
        "problems",
      ],
      '/linux/': [
        'file-descriptor',
        'mixed',
      ],
      '/mysql/': [
        '',
      ],
      '/backend-common-situation/': [
        'lock',
        'log-rotate',
      ],
      '/leetcode/': [
        '',
        'interesting',
      ],
      '/reading/': [
        '2021',
        '2020',
      ],
      '/nodejs/': [
        'memory',
      ],
      '/self-project/memo/': [
        '',
        'oauth',
      ]
    },
  },
  plugins: {
    'flowchart': true,
    '@vuepress/active-header-links': true,
    '@vuepress/medium-zoom': true,
    '@vuepress/back-to-top': true,
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        moment.locale(lang)
        return moment(timestamp).toString()
      }
    },
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github',
      owner: 'elvinn',
      repo: 'the-faintest-ink',
      clientId: '45ae60f2ab9ac2eff0cd',
      clientSecret: '241dee426e4831c9fa2491f32dc1b8359e82fabd', // 这个影响范围还好
    },
    'sitemap': {
      hostname: 'https://elvinn.cn/notes/',
    },
    '@vuepress/google-analytics': {
      'ga': 'UA-99326171-2'
    }
  },
  head: [
    // 百度统计脚本，https://tongji.baidu.com/
    ['script', {}, `var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?63da3d24170446816a74ced73eaa7b34"; var s = document.getElementsByTagName("script")[0];  s.parentNode.insertBefore(hm, s); })();`]
  ]
};
