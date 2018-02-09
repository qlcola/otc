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
            买入 BTC 订单号: {{ $route.params.id }}
        </div>
        <div class="pay-detail">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content">
                        <div class="content-block">
                            <div class="pay-title">交易金额</div>
                            <div class="pay-price">100 CNY</div>
                        </div>
                        <div class="content-block">
                            <div class="pay-title">数量</div>
                            <div class="pay-price">0.00123 BTC</div>
                        </div>
                        <div class="content-block">
                            <div class="pay-title">价格</div>
                            <div class="pay-price">81887 CNY／BTC</div>
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
                            <div class="pay-price">7980765</div>
                        </div>
                        <div class="confirm-block">
                            <div class="confirm-tip">
                                <span class="txt-blue">付款参考号：</span>请务必备注在付款信息中，便于收款方确认款项
                            </div>
                            <div>
                                <el-button class="publish-btn" type="primary" @click="confirmPay()">我已付款</el-button>
                                <el-button class="publish-btn" @click="cancelTrad()">取消交易</el-button>
                                <el-button class="publish-btn" @click="confirmFinish()">确认放行</el-button>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="trade-message">
            <ul>
                <li>交易提示</li>
                <li>1、您的汇款将直接进入卖方账户，交易过程中卖方出售到数字资产由平台托管保护。</li>
                <li>2、请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字资产划转到您的账户。</li>
                <li>3、买卖当日连续3笔或累计6笔取消，广告方当日取消率超过30%，会限制当天到买入功能。</li>
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
</style>
