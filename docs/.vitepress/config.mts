import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
const hostname = "https://elvinn.wiki";
export default defineConfig({
  title: "Elvinn 的个人博客",
  description: "好记性不如烂笔头 ｜ Elvinn 的个人博客",
  markdown: {
    lineNumbers: true,
  },
  sitemap: {
    hostname: hostname,
  },
  themeConfig: {
    logo: { src: "/logo.webp", width: 24, height: 24 },
    editLink: {
      pattern:
        "https://github.com/elvinn/the-faintest-ink/edit/master/docs/:path",
      text: "编辑此页",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outline: {
      label: "页面导航",
      level: [2, 3],
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    footer: {
      message: `<a class="badge" href="https://visitorbadge.io/status?path=https%3A%2F%2Felvinn.wiki%2F"><img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Felvinn.wiki%2F&labelColor=%23d9e3f0&countColor=%23697689" /></a>保持独立思考`,
      copyright: `Copyright © 2019-${new Date().getFullYear()} Elvinn `,
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    search: {
      provider: "algolia",
      options: {
        appId: "MLPV9ICOY8",
        apiKey: "a3cb9357fd5c6f98c7c2c3624ebaad9d",
        indexName: "elvinn",
      },
    },
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "最近更新",
        link: "/recent",
      },
      {
        text: "大前端",
        items: [
          {
            text: "React",
            link: "/react/hooks",
          },
          {
            text: "Vue",
            link: "/vue/usage",
          },
          {
            text: "小程序",
            link: "/miniprogram/problems",
          },
          {
            text: "CSS",
            link: "/css/box-background",
          },
          {
            text: "TypeScript",
            link: "/typescript/situation",
          },
          {
            text: "Node.js",
            link: "/nodejs/memory",
          },
          {
            text: "音视频",
            link: "/audio-video/file-format",
          },
          {
            text: "网络",
            link: "/network/https",
          },
          {
            text: "工具",
            link: "/frontend-util/eslint",
          },
          {
            text: "前端基础",
            link: "/frontend-basic/trivial",
          },
          {
            text: "总结记录",
            link: "/frontend-other/problems",
          },
        ],
      },
      {
        text: "后台",
        items: [
          {
            text: "C++",
            link: "/cpp/stl-container",
          },
          {
            text: "Linux",
            link: "/linux/file-descriptor",
          },
          {
            text: "MySQL",
            link: "/mysql/usage",
          },
          {
            text: "常见场景",
            link: "/backend-common-situation/lock",
          },
        ],
      },
      {
        text: "杂",
        items: [
          {
            text: "加密货币",
            link: "/crypto-currency/beginner-guide",
          },
          {
            text: "LeetCode",
            link: "/leetcode/skill",
          },
        ],
      },
      {
        text: "阅读",
        items: [
          {
            text: "2026",
            link: "/reading/2026/index",
          },
          {
            text: "2025",
            link: "/reading/2025",
          },
          {
            text: "2024",
            link: "/reading/2024",
          },
          {
            text: "2023",
            link: "/reading/2023",
          },
          {
            text: "2022",
            link: "/reading/2022",
          },
          {
            text: "2021",
            link: "/reading/2021",
          },
          {
            text: "2020",
            link: "/reading/2020",
          },
        ],
      },
      {
        text: "个人项目",
        items: [
          {
            text: "个人简介生成器",
            link: "/self-project/bio",
          },
          {
            text: "date calculator",
            link: "/self-project/date-calculator",
          },
          {
            text: "memo",
            link: "/self-project/memo",
          },
        ],
      },
    ],
    sidebar: {
      "/react/": [
        {
          text: "React",
          items: [
            { text: "Hook", link: "/react/hooks" },
            { text: "通用场景", link: "/react/situations" },
            { text: "常见问题", link: "/react/problems" },
            { text: "升级变化", link: "/react/version-update" },
          ],
        },
      ],
      "/vue/": [
        {
          text: "Vue",
          items: [
            { text: "基本使用", link: "/vue/usage" },
            { text: "常见实践总结", link: "/vue/situation" },
            { text: "热更新", link: "/vue/hmr" },
          ],
        },
      ],
      "/miniprogram/": [
        {
          text: "小程序",
          items: [{ text: "基本使用", link: "/miniprogram/problems" }],
        },
      ],
      "/css/": [
        {
          text: 'CSS',
          items: [
            { text: '重复格子背景', link: "/css/box-background" },
            { text: '在 CSS 中使用 HSL', link: "/css/hsl" },
          ]
        }
      ],
      "/typescript/": [
        {
          text: "TypeScript",
          items: [
            { text: "常用场景", link: "/typescript/situation" },
            { text: "常见问题", link: "/typescript/problems" },
            { text: "基础使用", link: "/typescript/basic" },
            { text: "编译优化", link: "/typescript/compile-improve" },
            { text: "大挑战", link: "/typescript/big-challenge" },
          ],
        },
      ],
      "/nodejs/": [
        {
          text: "Node.js",
          items: [
            { text: "有意思的 Node.js 内存泄漏问题", link: "/nodejs/memory" },
            {
              text: "AsyncLocalStorage 的妙用",
              link: "/nodejs/async-local-storage",
            },
          ],
        },
      ],
      "/audio-video/": [
        {
          text: "音视频",
          items: [
            { text: "视频格式", link: "/audio-video/file-format" },
            { text: "传输协议", link: "/audio-video/transform-protocol" },
          ],
        },
      ],
      "/network/": [
        {
          text: "网络",
          items: [
            { text: "HTTPS", link: "/network/https" },
            { text: "TCP 协议", link: "/network/tcp" },
            { text: "CDN", link: "/network/cdn" },
            { text: "网络名词释义", link: "/network/glossary" },
          ],
        },
      ],
      "/frontend-util/": [
        {
          text: "工具",
          items: [
            { text: "ESLint", link: "/frontend-util/eslint" },
            { text: "npm", link: "/frontend-util/npm" },
            { text: "pnpm", link: "/frontend-util/pnpm" },
            { text: "Git", link: "/frontend-util/git" },
            { text: "GitHub", link: "/frontend-util/github" },
            { text: "常用库", link: "/frontend-util/common-packages" },
            { text: "杂", link: "/frontend-util/mixed" },
          ],
        },
      ],
      "/frontend-basic/": [
        {
          text: "前端基础",
          items: [
            { text: "前端基础知识", link: "/frontend-basic/trivial" },
            { text: "字符串", link: "/frontend-basic/string" },
            { text: "迭代器与生成器", link: "/frontend-basic/iterator" },
            { text: "奇奇怪怪", link: "/frontend-basic/mix" },
          ],
        },
      ],
      "/frontend-other/": [
        {
          text: "总结记录",
          items: [
            { text: "问题解决记录", link: "/frontend-other/problems" },
            { text: "客户端内嵌页面", link: "/frontend-other/native" },
            { text: "Tree Shaking", link: "/frontend-other/tree-shaking" },
          ],
        },
      ],
      "/cpp/": [
        {
          text: "C++",
          items: [
            { text: "STL 容器", link: "/cpp/stl-container" },
            { text: "移动语义", link: "/cpp/move-semantic" },
            { text: "常见问题", link: "/cpp/problems" },
          ],
        },
      ],
      "/linux/": [
        {
          text: "Linux",
          items: [
            {
              text: "文件描述符 File Descriptor",
              link: "/linux/file-descriptor",
            },
            { text: "杂", link: "/linux/mixed" },
          ],
        },
      ],
      "/mysql/": [
        {
          text: "MySQL",
          items: [
            { text: "基本使用", link: "/mysql/usage" },
            { text: "日志文件", link: "/mysql/log" },
          ],
        },
      ],
      "/backend-common-situation/": [
        {
          text: "后台常见场景",
          items: [
            { text: "并发中的锁机制", link: "/backend-common-situation/lock" },
            {
              text: "日志滚动切割",
              link: "/backend-common-situation/log-rotate",
            },
          ],
        },
      ],
      "/leetcode/": [
        {
          text: "LeetCode",
          items: [
            { text: "常用技巧", link: "/leetcode/skill" },
            { text: "好玩的题目", link: "/leetcode/interesting" },
          ],
        },
      ],
      "/reading/": [
        {
          text: "阅读",
          items: [
            { text: "2026 阅读记录", link: "/reading/2026/index" },
            { text: "2025 阅读记录", link: "/reading/2025" },
            { text: "2024 阅读记录", link: "/reading/2024" },
            { text: "2023 阅读记录", link: "/reading/2023" },
            { text: "2022 阅读记录", link: "/reading/2022" },
            { text: "2021 阅读记录", link: "/reading/2021" },
            { text: "2020 阅读记录", link: "/reading/2020" },
          ],
        },
      ],
      "/self-project/": [
        {
          text: "个人项目",
          items: [
            { text: "个人简介生成器", link: "/self-project/bio" },
            { text: "Date Calculator", link: "/self-project/date-calculator" },
            { text: "memo", link: "/self-project/memo" },
            { text: "Oauth 登录", link: "/self-project/oauth" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/elvinn" }],
  },
  head: [
    [
      "script",
      {},
      `if (!['localhost', 'www.elvinn.wiki', 'elvinn.wiki'].includes(location.hostname) && !/github.dev$/.test(location.hostname)) {
        location.href = '${hostname}';
      }
      `,
    ],
    // Google Analytics
    [
      'script',
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-N1LGFG6F48', //[!code focus]
        async: '',
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N1LGFG6F48');` //[!code focus]
    ],
    // Google AdSense
    [
      'script',
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8968402652686082", //[!code focus]
        crossorigin: 'anonymous',
        async: '',
      },
    ],
  ],
  transformHead: (params) => {
    const { pageData } = params
    const { frontmatter, relativePath } = pageData

    // 基础 JSON-LD 对象
    const schema = {
      "@context": "https://schema.org",
      "@type": 'BlogPosting',
      "headline": frontmatter.title || pageData.title,
      "url": `${hostname}/${relativePath.replace(/\.md$/, '.html')}`,
      "datePublished": frontmatter.date,
      "author": { "@type": "Person", "name": "Elvinn", "url": hostname },
      "description": frontmatter.description,
    }

    if (frontmatter.category === 'book') {
      // 书评特有字段
      Object.assign(schema, {
        "@type": "Review",
        "itemReviewed": {
          "@type": "Book",
          "name": frontmatter.book,
          "author": { "@type": "Person", "name": frontmatter.author }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": frontmatter.rating,
          "bestRating": 5
        },
      })
    }

    return [
      [
        'script',
        { type: 'application/ld+json' },
        // 使用 JSON.stringify 并在输出时不做二次转义的处理
        JSON.stringify(schema)
      ]
    ]
  }
});
