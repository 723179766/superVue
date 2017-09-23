<template>
  <div id="login">
    <div class="login-title">
      <span class="font1">Seuic 东集</span>
      <span class="font2">|</span>
      <span class="font3">智能设备平台</span>
      <span class="font4">大数据云监控</span>
    </div>
    <div class="login-main">
      <div class="login-font">登录</div>
      <div class="login-form">
        <el-input class="margin-b-22" v-model="account" placeholder="请输入用户名" @keyup.enter.native="loginIn"></el-input>
        <el-input class="margin-b-22" type="password" v-model="pwd" placeholder="请输入密码" @keyup.enter.native="loginIn"></el-input>
      </div>
      <el-row :gutter="10" class="margin-b-22" v-show="showCode">
        <el-col :span="12">
          <el-input v-model="code" placeholder="请输入验证码" @keyup.enter.native="loginIn"></el-input>
        </el-col>
        <el-col :span="7">
          <img :src="dataImg" alt="" class="code-img" @click="changeCode">
        </el-col>
        <el-col :span="5" class="change-code-warp">
          <span class="change-code" @click="changeCode">换一换</span>
        </el-col>
      </el-row>
      <div>
        <el-button type="primary" @click="loginIn">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../config'
  import md5 from 'js-md5'
  export default {
    name: 'Login',
    created () {
    },
    data () {
      return {
        showCode: false,
        account: '',
        pwd: '',
        code: '',
        dataImg: ''
      }
    },
    methods: {
      loginIn(){
        if(this.account=='' || this.pwd==''){
          this.$message({
            message: '请填写账号和密码',
            type: 'warning'
          });
          return;
        }
        if(this.showCode==true && this.code==''){
          this.$message('请输入验证码');
          return;
        }
        sessionStorage.setItem('userInfo',1);
        this.$router.push({ name: 'Layout'});
        return;
        axios({
          method: 'post',
          url: API + '/auth',
          data: {
            user: this.account,
            password: md5(this.pwd),
            captcha: this.code
          }
        }).then(resp=>{
          if(resp.data.code=="00104"){
            this.changeCode();
            this.showCode = true;
            this.$message.error('用户不存在或者密码不正确');
          }
          if(resp.data.code=="00106"){
            this.changeCode();
            this.showCode = true;
            this.$message.error('密码不正确，请重新输入');
          }
          if(resp.data.code=="00107"){
            this.changeCode();
            this.showCode = true;
            this.$message.error('验证码不正确，请重新输入');
          }
          if(resp.data.code=="00000"){
            sessionStorage.setItem('userInfo',JSON.stringify(resp.data.data));
            this.$router.push({ name: 'Layout'});
          }
        });
      },
      changeCode(){
        axios({
          method: 'post',
          url: API + '/auth/captcha'
        }).then(resp=>{
          if(resp.data.code=='00000'){
            this.dataImg = resp.data.data;
          }
        });
      }
    }
  }
</script>

<style scoped>
  #login{
    height: 100%;
    background: url(../assets/login.png) no-repeat center;
    background-size: cover;
  }
  #login>.login-title{
    height: 78px;
    line-height: 78px;
    background: #1e242b;
  }
  #login>.login-title>span{
    font-size: 16px;
  }
  #login>.login-title>.font1{
    margin-left: 100px;
    font-size: 18px;
    color: #1784c6;
  }
  #login>.login-title>.font2{
    margin-left: 5px;
    color: #1784c6;
  }
  #login>.login-title>.font3{
    margin-left: 5px;
    color: #ffa100;
  }
  #login>.login-title>.font4{
    color: #1784c6;
  }
  #login>.login-main{
    width: 400px;
    margin: 40px auto 0 auto;
    padding: 30px 35px 20px 35px;
    background: #fff;
  }
  #login>.login-main>.login-font{
    margin-bottom: 30px;
    font-size: 25px;
    color: #39a4fe;
  }
  .margin-b-22{
    margin-bottom: 22px;
  }
  button{
    width: 100%;
  }
  .code-img{
    width: 100%;
    height: 34px;
    cursor: pointer;
  }
  .change-code-warp{
    position: relative;
    height: 34px;
  }
  .change-code{
    position: absolute;
    bottom: 0;
    color: #40bef4;
    cursor: pointer;
  }
</style>
