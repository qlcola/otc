<template>
  <div>
      <Navigator />
      <div class="container white">
          <div class="financial-title">
              <span>法币交易账户</span>
              <span>折合总资产：</span>
          </div>
          <div class="financial-table">
            <el-table
             :data="financialData"
             stripe
             style="width: 100%">
                <el-table-column prop="coinType" label="币种">
                    <template slot-scope="scope">
                        <span>{{ scope.row.coinType === 1 ? 'BTC' : 'CNY'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="amount"
                label="可用">
                </el-table-column>
                <el-table-column
                prop="freezonAmount"
                label="冻结">
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-popover
                    ref="popover4"
                    placement="right"
                    width="800"
                    trigger="click">
                        <div class="charge-tip">
                            <p>温馨提示</p>
                            <ul>
                                <li>请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
                                <li>您充值至上述地址后，需要整个网络节点的确认，6次网络确认后可划转。</li>
                                <li>最小充值金额：0.001BTC，小于最小金额的充值将不会上账。</li>
                                <li>您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或者邮件通知您。</li>
                                <li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
                            </ul>
                        </div>
                    </el-popover>

                    <el-button v-popover:popover4>充值</el-button>
                </template>
                </el-table-column>
            </el-table>
          </div>
      </div>
  </div>
</template>

<script>
import Navigator from './Navigator'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
      Navigator,
  },
  data() {
      return {
      }
  },
  computed: {
      ...mapGetters(['financialData']),
  },
  methods: {
    ...mapActions([
        'getMyFinancial',
    ]),
      charge() {

      }
  },
  created() {
    this.getMyFinancial();
  },
}
</script>

<style lang='less'>
    .container.white {
        width: 1200px;
        margin:  20px auto;
        background: white;
    }
    .financial-title {
        padding: 15px;
        box-shadow: 0 3px 10px 0 rgba(68, 79, 113, 0.09);
        display: flex;
        font-weight: bold;
        justify-content: space-between;
    }
    .financial-table {
        padding: 20px;
    }
    .charge-tip {
        font-size: 12px;
        color: #333;
    }
</style>
