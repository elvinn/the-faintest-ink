import DefaultTheme from 'vitepress/theme'

import MyLayout from './MyLayout.vue'
import MainFooter from '../components/MainFooter.vue'
import RightText from '../components/RightText.vue'
import Vssue from '../components/Vssue.vue'
import Badge from '../components/Badge.vue'
import CodePen from '../components/CodePen.vue'

import './custom.css'

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('MainFooter', MainFooter)
    app.component('RightText', RightText)
    app.component('Vssue', Vssue)
    app.component('Badge', Badge)
    app.component('CodePen', CodePen)
  }
}