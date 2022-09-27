import { createApp } from 'vue'
import $cookies from 'vue-cookies'
import App from './App.vue'

createApp(App).use($cookies).mount('#app')
