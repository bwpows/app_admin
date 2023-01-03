import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/icon/iconfont.css'
import './style/common.scss'
import { store, key } from './store/index'


// import echarts from './utils/echarts';


import DataTable from './components/common/DataTable.vue'

const Vue = createApp(App)

// Vue.config.globalProperties.$echarts = echarts

Vue.component('DataTable', DataTable)

Vue.use(router).use(vuetify).use(store, key).mount('#app')
