<template>
  <div>
      <Navigator />
      <div class="container">
        <div class="breadwrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/order' }">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="order-title">
            <span class="order-title-type" v-if="detailData.orderType===11">买入 BTC</span>
            <span class="order-title-type" v-if="detailData.orderType===22">卖出 BTC</span>
            <span class="order-title-id">订单号: {{ $route.params.id }}</span>
            <span class="order-title-status" v-if="detailData.status===0">等待支付</span>
            <span class="order-title-status" v-if="detailData.status===1">已付款</span>
            <span class="order-title-status" v-if="detailData.status===2">已完成</span>
            <span class="order-title-status" v-if="detailData.status===3">已取消</span>
            <span class="order-title-status" v-if="detailData.status===4">申诉中</span>
        </div>
        <div class="pay-detail">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content">
                        <div class="content-block">
                            <div class="pay-title">交易金额</div>
                            <div class="pay-price price-bold">{{detailData.currencyPrice}} CNY</div>
                        </div>
                        <div class="content-block">
                            <div class="pay-title">数量</div>
                            <div class="pay-price">{{detailData.coinAmount}} BTC</div>
                        </div>
                        <div class="content-block">
                            <div class="pay-title">价格</div>
                            <div class="pay-price">{{detailData.currencyPrice}} CNY／BTC</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <div class="content-block">
                            <div class="payment-icon">
                                <div class="payicon-big big-bankCard"></div>
                            </div>
                            <div class="paymethod-txt">
                                <div class="pay-title">账户名  招商银行 xx分行</div>
                                <div class="pay-price">6222 0000 9999 332</div>
                            </div>
                        </div>
                        <div class="content-block">
                            <div class="payment-icon">
                                <div class="payicon-big big-alipay"></div>
                            </div>
                            <div class="paymethod-txt">
                                <div class="pay-title">用户名</div>
                                <div class="pay-price">123456@abc.com</div>
                            </div>
                        </div>
                        <div class="content-block">
                            <div class="payment-icon">
                                <div class="payicon-big big-wechat"></div>
                            </div>
                            <div class="paymethod-txt">
                                <div class="pay-title">用户名</div>
                                <div class="pay-price">123456@abc.com</div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <div class="content-block">
                            <div class="pay-title">付款参考号</div>
                            <div class="pay-price">{{detailData.referenceNumber}}</div>
                        </div>
                        <div class="confirm-block" v-if="detailData.orderType===11">
                            <div class="confirm-tip">
                                <span class="txt-blue">付款参考号：</span>请务必备注在付款信息中，便于收款方确认款项
                            </div>
                            <div>
                                <el-button class="publish-btn" type="primary" @click="confirmPay()" :disabled="detailData.status!==0">我已付款</el-button>
                                <el-button class="publish-btn" @click="cancelTrad()" :disabled="detailData.status!==0">取消交易</el-button>
                            </div>
                        </div>
                        <div class="confirm-block" v-if="detailData.orderType===22">
                            <div class="confirm-tip">
                                <span class="txt-blue">付款参考号：</span>请务必备注在付款信息中，便于收款方确认款项
                            </div>
                            <div>
                                <el-button class="publish-btn" @click="confirmFinish()" :disabled="detailData.status!==0">确认放行</el-button>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="trade-message">
            <ul v-if="detailData.orderType===11">
                <li>交易提示</li>
                <li>1、您的汇款将直接进入卖方账户，交易过程中卖方出售到数字资产由平台托管保护。</li>
                <li>2、请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字资产划转到您的账户。</li>
                <li>3、买卖当日连续3笔或累计6笔取消，广告方当日取消率超过30%，会限制当天到买入功能。</li>
            </ul>
            <ul v-if="detailData.orderType===22">
                <li>交易提示</li>
                <li>1、您所出售的数字资产，已交由平台托管冻结。请在确认收到对方付款后，点击 “确认放行” 支付数字资产！</li>
                <li>2、请不要相信任何催促放币的理由，确认收到款项后再释放数字资产，避免造成损失！</li>
                <li>3、在收到账短信后，请务必登录网上银行或手机银行确认款项是否入账，避免因收到诈骗短信错误释放数字资产！</li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>
import Navigator from './Navigator'
import axios from '@/axios';

export default {
  components: {
      Navigator
  },
  data() {
      return {
          detailData: {
              status: undefined,
              orderType: undefined,
          },
      }
  },
  created() {
    axios({
            url: 'otc/otcorder/orderDetail',
            method: 'post',
            data: {"orderId":this.$route.params.id},
        }).then((response) => {
            if(response.data.status == 1){
                this.detailData = response.data.data;
            }
        });
  },
  methods: {
      confirmPay: function() {
        axios({
            url: 'otc/otcorder/setOrderPayed',
            method: 'post',
            data: {"orderId":this.$route.params.id},
        }).then((response) => {
            if(response.data.status == 1){
                this.$message({
                    message: '标记成功',
                    type: 'success'
                });
            }
        });
      },
      confirmFinish: function() {
        axios({
            url: 'otc/otcorder/setOrderFinish',
            method: 'post',
            data: {"orderId":this.$route.params.id},
        }).then((response) => {
            if(response.data.status == 1){
                this.$message({
                    message: '订单已完成',
                    type: 'success'
                });
            }
        });
      },
      cancelTrad: function() {
        axios({
            url: 'otc/otcorder/cancelOrder',
            method: 'post',
            data: {"orderId":this.$route.params.id},
        }).then((response) => {
            if(response.data.status == 1){
                this.$message({
                    message: '取消成功',
                    type: 'success'
                });
            }
        });
      }
  }
}
</script>

<style lang='less'>
.container {
        width: 1200px;
        margin:  20px auto;
    }
.breadwrap, .order-title {
    background: white;
    padding: 15px;
    margin-bottom: 20px;
    position: relative;
}
.pay-detail {
    background: white;
    padding: 20px 20px 0 20px;
    .payment-icon {
        display: table-cell;
        vertical-align: middle;
        padding-top: 3px;
    }
    .paymethod-txt {
        display: table-cell;
        vertical-align: middle;
        padding-left: 20px;
    }
}
.content-block {
    margin: 0 30px;
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    font-size: 14px;
    height: 80px;
    box-sizing: border-box;
    &:last-child {
        border: none;
    }
}
.confirm-block {
    padding: 20px 30px;
}
.confirm-tip {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
    color: #999;
}
.trade-message {
    background: #ddd;
    padding: 20px;
    font-size: 12px;
    ul {
        padding: 0;
        list-style: none;
    }
}
.price-bold {
    font-size: 18px;
    font-weight: bold;
    color: #409EFF;
}
.pay-title {
    color: #999;
    padding-bottom: 2px;
}
.order-title-id {
    font-size: 13px;
    margin-left: 10px;
}
.order-title-status {
    font-size: 14px;
    float: right;
    color: #5cab35;
}
</style>
