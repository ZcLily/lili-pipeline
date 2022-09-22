import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale, size: 'medium' })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
