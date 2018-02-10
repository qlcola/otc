<template>
  <div>
    <Navigator />
    <el-container class="content">
      <el-aside class="side-nav shadow" v-bind:style="{ height: contentHeight + 'px' }">
        <el-menu
          default-active="BTC_Buy"
          @select='handleSelect'
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>BTC交易</span>
            </template>
            <el-menu-item index="BTC_Buy">我要买入</el-menu-item>
            <el-menu-item index="BTC_Sale">我要卖出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="content-main shadow" v-bind:style="{ height: contentHeight + 'px' }">
        <keep-alive>
          <component v-bind:is="currentView" v-bind:buyData="buyData" v-bind:saleData="saleData"></component>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navigator from './Navigator'
import Buy from './trade/buy'
import Sale from './trade/sale'
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      currentView: 'Buy'
    };
  },
  components: {
      Navigator,
      Buy,
      Sale,
  },
  computed: {
    ...mapGetters([
        'buyData',
        'saleData',
        'contentHeight',
    ]),
  },
  methods: {
    ...mapActions([
        'getTradeData',
    ]),
    handleSelect: function(index) {
      const indexSplit = index.split('_');
      this.currentView = indexSplit[1];
      const tradType = indexSplit[1] === 'Buy' ? 1 : 2;
      this.getTradeData({
        adType: tradType,
        coinType: 1,
        currPage:1
      });
    }
  },
  created() {
    this.getTradeData({
      adType: 1,
      coinType: 1,
      currPage:1,
    });
  }
}
</script>
