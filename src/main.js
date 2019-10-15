import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import axios from 'axios';
import store from './vuex/store'

Vue.use(VueMaterial)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store ,
  render: h => h(App)
}).$mount('#app')
