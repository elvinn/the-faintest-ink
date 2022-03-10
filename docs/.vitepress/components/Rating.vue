<template>
<span
  v-for="index in 5" :key="index"
  :class="{ fa: 1, 'fa-star':1, checked: index <= rating }"
/>
</template>
<script>
import { importStyle } from './tools';

export default {
  props: {
    rating: {
      type: Number,
      default: 0
    },
  },
  beforeMount() {
    importStyle('https://elvinn.wiki/libs/font-awesome/4.7.0/css/font-awesome.min.css');
  },
}
</script>
<style>
.fa-star {
  padding-right: 0.2em;
}

.checked {
  color: orange;
}
</style>
