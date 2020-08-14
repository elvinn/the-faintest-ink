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
            text: 'Node.js',
            link: 'nodejs',
          },
          {
            text: '音视频',
            link: '/audio-video/file-format',
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
        'problems',
      ],
      '/audio-video/': [
        'file-format',
        'transform-protocol',
      ],
      '/frontend-util/': [
        'eslint',
        'mixed',
      ],
      '/cpp/': [
        'stl-container',
        'move-semantic'
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
      ],
      '/leetcode/': [
        '',
        'interesting',
      ],
      '/reading/': [
        '2020',
      ],
      '/nodejs/': [
        'memory',
      ],
    },
  },
  plugins: {
    'flowchart': true,
    '@vuepress/active-header-links': true,
    '@vuepress/medium-zoom': true,
    '@vuepress/back-to-top': true,
    '@vuepress/last-updated': {
      transformer: (timestamp) => {
        return new Date(timestamp)
          .toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            hour12: false,
          })
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
      hostname: 'https://elvinn.cn/notes/'
    },
    '@vuepress/google-analytics': {
      'ga': 'UA-99326171-2'
    }
  },
  head: [
    ['script', {}, `var isProd = location.hostname !== 'localhost'; if (isProd && location.protocol === 'http:') { location.protocol = "https:"; }`]
  ]
};
