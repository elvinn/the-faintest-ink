<template>
<div class="recent-blogs">
  <h1>最近更新</h1>
  <div class="blog-list">
    <BlogCard
      v-for="blog in blogs"
      :key="blog.title"
      :href="blog.href"
      :title="blog.title"
      :description="blog.description"
      :tags="blog.tags"
    />
  </div>
</div>
</template>
<script>
export default {
  data: () => ({
    blogs: [
      {
        title: 'Date Calculator',
        description: 'Date Calculator 是一个简单的日期计算器，能计算过去或者将来的日期距离当前时间的年、月、日，支持电脑端和移动端。',
        href: '/self-project/date-calculator.html',
        tags: ['个人项目'],
      },
      {
        title: '有意思的 Node.js 内存泄漏问题',
        description: 'Node.js 使用的是 V8 引擎，会自动进行垃圾回收（Garbage Collection，GC），因而写代码的时候不需要像 C/C++ 一样手动分配、释放内存空间，方便不少，不过仍然需要注意内存的使用，避免造成内存泄漏（Memory Leak）。',
        href: '/nodejs/memory.html',
        tags: ['Node.js'],
      },
    ]
  }),
}
</script>
<style scoped lang="less">
.recent-blogs {
  margin: 0 auto;
  max-width: 1080px;
  box-sizing: border-box;
  padding: 48px;
}

h1 {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
}

.blog-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .blog-card {
    width: 100%;
  }
}


@media (max-width: 768px) {
  .recent-blogs {
    padding: 24px;
  }
}
</style>