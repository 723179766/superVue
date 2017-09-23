<!-- 应用详情-版本管理tab -->
<template>
	<div class="app-tab-vmanage">
    <div class="down margin-bottom-15 app-tab-layout">
      <div class="btn-opt-area">
        <button class="dj-btn dj-btn-default" @click="upload">上传新版本</button>
        <button class="dj-btn dj-btn-primary margin-left-6" @click="sign" :disabled="selectd==-1">签名</button>
        <button class="dj-btn dj-btn-danger margin-left-6" @click="del" :disabled="selectd==-1">删除</button>
      </div>
      <div v-show="thisPageData.length!=0" class="table-area">
        <table class="dj-table app-tab-table">
          <thead>
          <tr>
            <th class="md-width">版本号</th>
            <th>更新日期</th>
            <th>版本状态</th>
            <th>已安装设备</th>
            <th>下载次数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in thisPageData.data" @click="trClick(item,index)" v-bind:class="{'border-orange':selectd==index}">

            <td class="font-pfsc">{{item.version_code}}</td>
            <td class="font-arial">{{item.updated_at}}</td>
            <td class="font-pfsc">{{item.status}}</td>
            <td class="font-arial">{{item.terms_count}}</td>
            <td class="font-pfsc">{{item.download_num}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-show="thisPageData.length!=0" class="dj-page text-right">
        <span class="prev-page" @click="pageChanged('prev')">&lt;&nbsp;上一页</span>
        <span>第</span>
        <input type="number" class="dj-page-input" v-model="currentPage" v-on:keyup.enter="jumpPage">
        <span>页</span>
        <span class="total-page">共{{totalPage}}页</span>
        <span class="next-page" @click="pageChanged('next')">下一页&nbsp;&gt;</span>
        <span class="total-num">共{{total}}条记录</span>
      </div>
      <div v-show="thisPageData.length==0" class="text-center">
        <img class="margin-top-20" src="../../../assets/noSearch.png" alt="">
      </div>
    </div>

    <el-dialog title="上传" :visible.sync="importModel" class="el-dialog-primary">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="新版本">
          <el-upload class="upload-demo" style="display: inline-block"
                     name="apk"
                     :action="apkUploadUrl"
                     :show-file-list="false"
                     :before-upload="appUpBefore"
                     :on-success="appUpSucc"
                     :on-error="appUpError">
            <button type="button" class="dj-btn dj-btn-default"><i class="el-icon-upload2 icon-left"></i>上传</button>
          </el-upload>

        </el-form-item>
        <div class="app-v-tip">111</div>
        <el-form-item label="版本说明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="dj-btn dj-btn-primary" @click="importModel=false">确定</button>
      </div>
    </el-dialog>
	</div>
</template>
<script>
  import axios from 'axios'
  import {API} from '../../../config'
	export default {
    data() {
      return {
        thisPageData: [],
        thisRowData: null,
        totalPage: 0,
        total: 0,
        currentPage: 1,
        pageSize: 2,

        importModel: false,
        upLoadUrl: '',
        fileList: [],
        token:{
          Authorization: ''
        },
        uploadState: false,
        uploadTotal: '',
        errorTotal: '',
        form: {
            desc: '',
        },
        apkUploadUrl: '',
        selectd: -1,
        appInfo: {
          apkSrc: '',
          apkSize: '',
          name: '',
          packName: '',
          apkVer: '',
          apkLogo: '',
          apkNote: '',
          verNote: '',
          labelArr: []
        },
      }
    },
    created(){
      this.getVerData();
      this.apkUploadUrl = API + '/appVer/apkUpload'
    },
    methods:{
      getVerData(){
        let vm = this
        axios.post(API + '/appVer?page=' + vm.currentPage, {
          app_id: vm.$route.query.appid,
          page_size: vm.pageSize
        }).then(function (res) {
          vm.thisPageData = res.data.data
          vm.total = res.data.data.total;
          vm.totalPage = Math.ceil(res.data.data.total/vm.pageSize);
        })
      },
      uploadApk(){

      },
      //apk上传
      appUpBefore(){
        this.upLoading = true;
      },
      appUpSucc(){
        this.upLoading = false;
        this.$message({
          type: 'success',
          message: '上传成功'
        });
        console.log('完成')
      },
      appUpError(){
        this.upLoading = false;
        this.$message.error('上传失败，服务器出了点问题，请稍后重试');
      },
      //后端分页函数
      pageChanged(item){
        let vm = this;
        if(item=='prev'){
          if(this.currentPage!=1){
            this.thisRowData = null;
            this.selectd = -1;
            this.currentPage--;
            vm.getVerData();
          }
        }else if(item=='next'){
          if(this.currentPage!=this.totalPage){
            this.thisRowData = null;
            this.selectd = -1;
            this.currentPage++;
            vm.getVerData();
          }
        }
      },
      jumpPage(){
        let vm = this;
        if(vm.currentPage==''){
          vm.$message({
            message: '请输入页数',
            type: 'warning'
          });
          return;
        }
        vm.currentPage = parseInt(vm.currentPage);
        if(vm.currentPage>vm.totalPage){
          vm.currentPage = vm.totalPage;
        }
        vm.thisRowData = null;
        vm.selectd = -1;
        vm.getVerData();
      },
      upload() {
        this.importModel = true
      },
      trClick(item,index){
        this.selectd = index;
        this.thisRowData = item;
      },
      sign () {
        axios.post(API + '/appVer/apkSign', {
          app_ver_id: this.thisRowData.version_code
        }).then(function (res) {
          console.log('sign', res)
        })
      },
      del(){
        axios.delete(API + '/appVer', {
          app_ver_id: this.thisRowData.version_code
        }).then(function (res) {
          console.log('sign', res)
        })
      },
    }
	}
</script>
<style lang='scss'>
  .app-tab-vmanage{
    .app-tab-layout{
      margin: 20px 0 0 30px;
    }
    .app-tab-table{
      margin-top: 20px;
    }
    .app-v-tip{
      border: 1px;
      margin-bottom: 10px;
      width:380px;
      background: rgb(245,245,245);
      margin-left: 80px;
    }
    .el-form-item{
      margin-bottom: 5px !important;
    }
  }
</style>
