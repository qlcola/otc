<template>
  <div>
      <Navigator />
      <div class="container">
          <div class="publish-tip">
              <p class="tip-title">创建一个广告交易</p>
              <p class="tip-txt">如果您经常进行交易，您可以创建自己的交易广告。如果您只是偶尔交易，我们建议您直接搜索<span class="txt-blue">交易广告</span></p>
              <p class="tip-txt">创建一则交易广告上<span class="txt-blue">免费的</span></p>
              <p class="tip-txt">如果您想直接编辑已创建的广告，请查看<span class="txt-blue">我的广告</span></p>
          </div>
          <PublishForm isCreate="true" :propFormData="createFormData" />
      </div>
  </div>
</template>

<script>
import Navigator from './Navigator'
import PublishForm from './advertisment/publish-form'
export default {
  components: {
      Navigator,
      PublishForm,
  },
  data() {
      return {
          createFormData: {
              orderType: '1',
              currencyType: undefined,
              coinType: undefined,
              isFixedPrice: true,
              currencyPrice: undefined,
              primium: undefined,
              coinAmount: undefined,
              payType: [],
              minTradeAmount: undefined,
              maxTradeAmount: undefined,
              timeoutSecs: undefined,
          }
      }
  }
}
</script>

<style lang='less'>
    .container {
        width: 1200px;
        margin:  20px auto;
        background: white;
    }
    
    .publish-tip {
        padding: 20px 35px;
        .tip-title {
            font-size: 18px;
        }
        .tip-txt {
            font-size: 14px;
            line-height: 16px;
            color: #666;
        }
    }
</style>


