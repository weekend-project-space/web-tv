import {
    createApp
} from 'vue'
import './style.css'
import App from './App.vue'
import VideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

createApp(App).use(VideoPlayer).mount('#app')