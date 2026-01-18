---
layout: page
title: 友链
description: 与我互相链接的朋友们
---

<script setup>
const friends = [
  {
    name: '咕咚同学',
    intro: '一个独立开发者的日常',
    avatar: 'https://blog.gudong.site/assets/profile/gudong_2023.png',
    link: 'https://blog.gudong.site',
    linkText: 'blog.gudong.site',
  },
]
</script>

<div class="friends-container">
  <!-- Hero Section -->
  <header class="friends-header">
    <div class="header-content">
      <span class="badge">Connection</span>
      <h1 class="title">朋友们</h1>
      <p class="subtitle">
        志同道合，见字如面。这里是我关注的一些优质站点。
      </p>
    </div>
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">已收录</span>
        <span class="stat-value">{{ friends.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">更新日期</span>
        <span class="stat-value">2026-01</span>
      </div>
    </div>
  </header>

  <!-- Friends Grid -->
  <div class="friends-grid">
    <a 
      v-for="friend in friends" 
      :key="friend.link"
      :href="friend.link"
      target="_blank"
      class="friend-card"
    >
      <div class="card-avatar">
        <img :src="friend.avatar" :alt="friend.name" loading="lazy" />
      </div>
      <div class="card-info">
        <h3 class="name">{{ friend.name }}</h3>
        <p class="intro">{{ friend.intro }}</p>
        <div class="link-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="link-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          <span class="link-text">{{ friend.linkText }}</span>
        </div>
      </div>
      <div class="card-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
      </div>
    </a>
  </div>

  <!-- Guidelines -->
  <section class="friends-guidelines">
    <h2 class="section-title">申请说明</h2>
    <div class="guidelines-content">
      <p>欢迎互换友链。请在评论区留下您的信息，要求内容原创且持续更新。</p>
      <ul class="requirements">
        <li><span>名称：</span> 站点标题</li>
        <li><span>简介：</span> 一句话描述</li>
        <li><span>链接：</span> HTTPS 优先</li>
        <li><span>头像：</span> 正方形 URL</li>
      </ul>
    </div>
  </section>

  <!-- Comments -->
  <section class="friends-comments">
    <h2 class="section-title">留言板</h2>
    <Vssue title="友链" />
  </section>
</div>

<style scoped>
.friends-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* Header */
.friends-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 30px;
}

.header-content .badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
}

.header-content .title {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
}

.header-content .subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Grid */
.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.friend-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  background-color: var(--vp-c-bg-mute);
}

.card-avatar {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-avatar img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
  margin: 0 !important;
}

.card-info {
  flex-grow: 1;
  min-width: 0;
}

.card-info .name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info .intro {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 500;
}

.link-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--vp-c-brand);
  font-size: 12px;
}

.card-arrow {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: all 0.2s ease;
  color: var(--vp-c-brand);
}

.friend-card:hover .card-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

/* Guidelines */
.section-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.guidelines-content {
  background-color: var(--vp-c-bg-soft);
  padding: 24px;
  border-radius: 12px;
}

.guidelines-content p {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
}

.requirements {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.requirements li {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.requirements li span {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Responsive */
@media (max-width: 768px) {
  .friends-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .stats {
    width: 100%;
    justify-content: space-between;
  }
}
</style>