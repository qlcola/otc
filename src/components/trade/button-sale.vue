<template>
  <div>
      <el-button
        size="defaut"
        type="success"
        class="btn-buy btn-operate"
        @click="dialogFormVisible = true"
        >卖出</el-button>
      <el-dialog :visible.sync="dialogFormVisible" width="520px">
        <div slot="title">
            <span class="main-title">卖出{{currencyType===1?'BTC':'CNY'}}</span>
            <span class="sub-title">请在45秒内确定，确保以当前价格下单</span>
        </div>
        <div class="trade-price">
            <div class="price-tip">交易价格({{coinType}}/{{currencyType===1?'CNY':'CNY'}})</div>
            <div class="price-num">{{price}}</div>
        </div>
        <el-form :model="saleForm" label-position="top" :rules="rules" ref="saleForm">
            <el-form-item label="单笔交易限额" >
                <div class="limit-tip">{{minTradeAmount}}~{{maxTradeAmount}}</div>
            </el-form-item>
            <el-form-item :label="coinLabel" prop="coinAmount">
                <el-input v-model="saleForm.coinAmount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="currencyLabel" :label-width="formLabelWidth" prop="currencyAmount">
                <el-input v-model="saleForm.currencyAmount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="资金密码" :label-width="formLabelWidth" prop="tradePassword">
                <el-input type="password" v-model="saleForm.tradePassword" auto-complete="off"></el-input>
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
import axios from '@/axios';

export default {
  props: ['price', 'id', 'currencyType', 'coinType', 'maxTradeAmount', 'minTradeAmount'],
  data() {
      const normalValidate = (rule, value, callback) => {
        if (!/\d+/.test(value)) {
        callback(new Error('必须输入数字'));
        }
        callback();
      };
      return {
          dialogFormVisible: false,
          rules: {
            currencyAmount: { required: true, validator: normalValidate, trigger: 'change'},
            coinAmount: { required: true, validator: normalValidate, trigger: 'change'},
            tradePassword: { required: true, trigger: 'change'},
          },
          saleForm: {
            currencyAmount: undefined,
            coinAmount: undefined,
            adId: this.id,
          },
          formLabelWidth: '120px'
      };
  },
  computed: {
    coinLabel: function() {
        return '数量 BTC';
    },
    currencyLabel: function() {
        return '金额 CNY';
    },
  },
  methods: {
    submitForm() {
        // this.dialogFormVisible = false;
        this.$refs.saleForm.validate((valid) => {
          if (valid) {
             axios({
               url: 'otc/otcorder/createOrder',
               method: 'post',
               data: this.saleForm,
             }).then((response) => {
               if(response.data.status == 1){
                 this.$message({
                   message: '创建订单成功',
                   type: 'success'
                 });
                 const orderId = response.data.orderId;
                 this.$router.push(`/orderDetail/${orderId}`);
               }
             });
            console.log(this.saleForm);
          } else {
            return false;
          }
        });
    }
  },
}
</script>

