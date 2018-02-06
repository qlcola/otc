<template>
  <div>
      <el-button
        size="defaut"
        type="danger"
        class="btn-buy btn-operate" 
        @click="dialogFormVisible = true"
        >买入</el-button>
      <el-dialog :visible.sync="dialogFormVisible" width="520px">
        <div slot="title">
            <span class="main-title">买入{{currencyType}}</span>
            <span class="sub-title">请在45秒内确定，确保以当前价格下单</span>
        </div>
        <div class="trade-price">
            <div class="price-tip">交易价格({{coinType}}/{{currencyType}})</div>
            <div class="price-num">{{price}}</div>
        </div>
        <el-form :model="buyForm" label-position="top" :rules="rules" ref="buyForm" >
            <el-form-item label="单笔交易限额" >
                <div class="limit-tip">800~870 {{coinType}}</div>
            </el-form-item>
            <el-form-item :label="currencyLabel" prop="currencyAmount">
                <el-input v-model="buyForm.currencyAmount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="coinLabel" :label-width="formLabelWidth" prop="coinAmount">
                <el-input v-model="buyForm.coinAmount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="资金密码" :label-width="formLabelWidth" prop="tradePassword">
                <el-input type="password" v-model="buyForm.tradePassword" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
        </el-dialog>  
  </div>
</template>

<style lang='less'>
    .main-title {
        font-size: 16px;
        line-height: 16px;
        color: #333;
        font-weight: bold;
    }
    .sub-title {
        font-size: 13px;
        line-height: 16px;
        color: #2d8cf0;
        margin-left: 10px;
    }
    .el-dialog__header {
        border-bottom: 1px solid #ddd;
    }
    .el-form-item__label {
        padding-bottom: 0;
        line-height: 30px;
    }
    .trade-price { 
        background: #eee;
        border-radius: 5px;
        text-align: center;
        padding: 10px 0;
        .price-tip {
            font-size: 12px;
            color: #888;
        }
        .price-num {
            font-size: 15px;
            color: #333;
            font-weight: bold;
        }
    }
    .limit-tip {
        background: #eee;
        border-radius: 5px;
        font-size: 14px;
        color: #333;
        padding-left: 20px;
    }
</style>
<script>
export default {
  props: ['price', 'id', 'currencyType', 'coinType'],
  data() {
      const normalValidate = (rule, value, callback) => {
        if (!/\d+/.test(value)) {
        callback(new Error('必须输入数字'));
        }
        callback();
      };
      return {
          dialogFormVisible: false,
          buyForm: {
            currencyAmount: undefined,
            coinAmount: undefined,
            orderId: this.id,
          },
          formLabelWidth: '120px',
          rules: {
            currencyAmount: { required: true, validator: normalValidate, trigger: 'change'},
            coinAmount: { required: true, validator: normalValidate, trigger: 'change'},
            tradePassword: { required: true, trigger: 'change'},
          },
      };
  },
  computed: {
    currencyLabel: function() { 
        return `数量${this.currencyType}`;
    },
    coinLabel: function() {
        return `金额${this.coinType}`;
    },
  },
  methods: {
    submitForm: function() {
        this.$refs.buyForm.validate((valid) => {
          if (valid) {
            // axios({
            //   // url: 'otc/user/login',
            //   method: 'post',
            //   data: this.userForm,
            // }).then((response) => {

            // });
            console.log(this.buyForm);
          } else {
            return false;
          }
        });
    },
  }
}
</script>

