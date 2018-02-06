<template>
  <div class='top-wrap'>
    <div class='user-info'>
      <div class="user-container">
        <div v-if="userId" class="user-tip">
          <span class="tip-name">hi,{{userName || userEmail || userMobile}}</span>
          <span class="exit" @click="handleLogout">[退出登录]</span>
        </div>
        <div v-else class="user-tip">
          <span class="to-login" @click="toLogin">[登录/注册]</span>
        </div>
      </div>
    </div>
    <div class='navwrap'>
      <div class="container">
        <span class="nav-logo">LOGO HERE</span>
        <div class="link-wrap">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/trade" class="nav-item">交易中心</router-link>
          <router-link to="/order" class="nav-item">订单管理</router-link>
          <router-link to="/userCenter" class="nav-item">用户中心</router-link>
          <router-link to="/financial" class="nav-item">资产管理</router-link>
        </div>
        <div class="publish-wrap">
          <el-button
          size="medium"
          type="primary"
          class="btn-publish"
          @click="publishAd"
          >发布广告</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { delCookie } from '../util';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters([
        'userName',
        'userMobile',
        'userEmail',
        'userId',
    ]),
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout: function() {
      delCookie('session');
      this.logout();
      this.$router.push('/login');
    },
    toLogin: function() {
      this.$router.push('/login');
    },
    publishAd: function() {
      this.$router.push('/publish');
    }
  }
}
</script>


<style  scoped>
  .top-wrap {
    min-width: 1200px;
  }
  .nav-item {
    color: #333;
    font-size: 16px;
    text-decoration: none;
    line-height: 80px;
    border-right: 1px solid #ddd;
    padding: 0 20px;
  }
  .nav-item:last-child {
    border-right: none;
  }
  .router-link-exact-active { 
    color: #00aeef;
  }
  .navwrap { 
    background: white;
    border-bottom: 1px solid #ccc;
  }
  .container { 
    width: 1200px;
    margin: 0 auto;
    height: 80px;
    display: flex;
  }
  .nav-logo { 
    width: 140px;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
  }
  .link-wrap {
    flex: 1;
   }
  .user-info {
    height: 36px;
    background: #444f71;
  }
  .user-tip {
      position: absolute;
      color: white;
      font-size: 14px;
      right: 0px;
  }
  .user-container {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .tip-name {
    line-height: 36px;
    cursor: pointer;
  }
  .exit { 
    line-height:  36px;
    margin-left: 10px;
    cursor: pointer;
  }
  .exit:hover, .to-login:hover  { 
    color: #00aeef;
  }
  .to-login {
    line-height: 36px;
    cursor: pointer;
  }
  .publish-wrap {
    align-items: center;
    justify-content: center;
    display: flex;
  }
</style>


