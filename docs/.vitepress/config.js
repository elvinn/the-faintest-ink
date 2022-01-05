export default {
  title: '烂笔头',
  description: '好记性不如烂笔头',
  base: '/notes/',
  lang: 'zh-CN',
  dest: 'dist',
  lastUpdated: '上次更新时间',
  themeConfig: {
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
  }
};
