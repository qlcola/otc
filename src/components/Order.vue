<template>
  <div>
    <Navigator />
    <el-container class="content">
    <el-aside class="side-nav shadow" v-bind:style="{ height: contentHeight + 'px' }">
        <el-menu
        default-active="Order"
        @select='handleSelect'
        class="el-menu-vertical-demo">
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>订单中心</span>
            </template>
            <el-menu-item index="Order">我的订单</el-menu-item>
            <el-menu-item index="Advertisement">我的广告</el-menu-item>
        </el-submenu>
        </el-menu>
    </el-aside>
    <el-main class="content-main shadow" v-bind:style="{ height: contentHeight + 'px' }">
        <keep-alive>
        <component v-bind:is="currentView" v-bind:orderData="orderData" v-bind:adData="adData"></component>
        </keep-alive>
    </el-main>
    </el-container>
  </div>
</template>

<script>
import Navigator from './Navigator'
import Order from './order/orders'
import Advertisement from './order/advertisment'
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      currentView: 'Order'
    };
  },
  components: {
      Navigator,
      Order,
      Advertisement,
  },
  computed: {
    ...mapGetters([
        'orderData',
        'adData',
        'contentHeight',
    ]),
  },
  methods: {
    ...mapActions([
        'getOrderData',
        'getAdData',
    ]),
    handleSelect: function(index) {
      this.currentView = index;
      if (index === 'Order') {
         this.getOrderData({
           status: 0,
           currPage:1
         });
      } else {
        this.getAdData({
          currPage:1
        });
      }
    }
  },
  created() {
    this.getOrderData({
      status: 0,
      currPage:1
    });
  }
}
</script>
