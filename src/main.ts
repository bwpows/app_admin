import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/icon/iconfont.css'
import './style/common.scss'
import { store, key } from './store/index';



createApp(App).use(router).use(vuetify).use(store, key).mount('#app')
