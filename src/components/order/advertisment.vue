<template>
  <el-table
    :data="adData"
    stripe
    style="width: 100%">
    <el-table-column prop="adId" label="订单号">
      <template slot-scope="scope">
        {{scope.row.adId}}
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
    <el-table-column prop="orderType" label="类型">
      <template slot-scope="scope">
        <span>{{ scope.row.orderType }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="交易对象">
    </el-table-column>
    <el-table-column prop="coinAmount" label="交易价格">
      <template slot-scope="scope">
        <span>{{scope.row.coinAmount}} {{ scope.row.coinType === 1 ? 'BTC' : 'CNY'}}</span>
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
</template>

<script>
export default {
  props: ['adData'],
  data() {
    return {

    }
  }
}
</script>

<style>
.order-link {
  text-decoration: none;
  color: #00aeef;
}
</style>

