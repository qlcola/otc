<template>
  <div>
    <el-button
    size="defaut"
    type="danger"
    class="btn-buy btn-operate" 
    @click="dialogFormVisible = true"
    >重置资金密码</el-button>
    <el-dialog :visible.sync="dialogFormVisible" width="520px">
        <div slot="title">
            <span class="main-title">重置资金密码</span>
        </div>
        <el-form :model="pwdForm" label-position="top" :rules="rules" ref="pwdForm" >
            <el-form-item label="新资金密码" :label-width="formLabelWidth">
                <el-input type="password" v-model="pwdForm.psd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" :label-width="formLabelWidth">
               <el-input v-model="pwdForm.mobileCode" class="input-with-select">
                    <el-button slot="append" @click="getCode('mobile')">发送验证码</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" :label-width="formLabelWidth">
               <el-input v-model="pwdForm.emailCode" class="input-with-select">
                    <el-button slot="append" @click="getCode('email')">发送验证码</el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog> 
  </div>
</template>

<script>
import axios from '@/axios';
import { mapGetters } from 'vuex';
export default {
  data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        pwdForm: {

        },
        rules: {},
      };
  },
  computed: {
    ...mapGetters([
        'userMobile',
        'userEmail',
        'userId',
    ]),
  },
  methods: {
    submitForm() {
        axios({
            url: 'otc/user/updateCapitalPsd',
            method: 'post',
            data: this.pwdForm,
        }).then((response) => {
            if(response.data.status == 1){
                this.$message({
                    message: '设置成功',
                    type: 'success'
                });
            }
            this.dialogFormVisible = false;
        });
    },
    getCode(type) {
     axios({
        url: 'otc/user/verCode',
        method: 'post',
        data: {
            account: type === 'email' ? this.userEmail : this.userMobile,
            scene: 105,
        },
     }).then((response) => {
         if(response.data.status == 1){
            this.$message({
              message: '验证码已发送',
              type: 'success'
            });
         }
     });
    },
  },
}
</script>

<style>

</style>
