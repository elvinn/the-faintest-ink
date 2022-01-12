<template>
  <div id="vssue-root" />
</template>

<script>
/**
 * 目前 Vssue 不支持 Vue 3.0，
 * 所以这里采用比较挫的方式异步加载了一个 Vue 2 来进行评论组件的初始化和样式主题色的强制覆盖。
 * 后续 Vssue 支持 Vue 3.0 后，可以优化这里的实现，直接编译时引入即可。
 */
import { importScript, importStyle } from './tools';
export default {
  name: "Vssue",

  props: {
    title: String,
  },

  async mounted() {
    await importStyle('https://cdn.jsdelivr.net/npm/vssue@1.4.8/dist/vssue.min.css')
    await importScript('https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.runtime.min.js')
    await importScript('https://cdn.jsdelivr.net/npm/vssue@1.4.8/dist/vssue.github.min.js')

    new Vue({
      el: "#vssue-root",
      render: (h) =>
        h("Vssue", {
          props: {
            title: this.title,
            // 对应配置链接 https://github.com/settings/applications/1806151
            options: {
              owner: "elvinn",
              repo: "the-faintest-ink",
              clientId: "e3f0a6e07a5fe76f2468",
              clientSecret: "8535f023b51c45195b57067b2fa22b77480cf6d7", // 这个影响范围还好
            },
          },
        }),
    });
  },
};
</script>
<style>
.vssue .vssue-status {
  color: #3780f7 !important;
}

.vssue .vssue-icon {
  fill: #3780f7 !important;
}

.vssue :not(.vssue-comment-content) a {
  color: #3780f7 !important;
}

.vssue .vssue-button:not(:disabled).vssue-button-primary {
  color: #3780f7 !important;
  border-color: #3780f7 !important;
}

.vssue .vssue-button {
  color: #3780f7 !important;
  border-color: #3780f7 !important;
}

.vssue .vssue-new-comment .vssue-new-comment-input {
  background-color: transparent !important;
}

.vssue .vssue-new-comment .vssue-new-comment-input:focus {
  border-color: #7eadf8 !important;
  -webkit-box-shadow: 0 0 1px 1px #7eadf8 !important;
  box-shadow: 0 0 1px 1px #7eadf8 !important;
}
</style>