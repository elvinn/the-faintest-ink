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
  lastUpdated: "上次更新",
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
