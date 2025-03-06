---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 好记性不如烂笔头
  text: Elvinn 的个人博客
  tagline: 95 后，现居上海 🏙️ <br/>抖音电商研发工程师 🖥️
  image:
    src: /logo.webp
    alt: logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /recent.html
features:
  - icon: 🌐
    title: 大前端
    details: 由小及大，探索前端技术边界。
    link: /react/hooks.html
    linkText: 看一看
  - icon: 📚
    title: 读书笔记
    details: 记录心得体会，让阅读更有收获。
    link: /reading/2024.html
    linkText: 瞧一瞧
  - icon: ⚒️
    title: 个人项目
    details: 分享经验和技巧，期待更多交流。
    link: /self-project/date-calculator.html
    linkText: 试一试
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
