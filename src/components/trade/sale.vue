<template>
  <div>
      <el-table
        :data="saleData"
        style="width: 100%">
        <el-table-column
        label="商家"
        width="180">
          <template slot-scope="scope">
              <div class="merchant-block">
                <div class="avatar-wrap">
                  <div class="avatar">
                    <span>{{ scope.row.creatorNickName.substring(0, 1) }}</span>
                  </div>
                </div>
                <div class="merchant-name">{{ scope.row.creatorNickName }}</div>
              </div>
          </template>
        </el-table-column>
        <el-table-column
        label="近30日成交"
        width="100">
          <template slot-scope="scope">
            <!--<span>{{ scope.row.deal }}</span>-->
          </template>
        </el-table-column>
        <el-table-column
        label="支付方式"
        width="180">
          <template slot-scope="scope">
              <i v-if="scope.row.payType.indexOf('1') !== -1" class="payicon icon-bankCard"></i>
              <i v-if="scope.row.payType.indexOf('2') !== -1" class="payicon icon-alipay"></i>
              <i v-if="scope.row.payType.indexOf('3') !== -1" class="payicon icon-wechat"></i>
          </template>
        </el-table-column>
        <el-table-column
        label="数量"
        width="120">
          <template slot-scope="scope">
              <span>{{ scope.row.currencyPrice }} {{ scope.row.currencyType===1? 'BTC':'CNY'}}</span>
          </template>
        </el-table-column>
        <el-table-column
        label="价格"
        width="180">
          <template slot-scope="scope">
              <div class="main-price">{{ formatPrice(scope.row.coinAmount) }} {{ scope.row.coinType }}</div>
              <div class="sub-price">{{ formatPrice(scope.row.minTradeAmount) }}-{{  formatPrice(scope.row.maxTradeAmount) }} CNY</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <ButtonSale
                :price="scope.row.coinAmount"
                :id="scope.row.orderId"
                :currencyType="scope.row.currencyType"
                :coinType="scope.row.coinType"
                :minTradeAmount="scope.row.minTradeAmount"
                :maxTradeAmount="scope.row.maxTradeAmount"
              />
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ButtonSale from './button-sale'
import { formatPrice } from '@/util.js'

export default {
    props: ['saleData'],
    components: {
        ButtonSale,
    },
    data() {
      return {
        tableData: this.buyData,
      };
    },
    methods: {

      formatPrice: (str) => formatPrice(str),
    }
}
</script>
