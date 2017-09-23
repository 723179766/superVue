<template>
  <div class="add-detail-exe">
    <div class="headRow">
      <div class="dev-logo">
        <img :src="headData.app_icon">
      </div>
      <div class="dev-title">
        <div class="head-title">{{headData.app_name}}</div>
        <div class="head-p">
          <span>包名：{{headData.apk_name}}</span>
          <span class="margin-left-25">当前正式版本：{{headData.version_code}}</span>
          <span class="margin-left-25">下载次数：{{headData.download_num}}次</span>
        </div>
      </div>
    </div>

    <div class="el-tabs-box">
      <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="应用详情审核" name="appDetail" v-if="ifDetailTab">
          <p class="tool-pink margin-bottom-10" v-if="appState==1">审核未通过的理由: <span class="reason-detail">{{app_data.app_fail_msg}}</span></p>
          <div>
            <el-form label-width="75px" class="form-detail">
              <el-form-item label="应用简介">
                <p>|&nbsp;&nbsp;<span>{{app_data.app_desc}}</span></p>
              </el-form-item>
              <el-form-item label="版本说明">
                <p>|&nbsp;&nbsp;<span>{{app_data.version_desc}}</span></p>
              </el-form-item>
              <el-form-item label="应用分类">
                <span class="line">|</span>
                <div class="form-item-right">
                  <span class="dj-tag dj-tag-selectd" v-for="item in app_data.category">{{item.category_name}}</span>
                </div>
              </el-form-item>
              <el-form-item label="截图">
                <span class="line">|</span>
                <div class="form-item-right margin-top-10 apk-img-box">
                  <img v-for="item in imgArr" :src="item">
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="版本审核" name="appVersion" v-if="ifVersionTab">
          <p class="tool-pink margin-bottom-10" v-if="appState==1">审核未通过的理由: <span class="reason-detail">{{version_data.version_fail_msg}}</span></p>
          <div>
            <el-form label-width="75px" class="form-detail">
              <el-form-item label="版本号">
                <p>|&nbsp;&nbsp;<span>{{version_data.version_code}}</span></p>
              </el-form-item>
              <el-form-item label="版本说明">
                <p>|&nbsp;&nbsp;<span>{{version_data.version_desc}}</span></p>
              </el-form-item>
              <el-form-item label="操作">
                <p>|&nbsp;&nbsp;<button type="button" class="dj-btn dj-btn-icon-download" @click="downloadApk"><img src="../../assets/downSign.png" class="btn-img-left" alt="" style="vertical-align: middle"><span style="vertical-align: middle">下载安装包</span></button></p>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="text-center" v-show="detailExe==false && activeName=='appDetail'">
      <button class="dj-btn dj-btn-primary" @click="examinePass" v-if="appState==0">审核通过</button>
      <button class="dj-btn dj-btn-danger margin-left-6" @click="examineNopass" v-if="appState==0">审核不通过</button>
      <button class="dj-btn dj-btn-fff margin-left-6" @click="back">返回</button>
    </div>

    <div class="text-center" v-show="versionExe==false && activeName=='appVersion'">
      <button class="dj-btn dj-btn-primary" @click="examinePass" v-if="appState==0">审核通过</button>
      <button class="dj-btn dj-btn-danger margin-left-6" @click="examineNopass" v-if="appState==0">审核不通过</button>
      <button class="dj-btn dj-btn-fff margin-left-6" @click="back">返回</button>
    </div>

    <el-dialog title="审核未通过理由" :visible.sync="exeModel" class="el-dialog-danger">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 6}"
        placeholder="请输入审核未通过理由"
        v-model="reason">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <button class="dj-btn dj-btn-primary  margin-right-5" @click="sureNopass">确定</button>
        <button class="dj-btn dj-btn-back" @click="exeModel=false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '../../api/appApi'
  export default {
    created(){
      this.appState = this.$route.params.appState;
      let appId = this.$route.params.appId,appState = this.$route.params.appState;
      api.getAppAuditDetail({ appId: appId,appState: appState }).then(resp=>{
        if(resp.data.code=='00000'){
          //数据等于null代表审核过
          if(resp.data.data.app_data==null){
            this.activeName = 'appVersion';
            this.ifDetailTab = false;
            this.ifVersionTab = true;
            this.detailExe = true;
          }else{
            this.app_data = resp.data.data.app_data;
            for(let i=0;i<5;i++){
              if(i==0){
                if(this.app_data.app_img!=null){
                  this.imgArr.push(this.app_data.app_img);
                }
              }else{
                if(this.app_data['app_img'+i]!=null){
                  this.imgArr.push(this.app_data['app_img'+i]);
                }
              }
            }
            this.activeName = 'appDetail';
            this.detailExe = false;
          }

          if(resp.data.data.version_data==null){
            this.activeName = 'appDetail';
            this.ifDetailTab = true;
            this.ifVersionTab = false;
            this.versionExe = true;
          }else{
            this.version_data = resp.data.data.version_data;
            if(resp.data.data.app_data!=null){
              this.activeName = 'appDetail';
            }else{
              this.activeName = 'appVersion';
            }
            this.versionExe = false;
          }
        }
      });
      //获取头部数据
      api.getAppDetailData({ appId: appId }).then(resp=>{
        if(resp.data.code=='00000'){
          this.headData.app_icon = resp.data.data.app_icon;
          this.headData.app_name = resp.data.data.app_name;
          this.headData.apk_name = resp.data.data.apk_name;
          this.headData.version_code = resp.data.data.version_code;
          this.headData.download_num = resp.data.data.download_num;
        }
      });
    },
    data(){
      return{
        //当前tab是否审核过
        detailExe: false,
        versionExe: false,
        //tab页是否有
        ifDetailTab: true,
        ifVersionTab: true,
        headData: {
          app_icon: '',
          app_name: '',
          apk_name: '',
          version_code: '',
          download_num: ''
        },
        activeName: '',
        appState: '',
        reason: '',
        exeModel: false,
        imgArr: [],
        app_data: {
          app_fail_msg: ''
        },
        version_data: {
          version_fail_msg: ''
        }
      }
    },
    methods:{
      examinePass(){
        let funcName = '',vm = this;
        this.$confirm('此操作将通过审核, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(vm.activeName=='appDetail'){
            funcName = 'appDetailExe';
          }
          if(vm.activeName=='appVersion'){
            funcName = 'appVersionExe';
          }
          api[funcName]({app_id:this.$route.params.appId,status:2}).then(resp=>{
            if(resp.data.code=='00000'){
              if(resp.data.data==1){
                if(vm.activeName=='appDetail'){
                  setTimeout(function(){
                    vm.$message({
                      type: 'success',
                      message: '应用详情审核通过'
                    });
                    vm.activeName = 'appVersion';
                    vm.detailExe = true;
                  },0)
                }
                if(vm.activeName=='appVersion'){
                  setTimeout(function(){
                    vm.$message({
                      type: 'success',
                      message: '版本审核通过'
                    });
                    vm.activeName = 'appDetail';
                    vm.versionExe = true;
                  },0)
                }
              }else{
                vm.$message({
                  type: 'success',
                  message: '已全部审核'
                });
                vm.$router.push({name: 'AppAudit'});
              }
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      examineNopass(){
        this.exeModel = true;
      },
      sureNopass(){
        if(this.reason==''){
          this.$message.error('请填写不通过的原因');
          return;
        }
        let funcName = '',vm = this;
        if(vm.activeName=='appDetail'){
          funcName = 'appDetailExe';
        }
        if(vm.activeName=='appVersion'){
          funcName = 'appVersionExe';
        }
        api[funcName]({app_id:this.$route.params.appId,status:1,fail_msg:this.reason}).then(resp=>{
          if(resp.data.code=='00000'){
            if(resp.data.data==1){
              if(vm.activeName=='appDetail'){
                setTimeout(function(){
                  vm.$message({
                    type: 'success',
                    message: '应用详情审核成功'
                  });
                  vm.exeModel = false;
                  vm.reason = '';
                  vm.activeName = 'appVersion';
                  vm.detailExe = true;
                },0)
              }
              if(vm.activeName=='appVersion'){
                setTimeout(function(){
                  vm.$message({
                    type: 'success',
                    message: '版本审核成功'
                  });
                  vm.exeModel = false;
                  vm.reason = '';
                  vm.activeName = 'appDetail';
                  vm.versionExe = true;
                },0)
              }
            }else{
              vm.$message({
                type: 'success',
                message: '已全部审核'
              });
              vm.$router.push({name: 'AppAudit'});
            }
          }
        });
      },
      downloadApk(){
        location.href = this.version_data.apk_unsign_url;
      },
      changeTab(targetName, action){
        this.activeName = targetName.name;
      },
      back(){
        this.$router.push({name: 'AppAudit'});
      }
    }
  }
</script>
<style lang='scss'>
  .add-detail-exe{
    padding: 0 !important;
    padding-bottom: 20px !important;
  .headRow{
    min-width: 950px;
    height: 98px;
    background: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px 32px;
    margin-bottom: 10px;
  .dev-logo{
    float: left;
    height: 60px;
    width: 60px;
    border-radius: 15% !important;
    border: 1px solid #c3cedc;
    overflow: hidden;
  >img{
     width: 100%;
     height: 100%;
   }
  }
  .dev-title{
    float: left;
    height: 60px;
    margin-left: 16px;
  .head-title{
    margin-top: 5px;
    font-family: "PingFang SC";
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }
  .head-p{
  span{
    margin-bottom: 5px;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: bold;
    color: #999;
  }
  }
  }
  }
  .el-tabs-box{
    padding: 0 20px 20px 20px;
  .reason-detail{
    font-family: "PingFang SC";
    font-size: 12px;
    font-weight: bold;
    color: #666;
  }
  .form-detail{
  .el-form-item__label{
    font-family: "PingFang SC";
    color: #999;
  }
  .el-form-item{
    margin-bottom: 0;
  .dj-tag{
    line-height: 1.4;
  }
  p{
    color: #999;
  >span{
     font-family: "PingFang SC";
     font-size: 14px;
   }
  }
  .line{
    vertical-align: top;
    color: #999;
  }
  .form-item-right{
    display: inline-block;
    width: 96%;
  img{
    width: 136px;
    height: 200px;
    margin-left: 10px;
  }
  }
  .apk-img-box{
    margin-left: -7px;
  }
  }
  }
  }
  }
</style>
