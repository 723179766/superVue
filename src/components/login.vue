<template>
  <div id="login" class="dj-amt">
    <div class="login-title">
      <div class="amtFont">
        <span class="font1">QiYou 七游集团</span>
        <span class="font2">|</span>
        <span class="font3">大数据云监控平台</span>
        <span class="font4">一键配置接入系111统</span>
      </div>
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
    <div class="animation3" v-if="loginLoad">
      <div class="circle1"></div>
      <div class="circle2"></div>
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
      let vm = this;
      setTimeout(function(){
        vm.account = '723179766@qq.com';
        vm.pwd = 'root@root.com';
        vm.$notify({
          title: 'OK!',
          message: '账号已经为您分配成功',
          type: 'success'
        });
      },1500);
    },
    data () {
      return {
        showCode: false,
        account: '',
        pwd: '',
        code: '',
        dataImg: '',
        loginLoad: false
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
        let vm = this;
        vm.loginLoad = true;
        setTimeout(function(){
          vm.loginLoad = false;
          sessionStorage.setItem('userInfo',JSON.stringify({user_name:723179766}));
          vm.$router.push({ name: 'Layout'});
        },700);
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
    },
    mounted(){

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
  #login .amtFont{
    width: 80%;
    margin-left: -530px;
    -webkit-animation: fontAmt 1.2s ease-in-out;
    animation: fontAmt 1.2s ease-in-out;
    animation-fill-mode: forwards;
  }
  @-webkit-keyframes fontAmt {
    0% { }
    50% { margin-left: 0;}
    60%{ transform: translateX(-4px);}
    65%{ transform: translateX(4px);}
    70%{ transform: translateX(-4px);}
    75%{ transform: translateX(4px);}
    80%{ transform: translateX(-4px);}
    85%{ transform: translateX(4px);}
    90%{ transform: translateX(-4px);}
    95%{ transform: translateX(4px);}
    100%{ margin-left: 0;}
  }
  @keyframes loginAmt {
    0% { }
    50% { margin-left: 0;}
    60%{ transform: translateX(-4px);}
    65%{ transform: translateX(4px);}
    70%{ transform: translateX(-4px);}
    75%{ transform: translateX(4px);}
    80%{ transform: translateX(-4px);}
    85%{ transform: translateX(4px);}
    90%{ transform: translateX(-4px);}
    95%{ transform: translateX(4px);}
    100%{ margin-left: 0;}
  }
  #login>.login-title span{
    font-size: 16px;
  }
  #login>.login-title .font1{
    margin-left: 100px;
    font-size: 18px;
    color: #1784c6;
  }
  #login>.login-title .font2{
    margin-left: 5px;
    color: #1784c6;
  }
  #login>.login-title .font3{
    margin-left: 5px;
    color: #ffa100;
  }
  #login>.login-title .font4{
    color: #1784c6;
  }
  #login>.login-main{
    position: absolute;
    top: 0;
    left: 50%;
    width: 400px;
    height: 290px;
    margin-left: -200px;
    margin-top: -290px;
    padding: 30px 35px 20px 35px;
    background: #fff;
    -webkit-animation: loginAmt 1.2s ease-in-out;
    animation: loginAmt 1.2s ease-in-out;
    animation-fill-mode: forwards;
  }
  @-webkit-keyframes loginAmt {
    0% { }
    50% { margin-top: 140px;}
    60%{ transform: translateX(-4px);}
    65%{ transform: translateX(4px);}
    70%{ transform: translateX(-4px);}
    75%{ transform: translateX(4px);}
    80%{ transform: translateX(-4px);}
    85%{ transform: translateX(4px);}
    90%{ transform: translateX(-4px);}
    95%{ transform: translateX(4px);}
    100% { margin-top: 140px;}
  }
  @keyframes loginAmt {
    0% { }
    50% { margin-top: 140px;}
    60%{ transform: translateX(-4px);}
    65%{ transform: translateX(4px);}
    70%{ transform: translateX(-4px);}
    75%{ transform: translateX(4px);}
    80%{ transform: translateX(-4px);}
    85%{ transform: translateX(4px);}
    90%{ transform: translateX(-4px);}
    95%{ transform: translateX(4px);}
    100% { margin-top: 140px;}
  }
  #login>.login-main>.login-font{
    margin-bottom: 30px;
    font-size: 25px;
    color: #39a4fe;
  }
  #login>.animation3{
    margin: 150px auto;
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
