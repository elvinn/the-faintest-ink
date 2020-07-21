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
            text: 'Vue',
            link: '/vue/usage',
          },
          {
            text: 'TypeScript',
            link: '/typescript/',
          },
          {
            text: '工具',
            link: '/frontend-util/eslint',
          }
        ],
      },
      {
        text: '后台',
        items: [
          {
            text: 'C++',
            link: '/cpp/',
          },
          {
            text: 'Linux',
            link: '/linux/file-descriptor',
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
        link: '/reading/2020'
      }
    ],
    sidebar: {
      '/vue/': [
        'usage',
        'situation',
      ],
      '/typescript/': [
        '',
      ],
      '/frontend-util/': [
        'eslint',
        'mixed',
      ],
      '/cpp/': [
        '',
      ],
      '/linux/': [
        'file-descriptor',
        'mixed',
      ],
      '/backend-common-situation/': [
        'lock',
      ],
      '/leetcode/': [
        '',
        'interesting',
      ],
      '/reading/': [
        '2020',
      ],
    },
  },
  plugins: {
    'flowchart': true,
    '@vuepress/active-header-links': true,
    '@vuepress/medium-zoom': true,
    '@vuepress/last-updated': {
      transformer: (timestamp) => {
        return new Date(timestamp)
          .toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            hour12: false,
          })
      }
    },
  },
  head: [
    ['script', {}, `var isProd = location.hostname !== 'localhost'; if (isProd && location.protocol === 'http:') { location.protocol = "https:"; }`]
  ]
};
