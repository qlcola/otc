// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import { getCookie } from './util.js'
import './style/common.less'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  // components: { App }
  render: h => h(App),
   watch:{
    "$route" : function(newRoute, oldRoute) {
      this.checkNeedLogin(newRoute);
    }
  },
  created() {
    this.checkNeedLogin(this.$route);
  },
  methods:{
    checkNeedLogin(paramRoute) {
      const needLoginArray = ['userCenter', 'Order', 'Publish'];
      if (needLoginArray.indexOf(paramRoute.name) !== -1) {
        this.checkLogin();
      }
      if (paramRoute.name === 'Login' && getCookie('session')) {
        this.$router.push('/');
      }
    },
    checkLogin() {
      if(!getCookie('session')) {
        this.$router.push('/login');
      }
    }
  }
})
