<template>
  <div class="user-setting-wrap">
      <el-collapse>
        <el-collapse-item name="1">
            <div slot="title" class="bind-block">
                <span class="payicon-big big-bankCard"></span>
                <span class="bind-title">银行卡账号</span>
                <span class="bind-info">个人银行卡信息未绑定</span>
            </div>
            <div>
                <el-form :model="bankForm" :rules="bankFormRules" ref="bankForm" class="bankForm" label-width="100px">
                    <el-form-item prop="surname">
                        <el-input v-model="bankForm.surname">
                            <template slot="prepend">姓名</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="bankBranch">
                        <el-select v-model="bankForm.bankBranch" placeholder="请选择开户银行">
                        <el-option 
                            v-for="bank in banks"
                            :key="bank.value"
                            :label="bank.label"
                            :value="bank.value"
                        ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="bankOpen">
                        <el-input v-model="bankForm.bankOpen">
                            <template slot="prepend">开户支行</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="bankCardId">
                        <el-input v-model="bankForm.bankCardId">
                            <template slot="prepend">银行卡号</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="financialPass">
                        <el-input v-model="bankForm.financialPass">
                            <template slot="prepend">资金密码</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('bankForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-collapse-item>
        <el-collapse-item name="2">
            <div slot="title" class="bind-block">
                <span class="payicon-big big-alipay"></span>
                <span class="bind-title">支付宝账号</span>
                <span class="bind-info">个人支付宝账户信息未绑定</span>
            </div>
            <div>
                <el-form :model="alipayForm" :rules="alipayFormRules" ref="alipayForm" class="bankForm" label-width="100px">
                    <el-form-item prop="surname">
                        <el-input v-model="alipayForm.surname">
                            <template slot="prepend">姓名</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="aliAccount">
                        <el-input v-model="alipayForm.aliAccount">
                            <template slot="prepend">支付宝号</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="financialPass">
                        <el-input v-model="alipayForm.financialPass">
                            <template slot="prepend">资金密码</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('alipayForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-collapse-item>
        <el-collapse-item name="3">
            <div slot="title" class="bind-block last">
                <span class="payicon-big big-wechat"></span>
                <span class="bind-title">微信账号</span>
                <span class="bind-info">个人微信账户信息未绑定</span>
            </div>
            <div>
                <el-form :model="wechatForm" :rules="wechatFormRules" ref="wechatForm" class="bankForm" label-width="100px">
                    <el-form-item prop="surname">
                        <el-input v-model="wechatForm.surname">
                            <template slot="prepend">姓名</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="weixinAccount">
                        <el-input v-model="wechatForm.weixinAccount">
                            <template slot="prepend">微信账号</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="financialPass">
                        <el-input v-model="wechatForm.financialPass">
                            <template slot="prepend">资金密码</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('wechatForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  props: ['bank', 'alipay', 'wechat'],
  data() {
      const normalValidate = (rule, value, callback) => {
          console.log(value);
          if (_.isNil(value) || value === '') {
            callback(new Error('请填写'));
          }
          callback();
      };
      return {
          bankForm: this.bank,
          alipayForm: this.alipay,
          wechatForm: this.wechat,
          banks: [{
              label: '中国工商银行',
              value: 'bank1',
          }, {
              label: '中国农业银行',
              value: 'bank2',
          }, {
              label: '中国建设银行',
              value: '3',
          }, {
              label: '中国工商银行',
              value: '4',
          }, {
              label: '招商银行',
              value: '5',
          }, {
              label: '中国银行',
              value: '6',
          }, {
              label: '交通银行',
              value: '7',
          }, {
              label: '中信银行',
              value: '8',
          }, {
              label: '华夏银行',
              value: '9',
          }, {
              label: '中国民生银行',
              value: '10',
          }, {
              label: '广发银行',
              value: '11',
          }, {
              label: '平安银行',
              value: '12',
          }, {
              label: '兴业银行',
              value: '13',
          }, {
              label: '上海浦东发展银行',
              value: '14',
          }, {
              label: '浙商银行',
              value: '15',
          }, {
              label: '渤海银行',
              value: '16',
          }, {
              label: '恒丰银行',
              value: '17',
          }, {
              label: '花旗银行',
              value: '18',
          }, {
              label: '渣打银行',
              value: '19',
          }, {
              label: '汇丰银行',
              value: '20',
          }, {
              label: '中国光大银行',
              value: '21',
          }, {
              label: '北京银行',
              value: '22',
          }, {
              label: '上海银行',
              value: '23',
          }, {
              label: '江苏银行',
              value: '24',
          }, {
              label: '重庆银行',
              value: '25',
          }, {
              label: '天津银行',
              value: '26',
          }, {
              label: '厦门银行',
              value: '27',
          }, {
              label: '城市商业银行',
              value: '28',
          }, {
              label: '农村商业银行',
              value: '29',
          }],
          bankFormRules: {
            surname: { required: true, validator: normalValidate, trigger: 'change'},
            bankBranch: { required: true, validator: normalValidate, trigger: 'change'},
            bankOpen: { required: true, validator: normalValidate, trigger: 'change'},
            bankCardId: { required: true, validator: normalValidate, trigger: 'change'},
            financialPass: { required: true, validator: normalValidate, trigger: 'change'},
          },
          alipayFormRules: {
            surname: { required: true, validator: normalValidate, trigger: 'change'},
            financialPass: { required: true, validator: normalValidate, trigger: 'change'},
            aliAccount: { required: true, validator: normalValidate, trigger: 'change'},
          },
          wechatFormRules: {
            surname: { required: true, validator: normalValidate, trigger: 'change'},
            financialPass: { required: true, validator: normalValidate, trigger: 'change'},
            weixinAccount: { required: true, validator: normalValidate, trigger: 'change'},
          },
      };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // axios({
            //   // url: 'otc/user/login',
            //   method: 'post',
            //   data: this.userForm,
            // }).then((response) => {

            // });
            console.log(this[formName]);
          } else {
            return false;
          }
        });
      }
    },
}
</script>

<style lang='less'>
    .user-setting-wrap {
        .el-collapse-item__header {
            height: 61px;
            border-top: none;
            border-bottom: 1px solid #eee;
        }
        .bind-block {
            display: flex;
            align-items: center;
            padding: 10px 20px;
        }
        .bind-block.last {
            border: none;
        }
        .bind-title {
            font-size: 14px;
            color: #555;
            margin-left: 20px;
            margin-right: 50px;
            line-height: 40px;
            border-right: 1px solid #eee;
            padding-right: 30px;
            width: 100px;
        }
        .bind-info {
            color: #999;
        }
        .el-collapse {
            border: none;
        }
    }
    .bankForm {
        width: 500px;
        margin-top: 30px;
    }
</style>
