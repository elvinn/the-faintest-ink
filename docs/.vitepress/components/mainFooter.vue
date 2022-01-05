<template>
  <footer>
    <div class="copyright">
      Copyright © 2019-{{currentYear}} elvinn
    </div>
    <div class="seperator">|</div>
    <div class="tencent-cloud">
      Hosted By
      <a href="https://cloud.tencent.com/product/wh?from=12331">
        <img src="https://act.weixin.qq.com/static/images/202007/4984fa81348da1ec2e7bdbcdd1749d83_3769x968.png" alt="腾讯云-静态网站托管">
      </a>
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

  .seperator {
    padding: 0 0.6rem;
  }

  .copyright {
    text-align: center;
  }

  .tencent-cloud {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tencent-cloud img {
    height: 2rem;
  }

  @media (max-width: 520px) {
    footer {
      flex-direction: column;
    }

    .seperator {
      display: none;
    }
  }
</style>