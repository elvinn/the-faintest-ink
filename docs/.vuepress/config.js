const dayjs = require("dayjs");

dayjs.locale("zh-cn");

module.exports = {
  title: "烂笔头",
  description: "好记性不如烂笔头",
  base: "/the-faintest-ink/",
  theme: "@vuepress/default",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: "上次更新",
    repo: 'https://github.com/elvinn/the-faintest-ink',
    repoLabel: 'Github',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此页',
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
            link: '/vue/',
          },
          {
            text: 'TypeScript',
            link: '/typescript/',
          },
        ],
      },
      {
        text: 'C++',
        link: '/cpp',
      },
    ],
    sidebar: 'auto',
  },
  plugins: {
    "@vuepress/active-header-links": true,
    "@vuepress/medium-zoom": true,
    "@vuepress/last-updated": {
      transformer: (timestamp) => {
        return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  },
};
