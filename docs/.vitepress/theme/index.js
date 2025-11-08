import DefaultTheme from 'vitepress/theme'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'

import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';

import MyLayout from './MyLayout.vue'
import RightText from '../components/RightText.vue'
import Vssue from '../components/Vssue.vue'
import Badge from '../components/Badge.vue'
import CodePen from '../components/CodePen.vue'
import Rating from '../components/Rating.vue'
import BlogCard from '../components/BlogCard.vue'
import RecentBlogs from '../components/RecentBlogs.vue'
import BoxBackgroundDemo from '../components/demos/BoxBackgroundDemo.vue'

import './custom.css'

inject();
injectSpeedInsights({});

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('RightText', RightText)
    app.component('Vssue', Vssue)
    app.component('Badge', Badge)
    app.component('CodePen', CodePen)
    app.component('Rating', Rating)
    app.component('BlogCard', BlogCard)
    app.component('RecentBlogs', RecentBlogs)
    app.component('vImageViewer', vImageViewer);

    // demos
    app.component('BoxBackgroundDemo', BoxBackgroundDemo);
  },

  setup() {
    // Get route
    const route = useRoute();
    // Using
    imageViewer(route);
  }
}