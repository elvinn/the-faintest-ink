<template>
<span
  v-for="index in 5" :key="index"
  :class="{ fa: 1, 'fa-star':1, checked: index <= rating }"
/>
</template>
<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0
    },
  }
}
</script>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

.fa-star {
  padding-right: 0.2em;
}

.checked {
  color: orange;
}
</style>
