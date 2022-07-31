import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
