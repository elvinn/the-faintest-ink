<script>
// 异步引入 CodePen 需要的 js
export default {
  name: 'code-pen',
  created() {
    if (document.body.querySelector('script[src="https://cpwebassets.codepen.io/assets/embed/ei.js"]')) {
      return;
    }

    const script = document.createElement('script')
    script.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js'
    script.async = true
    document.body.appendChild(script)
  }
}
</script>
