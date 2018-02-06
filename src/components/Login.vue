<template>
  <div>
    <Navigator />
      <el-card class="box-card">
        <el-tabs v-model="activeName">
            <el-tab-pane label="登录" name="login">
                <div class="login-wrap">
                    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-position="top">
                        <el-form-item label="用户名" prop="account">
                            <el-input v-model="loginForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-button class="login-btn" type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
                    </el-form>
                </div>
                
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
                <div class="register-wrap">
                    <el-form :model="registerForm" status-icon :rules="rules2" ref="registerForm"  label-position="top">
                        <el-form-item label="用户名" prop="account">
                            <el-input v-model="registerForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="register-btn" type="primary" @click="submitRegisterForm('registerForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
        </el-tabs>
      </el-card>
  </div>
</template>

<style>
.box-card { 
    width: 400px;
    height: 500px;
    margin: 0 auto;
    top: 50%;
    position: absolute;
    margin-top: -250px;
    left: 50%;
    margin-left: -200px;
}
.login-wrap, .register-wrap {
    margin-top: 20px;
    padding: 0 10px;
}
.login-btn, .register-btn { 
    width: 100%;
    margin-top: 30px;
}
.el-form-item__label {
    line-height: 30px;
}

</style>


<script>
import axios from '@/axios';
import Navigator from './Navigator'
import _ from 'lodash'
import { setCookie } from '../util.js';
import { mapActions } from 'vuex';

const PwdPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
const mobilePattern = /^1\d{10}$/;

  export default {
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!PwdPattern.test(value)) {
            callback(new Error('密码必须由6～18位的字母和数字组成'));
          }
        }
        callback();
      };
      const validateUserName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入用户名'));
          }
          if (!emailPattern.test(value) && !mobilePattern.test(value)) {
            callback(new Error('用户名应为邮箱或手机号'));
          }
          callback();
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'right',
        loginForm: {
          account: '',
          password: '',
        },
        rules: {
            password: [
                { required: true, /*validator: validatePassword,*/ trigger: 'change' }
            ],
            account: [
                { required: true, validator: validateUserName, trigger: 'change' }
            ],
        },
        activeName: 'login',
        registerForm: {
          password: '',
          checkPass: '',
          account: '',
          type: '',
        },
        rules2: {
          password: [
            { required: true, validator: validatePassword, trigger: 'change' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'change' }
          ],
          account: [
            { required: true, validator: validateUserName, trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      ...mapActions([
        'getUserInfo',
        'getMyFinancial',
      ]),
      submitLoginForm(formName) {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
                axios({
                  url: 'otc/user/login',
                  method: 'post',
                  data: this.loginForm,
                }).then((response) => {
                  if(response.data.status == 1){
                        let expireDays = 1000 * 60 * 60 * 24 * 15;
                        setCookie('session', response.data.data.sessionId, expireDays);
                        
                        this.getUserInfo();
                        this.getMyFinancial();
                        this.$router.push('/');
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
      },
      submitRegisterForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.registerForm.type = mobilePattern.test(this.registerForm.account)
            ? 'mobile'
            : 'email';
            axios({
              url: 'otc/user/register',
              method: 'post',
              data: _.omit(this.registerForm, ['checkPass']),
            }).then(response => {
                if(response.data.status == 1){
                  this.$message({
                    message: '注册成功，请重新登录',
                    type: 'success'
                  });
                  this.activeName = 'login';
                }
            }).catch(err => {
              this.$message({
                message: '注册失败，请重试',
                type: 'error'
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    components: {
      Navigator
    },
  }
</script>
