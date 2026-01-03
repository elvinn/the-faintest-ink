<template>
  <div class="reading-card">
    <a :href="link" class="card-link">
      <div class="cover" v-if="cover">
        <img :src="cover" :alt="coverAlt || title + ' 封面'" />
      </div>
      <div class="card-content">
        <div class="card-header">
          <h3 class="title">{{ title }}</h3>
        </div>
        <Rating :rating="Number(rating)" />
        <p class="excerpt" v-if="excerpt">{{ excerpt }}</p>
        <div class="meta">
          <RightText>{{ date }}</RightText>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import Rating from './Rating.vue'
import RightText from './RightText.vue'

const props = defineProps({
  title: String,
  link: String,
  rating: [String, Number],
  date: String,
  excerpt: String,
  cover: String,
  coverAlt: String,
})
</script>

<style scoped>
.reading-card {
  border: 1px solid var(--vp-c-border, #e6e6e6);
  padding: 0;
  border-radius: 8px;
  width: 240px;
  background: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  overflow: hidden;
}
.reading-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.card-link { color: inherit; text-decoration: none; display:block; }
.cover { width: 100%; height: 150px; overflow: hidden; border-bottom: 1px solid var(--vp-c-divider, #999) }
.cover img { width: 100%; height: 100%; object-fit: contain; display:block; pointer-events: none; }
.card-content { padding: 12px }
.card-header { display:flex; justify-content: space-between; align-items: center; gap: 12px }
.title { margin:0; font-size: 1rem; font-weight: 600 }
.excerpt { color: var(--vp-c-muted, #666); margin:12px 0; font-size: .9rem }
.meta { text-align: right; font-size: .8rem; color: var(--vp-c-muted, #999) }
@media (max-width: 640px) {
  .reading-card { width: calc(50% - 8px) }
}
</style>