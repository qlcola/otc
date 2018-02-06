<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未付款" name="0"></el-tab-pane>
        <el-tab-pane label="已付款" name="1"></el-tab-pane>
        <el-tab-pane label="已完成" name="2"></el-tab-pane>
        <el-tab-pane label="已取消" name="3"></el-tab-pane>
        <el-tab-pane label="申诉中" name="4"></el-tab-pane>
      </el-tabs>
      <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column prop="orderId" label="订单号">
        <template slot-scope="scope">
          <router-link :to="{ name: 'orderDetail', params: { id: scope.row.adId, }}" class="order-link">{{scope.row.adId}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.createTime).toLocaleString()}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="coinType" label="币种">
        <template slot-scope="scope">
          <span>{{ scope.row.coinType === 1 ? 'BTC' : 'CNY'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="类型">

      </el-table-column>
      <el-table-column
        prop=""
        label="交易对象">
      </el-table-column>
      <el-table-column prop="currencyPrice" label="交易价格">
      <template slot-scope="scope">
        <span>{{scope.row.currencyPrice}} {{ scope.row.coinType === 1 ? 'BTC' : 'CNY'}}</span>
      </template>  
      </el-table-column>
      <el-table-column
      prop="currencyAmount"
      label="数量">
      </el-table-column>
      <el-table-column
      prop="currencyPrice"
      label="金额">
      </el-table-column>
      <el-table-column
      prop="serviceCharge"
      label="手续费">
      </el-table-column>
      <el-table-column
      prop="referenceNumber"
      label="参考号">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['orderData'],
  data() {
      return {
          activeName: '0',
      }
  },
  methods: {
    ...mapActions([
        'getOrderData',
    ]),
      handleClick: function({ name }) {
        this.activeName = name;
        this.getOrderData({
          status: name
        }).then().catch(function() {
          console.log('catch');
        });
      }
  },
  computed: {
      tableData: function() {
          return this.orderData[`st-${this.activeName}`];
      }
  }
}
</script>

<style lang="less">
.order-link {
  text-decoration: none;
  color: #00aeef;
}
</style>

