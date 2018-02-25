<template>
  <div>
    <div class="userwrap">
      <div class="avatar-wrap">
        <div class="avatar">
          <span>{{ userInfo.nickName ? userInfo.nickName.substring(0, 1) : null}}</span>
        </div>
      </div>
      <div class="userinfo">
          <p>{{userInfo.nickName || userInfo.email || userInfo.mobile}}</p>
          <p>UID: {{userInfo.userId}}</p>
      </div>
    </div>

    <div class="info-block-wrap">
      <div class="info-block">
        <div class="block-inner">
          <span class="block-flag">
              <i class="triangle"></i>
          </span>
          <template v-if="bindedName">
            <span class="box-title">昵称</span>
            <span class="box-name">{{userInfo.nickName}}</span>
            <span class="box-status">已绑定</span>
          </template>
          <template v-else>
            <span class="box-title">昵称</span>
            <span class="box-name">未绑定昵称</span>
            <span class="box-status box-unbined" @click="dialogNickVisible = true">未绑定</span>
          </template>
        </div>
      </div>
      <div class="info-block">
        <div class="block-inner">
          <span class="block-flag">
              <i class="triangle"></i>
          </span>
          <template v-if="bindedEmail">
            <span class="box-title">邮箱</span>
            <span class="box-name">{{userInfo.email}}</span>
            <span class="box-status">已绑定</span>
          </template>
          <template v-else>
            <span class="box-title">邮箱</span>
            <span class="box-name">未绑定昵称</span>
            <span class="box-status box-unbined" @click="dialogEmailVisible = true">未绑定</span>
          </template>
        </div>
      </div>
      <div class="info-block">
        <div class="block-inner">
          <span class="block-flag">
              <i class="triangle"></i>
          </span>
          <template v-if="bindedMobile">
            <span class="box-title">手机</span>
            <span class="box-name">{{userInfo.mobile}}</span>
            <span class="box-status">已绑定</span>
          </template>
          <template v-else>
            <span class="box-title">手机</span>
            <span class="box-name">未绑定昵称</span>
            <span class="box-status box-unbined" @click="dialogMobileVisible = true">未绑定</span>
          </template>
        </div>
      </div>
    </div>

      <FinancialPwd />

      <el-dialog :visible.sync="dialogNickVisible" width="520px">
        <div slot="title">
            <span class="main-title">绑定昵称</span>
        </div>
        <el-form :model="nickForm" label-position="top" :rules="rules" ref="nickForm" >
            <el-form-item label="昵称" prop="tradePassword">
                <el-input v-model="nickForm.nick" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogNickVisible = false">取 消</el-button>
            <el-button type="primary" @click="bindNick">确 定</el-button>
        </div>
    </el-dialog> 
      <el-dialog :visible.sync="dialogEmailVisible" width="520px">
        <div slot="title">
            <span class="main-title">绑定邮箱</span>
        </div>
        <el-form :model="emailForm" label-position="top" :rules="rules" ref="emailForm" >
            <el-form-item label="邮箱" prop="tradePassword">
                <el-input v-model="emailForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="tradePassword">
               <el-input v-model="emailForm.code" class="input-with-select">
                    <el-button slot="append" @click="getCode(emailForm.email,'email')">发送验证码</el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEmailVisible = false">取 消</el-button>
            <el-button type="primary" @click="bindEmail">确 定</el-button>
        </div>
    </el-dialog> 
    <el-dialog :visible.sync="dialogMobileVisible" width="520px">
        <div slot="title">
            <span class="main-title">绑定手机</span>
        </div>
        <el-form :model="mobileForm" label-position="top" :rules="rules" ref="mobileForm">
            <el-form-item label="手机" prop="tradePassword">
                <el-input v-model="mobileForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机验证码" prop="tradePassword">
               <el-input v-model="mobileForm.code" class="input-with-select">
                    <el-button slot="append" @click="getCode(mobileForm.mobile, 'mobile')">发送验证码</el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogMobileVisible = false">取 消</el-button>
            <el-button type="primary" @click="bindMobile">确 定</el-button>
        </div>
    </el-dialog> 
  </div>
  
</template>

<script>
import FinancialPwd from './set-financial-pwd'
import { mapActions, mapGetters } from 'vuex'
import axios from '@/axios';
import _ from 'lodash'

const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
const mobilePattern = /^1\d{10}$/;

export default {
    props: ['user'],
    data() {
      const validateEmail = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请填写邮箱'));
          }
          if (!emailPattern.test(value)) {
            callback(new Error('邮箱格式不正确'));
          }
          callback();
      };
      const validateMobile = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请填写手机号'));
          }
          if (!mobilePattern.test(value)) {
            callback(new Error('手机号格式不正确'));
          }
          callback();
      };
      const validateNickName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写昵称'));
        }
        callback();
      }
      return {
        dialogEmailVisible: false,
        dialogMobileVisible: false,
        dialogNickVisible: false,
        userForm: this.user,
        rules: {
          nickName: { required: true, validator: validateNickName, trigger: 'change'},
          email: { required: true, validator: validateEmail, trigger: 'change'},
          mobile: { required: true, validator: validateMobile, trigger: 'change'},
        },
        emailForm: {},
        mobileForm: {},
        nickForm: {},
      }
    },
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
      bindedName: function() {
        return !_.isEmpty(this.userInfo.nickName);
      },
      bindedEmail: function() {
        return !_.isEmpty(this.userInfo.email);
      },
      bindedMobile: function() {
        return !_.isEmpty(this.userInfo.mobile);
      },
    },
    methods: {
      ...mapActions([
        'getUserInfo',
      ]),
      getCode(account, type) {
        const pattern = type === 'email' ? emailPattern : mobilePattern;
        if (pattern.test(account)) {
          axios({
              url: 'otc/user/verCode',
              method: 'post',
              data: {
                  account,
                  scene: 103,
              },
          }).then((response) => {
            this.$message({
              message: '验证码已发送',
              type: 'success'
            });
          }); 
        } else{
            this.$message({
              message: '格式不正确',
              type: 'warning'
            });
        }
      },
      bindNick() {
        axios({
          url: '/otc/user/bindNick',
          method: 'post',
          data: this.nickForm,
        }).then((response) => {
          if(response.data.status == 1){
            this.$message({
                message: '绑定成功',
                type: 'success'
            });
            this.getUserInfo();
            this.dialogNickVisible = false;
          }
        });
      },
      bindEmail() {
        console.log(this.emailForm);
        axios({
          url: '/otc/user/bindEmail',
          method: 'post',
          data: this.emailForm,
        }).then((response) => {
          if(response.data.status == 1){
            this.$message({
                message: '绑定成功',
                type: 'success'
            });
            this.getUserInfo();
            this.dialogEmailVisible = false;
          }
        });
      },
      bindMobile() {
        axios({
          url: '/otc/user/bindMobile',
          method: 'post',
          data: this.mobileForm,
        }).then((response) => {
          if(response.data.status == 1){
            this.$message({
                message: '绑定成功',
                type: 'success'
            });
            this.getUserInfo();
            this.dialogMobileVisible = false;
          }
        });
      },
    },
    components: {
      FinancialPwd,
    },
}
</script>

<style lang='less'>
.userwrap {
  display: flex;
}
.userinfo {
  margin-left: 15px;
  p { 
    font-size: 14px;
    line-height: 25px;
    margin: 0;
  }
}
.userform-wrap {
  margin-top: 50px;
  width: 600px;
}
.box-unbined {
  color: #409EFF!important;
  cursor: pointer;
}
.info-block {
    border: 1px solid #ebeff5;
    height: 58px;
    width: 100%;
    margin-top: 20px;
}
.block-inner {
    padding: 0 30px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 58px;
    font-size: 14px;
    color: #8994a3;
}
.block-flag {
    width: 0;
    height: 0;
    border-top: 20px solid #68af77;
    border-right: 20px solid transparent;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}
.box-title {
  width: 15%;
}
.box-name {
  width: 100%;
  text-align: right;
}
.box-status {
  width: 10%;
  text-align: right;
}
</style>
