<template>
  <footer>
    <div class="copyright">Copyright © 2019-{{ currentYear }} elvinn</div>
    <div class="beian">
      <a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备2022103865号-1</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "main-footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
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

.beian a {
  color: var(--c-text);
  text-decoration: underline;
}
</style>