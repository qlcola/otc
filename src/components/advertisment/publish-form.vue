<template>
  <div class="publish-content-wrap">
      <el-form :model="formData" status-icon :rules="rules" ref="formData" label-width="150px">
            <el-form-item label="我想要" prop="adType">
                <el-radio-group v-model="formData.adType">
                    <el-radio label="1">在线出售</el-radio>
                    <el-radio label="2">在线购买</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="交易币种" prop="currencyType">
                <el-select v-model="formData.currencyType" placeholder="请选择">
                    <el-option
                    v-for="item in currencyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货币" prop="coinType">
                <el-select v-model="formData.coinType" placeholder="请选择">
                    <el-option
                    v-for="item in coinOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开启固定价格" prop="isFixedPrice">
                <el-switch v-model="formData.isFixedPrice"></el-switch>
            </el-form-item>
            <el-form-item label="溢价" prop="primium">
                <el-input v-model="formData.primium" auto-complete="off" placeholder="范围0～30%">
                    <template slot="append">%</template>
                </el-input>
                <p class="primium-tip">市场参考价格：<span class="red-txt">75450.68 CNY/BTC</span></p>
                <p class="primium-tip">溢价是指高于当前市场价格多少百分比进行卖出</p>
            </el-form-item>
            <el-form-item label="交易价格">
                <span class="red-txt ft18">75450.68 CNY/BTC</span>
                <p class="primium-tip">计算公式：(Bitstamp+Bitfinex+Coinbase) /3 * 1.0000</p>
            </el-form-item>
            <el-form-item label="卖出数量" prop="coinAmount">
                <el-input v-model="formData.coinAmount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="付款期限" prop="timeOutSec">
                <el-input v-model="formData.timeOutSec" auto-complete="off" >
                    <template slot="append">分钟</template>
                </el-input>
            </el-form-item>
            <el-form-item label="付款方式" prop="payType">
                <el-checkbox-group v-model="formData.payType">
                    <el-checkbox v-for="pay in paymethods" :label="pay.label" :key="pay.value" :value="pay.value">{{pay.label}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="最小交易额" prop="minTradeAmount">
                <el-input v-model="formData.minTradeAmount" auto-complete="off" placeholder="输入最小交易额">
                    <template slot="append">CNY</template>
                </el-input>
            </el-form-item>
            <el-form-item label="最大交易额" prop="maxTradeAmount">
                <el-input v-model="formData.maxTradeAmount" auto-complete="off" placeholder="输入最大交易额">
                    <template slot="append">CNY</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="publish-btn" type="primary" @click="submitPublishForm()">提交</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
  import axios from '@/axios';
export default {
  props: ['isCreate', 'propFormData'],
  data () {
      const validatePrimium = (rule, value, callback) => {
        if (!/\d+/.test(value)) {
        callback(new Error('必须输入数字'));
        } else if ( value < 0 || value > 30) {
            callback(new Error('超过范围'));
        }
        callback();
      };
      return {
          rules: {
              adType: [
                { required: true, trigger: 'change' }
              ],
              currencyType: [
                { required: true, trigger: 'change' }
              ],
              coinType: [
                { required: true, trigger: 'change' }
              ],
              isFixedPrice: [
                { required: true, trigger: 'change' }
              ],
              primium: [
                { required: true,validator: validatePrimium, trigger: 'change' }
              ],
              currencyPrice: [
                { required: true, trigger: 'change' }
              ],
              payType: [
                { required: true, trigger: 'change' }
              ],
              minTradeAmount: [
                { required: true, trigger: 'change' }
              ],
              maxTradeAmount: [
                { required: true, trigger: 'change' }
              ],
              timeoutSecs: [
                { required: true,  trigger: 'change' }
              ],
          },
          formData: this.propFormData,
          currencyOptions: [{
              value: '1',
              label: 'BTC',
          }],
          coinOptions: [{
              value: '1',
              label: 'CNY',
          }],
          paymethods: [{
              value: '2',
              label: '支付宝',
          }, {
              value: '3',
              label: '微信支付',
          }, {
              value: '1',
              label: '银行卡支付',
          }]
      }
  },
  methods: {
      submitPublishForm() {
          this.$refs.formData.validate((valid) => {
            if (valid) {
                //console.log(this.formData);
              axios({
                url: 'otc/otcad/create',
                method: 'post',
                data: this.formData,
              }).then((response) => {
                if(response.data.status == 1){
                  this.$message({
                    message: '发布广告成功',
                    type: 'success'
                  });
                  this.activeName = 'getOtcAds';
                }

              }).catch(err => {
                this.$message({
                  message: '登录失败，请重试',
                  type: 'error'
                });
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
      }
  }
}
</script>

<style lang='less'>
.primium-tip {
    font-size: 12px;
    color: #999;
    line-height: 12px;
}
.red-txt {
    color: #cb2027;
}
.ft18 {
    font-size: 18px;
}
.publish-content-wrap {
    padding-bottom: 50px;
    .el-form-item__content {
        width: 400px;
    }
    .el-select,.publish-btn {
        width: 400px;
    }
}
</style>

