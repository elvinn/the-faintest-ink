<template>
  <footer>
    <div class="copyright">
      Copyright © 2019-{{currentYear}} elvinn
    </div>
  </footer>
</template>

<script>
export default {
  name: 'main-footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  }
}
</script>

<style scoped>
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    border-top: 1px solid #eaecef;
  }

  .separator {
    padding: 0 0.6rem;
  }

  .copyright {
    text-align: center;
  }
</style>