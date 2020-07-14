<template>
  <div class="right-text"><slot></slot></div>
</template>

<script>
export default {
  name: 'right-text',
}
</script>

<style scoped>
  .right-text {
    text-align: right;
  }
</style>