<template>
  <div>
    <div class="app-upload-exe page-sign margin-bottom-10">
      <div class="title-box">
        <span class="tip"></span>
        <span class="title">审核应用</span>
      </div>
      <p class="tool-pink cant-reason">审核未通过的理由: <span class="reason-detail">截图与应用不匹配</span></p>
      <div class="content-box">
        <el-form label-width="120px" class="form-detail">
          <el-form-item label="安装包">
            <p>|&nbsp;&nbsp;<button type="button" class="dj-btn dj-btn-icon-download"><i class="el-icon-upload2 icon-left"></i>下载</button></p>
          </el-form-item>
          <el-form-item label="应用名">
            <p>|&nbsp;&nbsp;<span>{{formDetail.providerName}}</span></p>
          </el-form-item>
          <el-form-item label="包名">
            <p>|&nbsp;&nbsp;<span>{{formDetail.devNo}}</span></p>
          </el-form-item>
          <el-form-item label="应用简介">
            <p>|&nbsp;&nbsp;<span>{{formDetail.sn}}</span></p>
          </el-form-item>
          <el-form-item label="版本说明">
            <p>|&nbsp;&nbsp;<span>{{formDetail.serialNo}}</span></p>
          </el-form-item>
          <el-form-item label="应用分类">
            <span class="line">|</span>
            <div class="form-item-right">
              <span class="dj-tag dj-tag-selectd" v-for="item in formDetail.devLabel">{{item.label_name}}</span>
            </div>
          </el-form-item>
          <el-form-item label="截图">
            <span class="line">|</span>
            <div class="form-item-right margin-top-10 apk-img-box">
              <img src="../../assets/down-dis.png" alt="" v-for="item in [1,2,3,4,5,6,7]">
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="text-center">
      <button class="dj-btn dj-btn-default">返回</button>
      <button class="dj-btn dj-btn-primary margin-left-6">审核通过</button>
      <button class="dj-btn dj-btn-danger margin-left-6" @click="examineNopass">审核不通过</button>
      <button class="dj-btn dj-btn-back margin-left-6">取消</button>
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
  export default {
    name: '',
    created () {
      this.formDetail =  {
        providerName: '海豚开单',
        devNo: 'com.seuic.seuickp',
        sn: '智能云支付，解决各类商户的很多很多很多问题',
        serialNo: '增加了支付宝收款功能',
        devLabel: [{label_name:'零食'},{label_name:'电商'},{label_name:'军火'}]
      }
    },
    data () {
      return {
        reason: '',
        exeModel: false,
        formDetail: {
          providerName: '',
          devNo: '',
          sn: '',
          serialNo: '',
          devLabel: []
        }
      }
    },
    methods: {
      examineNopass(){
        this.exeModel = true;
      },
      sureNopass(){

      }
    }
  }
</script>

<style lang='scss'>
  .app-upload-exe .title-box{
    position: relative;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .app-upload-exe .tip{
    position: absolute;
    display: inline-block;
    width: 5px;
    height: 100%;
    background-color: #3aa5ff;
  }
  .app-upload-exe .title{
    margin-left: 15px;
    font-weight: 600;
    color: #1f2d3d;
  }
  .app-upload-exe .cant-reason{
    margin: 0 auto 10px auto;
    width: 92%;
  }
  .app-upload-exe .cant-reason .reason-detail{
    font-family: "PingFang SC";
    font-size: 12px;
    font-weight: bold;
    color: #666;
  }
  .app-upload-exe .form-detail .el-form-item{
    margin-bottom: 0;
  }
  .app-upload-exe .form-detail .dj-tag{
    line-height: 1.4;
  }
  .app-upload-exe .el-form-item__label{
    font-family: "PingFang SC";
    color: #999;
  }
  .app-upload-exe .form-detail p{
    color: #999;
  }
  .app-upload-exe .form-detail p>span{
    font-family: "PingFang SC";
    font-size: 14px;
  }
  .app-upload-exe .line{
    vertical-align: top;
    color: #999;
  }
  .app-upload-exe .form-item-right{
    display: inline-block;
    width: 96%;
  }
  .app-upload-exe .form-item-right img{
    width: 136px;
    height: 200px;
    margin-left: 10px;
  }
  .app-upload-exe .apk-img-box{
    margin-left: -7px;
  }
</style>

