import { createApp } from 'vue'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' //导入FontAwesomeIcon组件并全局注册；
import router from '@/router'

import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons' //导入faUserSecret图标，并加入到library

import '@/styles/global.scss'

library.add(faUserSecret)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .mount('#app')
