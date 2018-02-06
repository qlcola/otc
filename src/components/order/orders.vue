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
      <el-table-column
        prop="orderId"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      </el-table-column>
      <el-table-column
        prop="currencyType"
        label="币种">
      </el-table-column>
      <el-table-column
        prop="address"
        label="类型">
      </el-table-column>
      <el-table-column
        prop=""
        label="交易对象">
      </el-table-column>
      <el-table-column
        prop="currencyPrice"
        label="交易价格">
      </el-table-column>
      <el-table-column
        prop="coinAmount"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="address"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="address"
        label="手续费">
      </el-table-column>
      <el-table-column
        prop="referenceNumber"
        label="参考号">
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less">

</style>

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

