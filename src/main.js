import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueHtml2pdf from 'vue-html2pdf'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use('vue-moment')
Vue.use(VueHtml2pdf)

Vue.component('navbar-component', require('./components/Template/Navbar.vue').default);
Vue.component('sidebar-component',require('./components/Template/Sidebar.vue').default);
Vue.component('footer-component', require('./components/Template/Footer.vue').default);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')