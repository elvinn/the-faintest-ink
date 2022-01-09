<template>
  <span :class="['badge', type]" :style="{ verticalAlign }">
    {{text}}
    <slot></slot>
  </span>
</template>
<script>
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'tip'
    },
    text: String,
    vertical: {
      type: String,
      default: 'top'
    }
  }
}
</script>

<style scoped>
.badge {
  vertical-align: top;
  display: inline-block;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: white;
  background-color: #42b983;
}

.tip, .green {
  background-color: #42b983;
}

.warning, .warn, .yellow {
  background-color: #e7c000;
}

.error {
  background-color: #da5961;
}

.tip + .tip {
  margin-left: 5px;
}
</style>
