import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Trade from '@/components/Trade'
import Login from '@/components/Login'
import Order from '@/components/Order'
import PublishAd from '@/components/PublishAd'
import OrderDetail from '@/components/OrderDetail'
import UserCenter from '@/components/UserCenter'
import Financial from '@/components/Financial'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/trade',
      name: 'Trade',
      component: Trade,
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/order',
      name: 'Order',
      component: Order,
    }, {
      path: '/publish',
      name: 'Publish',
      component: PublishAd,
    }, {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: OrderDetail,
    }, {
      path: '/userCenter',
      name: 'userCenter',
      component: UserCenter,
    }, {
      path: '/financial',
      name: 'Financial',
      component: Financial,
    }
  ]
})
