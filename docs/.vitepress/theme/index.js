import DefaultTheme from 'vitepress/theme'
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import MyLayout from './MyLayout.vue'
import MainFooter from '../components/MainFooter.vue'
import RightText from '../components/RightText.vue'
import Vssue from '../components/Vssue.vue'
import Badge from '../components/Badge.vue'
import CodePen from '../components/CodePen.vue'
import Rating from '../components/Rating.vue'

import './custom.css'

inject();
injectSpeedInsights();

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('MainFooter', MainFooter)
    app.component('RightText', RightText)
    app.component('Vssue', Vssue)
    app.component('Badge', Badge)
    app.component('CodePen', CodePen)
    app.component('Rating', Rating)
  }
}