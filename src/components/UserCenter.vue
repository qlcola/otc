<template>
  <div>
      <Navigator />
      <el-container class="content">
        <el-aside class="side-nav shadow" v-bind:style="{ height: contentHeight + 'px' }">
            <el-menu
            default-active="SecuritySetting"
            @select='handleSelect'
            class="el-menu-vertical-demo">
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>用户中心</span>
                </template>
                <el-menu-item index="SecuritySetting">安全设置</el-menu-item>
                <el-menu-item index="UserSetting">账户设置</el-menu-item>
            </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="content-main shadow" v-bind:style="{ height: contentHeight + 'px' }">
            <keep-alive>
            <component
              v-bind:is="currentView"
              :user="userForm"
              :bank="bankForm"
              :alipay="alipayForm"
              :wechat="wechatForm"
            ></component> 
            </keep-alive>
        </el-main>
      </el-container>
  </div>
</template>

<script>
import Navigator from './Navigator'
import UserSetting from './user/user-setting'
import SecuritySetting from './user/security-setting'
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';

export default {
  data: function() {
    return {
      currentView: 'SecuritySetting',
    };
  },
  components: {
      Navigator,
      UserSetting,
      SecuritySetting,
  },
  computed: {
    ...mapGetters([
        'contentHeight',
        'userInfo',
    ]),
    userForm: function() {
      return _.pick(this.userInfo, 'userId', 'nickName', 'mobile', 'email');
    },
    bankForm: function() {
      return _.pick(this.userInfo, 'userId', 'surname', 'bankBranch', 'bankCardId', 'bankOpen');
    },
    alipayForm: function() {
      return _.pick(this.userInfo, 'userId', 'surname', 'aliAccount');
    },
    wechatForm: function() {
      return _.pick(this.userInfo, 'userId', 'surname', 'weixinAccount');
    },
  },
  methods: {
    handleSelect: function(index) {
      this.currentView = index;
    }
  }

}
</script>

<style>

</style>

