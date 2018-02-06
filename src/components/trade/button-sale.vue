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
            <span class="main-title">卖出{{currencyType}}</span>
            <span class="sub-title">请在45秒内确定，确保以当前价格下单</span>
        </div>
        <div class="trade-price">
            <div class="price-tip">交易价格({{coinType}}/{{currencyType}})</div>
            <div class="price-num">{{price}}</div>
        </div>
        <el-form :model="form" label-position="top">
            <el-form-item label="单笔交易限额" >
                <div class="limit-tip">800~870 {{coinType}}</div>
            </el-form-item>
            <el-form-item :label="currencyLabel" >
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="coinLabel" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      return {
          dialogFormVisible: false,
          form: {
            name: '',
            },
          formLabelWidth: '120px'
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
}
</script>

