import DefaultTheme from 'vitepress/theme'

import mainFooter from '../components/mainFooter.vue'
import rightText from '../components/rightText.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('mainFooter', mainFooter)
    app.component('rightText', rightText)
  }
}