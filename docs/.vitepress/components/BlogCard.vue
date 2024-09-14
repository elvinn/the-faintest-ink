<template>
  <a :href="href" class="blog-card">
    <h3>{{ title }}</h3>
    <div class="tags">
      <span v-for="tag in tags" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>
    <p class="description">{{ description }}</p>
    <div class="link-text">Read More -></div>
  </a>
</template>
<script>

export default {
  props: {
    href: String,
    title: String,
    description: String,
    tags: Array,
  },
}
</script>
<style lang="less">
.blog-card {
  // 覆盖 vpdoc a 标签的样式
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  font-weight: normal !important;

  margin-top: 32px;
  padding: 24px;
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;

  &:hover {
    border-color: var(--vp-c-brand-1);
  }

  h3 {
    margin-top: 0;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3;
  }

  .tags {
    display: flex;
    margin-top: 4px;

    .tag {
      font-size: 12px;
      margin-right: 8px;
      padding: 0px 8px;
      border-radius: 8px;
      color: var(--vp-button-brand-text);;
      background: var(--vp-button-brand-bg);
    }
  }

  .description {
    color: var(--vp-c-text-2);
    margin-top: 18px;
    white-space: pre-line;
  }

  .link-text {
    color: var(--vp-c-brand-1);
    margin-top: 18px;
  }
}
</style>