<template>
</template>
<script>
import { importScript } from './tools';
// 异步引入 CodePen 需要的 js
export default {
  name: 'code-pen',
  beforeMount() {
    importScript('https://cpwebassets.codepen.io/assets/embed/ei.js', { isAsync: true });
  }
}
</script>
