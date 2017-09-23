<!-- 新增厂商 -->
<template>
  <div class="apk-upload" v-loading.fullscreen.lock="upLoading" element-loading-text="上传中,请稍等...">
    <el-form class="container">
      <div class="header">
        <span class="tip"></span>
        <span class="title">上传应用</span>
      </div>
      <el-row class="info-wrap">
				<span class="title">
					安装包
				</span>
        <el-form-item style="width: 750px">
          <el-upload class="upload-demo" style="display: inline-block"
                     :action="apkUploadUrl"
                     name="apk"
                     :show-file-list="false"
                     :before-upload="appUpBefore"
                     :on-success="appUpSucc"
                     :on-error="appUpError">
            <button type="button" class="dj-btn dj-btn-icon-download"><i class="el-icon-upload2 icon-left"></i>重新上传</button>
          </el-upload>
          <span class="margin-left-10">路径：</span><span>{{appInfo.apkSrc}}</span>
          <span class="margin-left-10">大小：</span><span>{{appInfo.apkSize}}</span>
        </el-form-item>
      </el-row>
      <el-row class="info-wrap">
				<span class="title">
					应用名
				</span>
        <el-form-item>
          <el-input v-model="appInfo.name" placeholder="请输入应用名" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row class="info-wrap">
				<span class="title">
					包名
				</span>
        <el-form-item>
          <el-input v-model="appInfo.packName" placeholder="请输入包名" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row class="info-wrap">
				<span class="title">
					版本号
				</span>
        <el-form-item>
          <el-input v-model="appInfo.apkVer" placeholder="请输入版本号" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row class="info-wrap">
				<span class="title">
					图标
				</span>
				<span class="content show-ellipsis">
					(大小：不大于150KB，建议尺寸：144像素*144像素，图片格式：PNG)
				</span>
      </el-row>
      <div class="pic-content">
        <el-upload class="avatar-uploader"
                   :action="logoImgUpdUrl"
                   :on-success="logoUpSucc"
                   :data="logoData"
                   name="app_icon"
                   :show-file-list="false">
          <img v-if="appInfo.apkLogo" :src="logoImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-row class="info-wrap">
				<span class="title">
					应用简介
				</span>
        <el-form-item style="width: 876px">
          <el-input class="note" v-model="appInfo.apkNote" type="textarea"  :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入应用简介"></el-input>
        </el-form-item>
      </el-row>
      <el-row class="info-wrap">
				<span class="title">
					版本说明
				</span>
        <el-form-item style="width: 876px">
          <el-input class="note" v-model="appInfo.verNote" type="textarea"  :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入版本说明"></el-input>
        </el-form-item>
      </el-row>
      <el-row class="info-wrap">
				<span class="title">
					应用分类
				</span>
				<span class="content show-ellipsis">
					(最多选三类)
				</span>
      </el-row>
      <div class="pic-content">
        <div class="tag-arr">
          <span class="dj-tag margin-bottom-3" v-for="item in appInfo.labelArr" @click="labelClick(item)" v-bind:class="{'dj-tag-selectd':item.selectd==true}">{{item.category_name}}</span>
        </div>
      </div>
      <el-row class="info-wrap" style="margin-top: 20px;">
				<span class="title">
					截图
				</span>
				<span class="content show-ellipsis">
					(大小：单张不大于200KB，建议尺寸：854像素*480像素，图片格式：PNG，上传数量为2-5张)
				</span>
      </el-row>
      <div class="pic-content">
        <el-upload class="avatar-uploader"
                   list-type="picture-card"
                   :action="shortImgUpdUrl"
                   name="app_screen_shot"
                   :data="shortData"
                   :on-success="shortImgUpSucc"
                   :on-remove="shortImgRemove"
                   :before-upload="shortImgUpBefore"
                   :disabled="modelInfo.pic_array.length>4">
          <img src="../../assets/uploadAddBig.png" alt="">
        </el-upload>
      </div>
    </el-form>
    <div class="text-center margin-top-15">
      <button class="dj-btn dj-btn-primary" @click="subAppForm">确定</button>
      <button class="dj-btn dj-btn-back margin-left-6" @click="back">取消</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '../../api/appApi'
  import {API} from '../../config'
  export default {
    name: 'apk-upload',
    created(){
      let vm = this;
      api.getAppClassList({page_size: 500}).then(resp=>{
        if(resp.data.code=='00000'){
          vm.appInfo.labelArr = resp.data.data.data;
          for(let i=0;i<vm.appInfo.labelArr.length;i++){
            vm.$set(vm.appInfo.labelArr[i],"selectd",false);
          }
        }
      });
      if(sessionStorage.getItem('apkInfo')){
        let apkINfo = JSON.parse(sessionStorage.getItem('apkInfo'));
        vm.appInfo.apkSrc = apkINfo.apk_url;
        vm.appInfo.apkSize = apkINfo.apk_size;
        vm.appInfo.name = apkINfo.label;
        vm.appInfo.packName = apkINfo.package_name;
        vm.appInfo.apkVer = apkINfo.version;
        api.getApkIcon({icon_name: apkINfo.icon_name}).then(resp=>{
          if(resp.data.code=='00000'){
            vm.logoImageUrl = resp.data.data.apk_icon_url;
            vm.app_icon_url = resp.data.data.apk_icon_url;
            vm.appInfo.apkLogo = true;
          }else{
            vm.$message.error('APK图标解析失败，请手动上传APK图标');
          }
        });
      }else{
        vm.$message({
          type: 'warning',
          message: '请上传APP文件'
        });
      }
    },
    data(){
      return {
        upLoading: false,
        apkUploadUrl: API + '/appVer/apkUpload',
        logoImgUpdUrl: API + '/app/imgUpload',
        logoImageUrl: '',
        app_icon_url: '',
        logoData: {
          type: '0'
        },
        shortImgUpdUrl: API + '/app/imgUpload',
        shortData: {
          type: '1'
        },
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
        modelInfo:{
          pic_array:[]
        }
      }
    },
    methods:{
      appUpBefore(){
        this.upLoading = true;
      },
      appUpSucc(resp, file, fileList){
        let vm = this;
        vm.upLoading = false;
        if(resp.code=='00000'){
          vm.appInfo.apkSrc = resp.data.apk_url;
          vm.appInfo.apkSize = resp.data.apk_size;
          vm.appInfo.name = resp.data.label;
          vm.appInfo.packName = resp.data.package_name;
          vm.appInfo.apkVer = resp.data.version;
          api.getApkIcon({icon_name: resp.data.icon_name}).then(resp=>{
            if(resp.data.code=='00000'){
              vm.logoImageUrl = resp.data.data.apk_icon_url;
              vm.app_icon_url = resp.data.data.apk_icon_url;
              vm.appInfo.apkLogo = true;
            }else{
              vm.$message.error('APK图标解析失败，请手动上传APK图标');
            }
          });
          vm.$message({
            type: 'success',
            message: '上传成功'
          });
        }else{
          vm.$message.error('上传失败，服务器出了点问题，请稍后重试');
        }
      },
      appUpError(){
        this.upLoading = false;
        this.$message.error('上传失败，服务器出了点问题，请稍后重试');
      },
      logoUpSucc(resp, file, fileList){
        if(resp.code=='00000'){
          this.logoImageUrl = URL.createObjectURL(file.raw);
          this.app_icon_url = resp.data;
          this.appInfo.apkLogo = true;
        }else{
          this.$message.error(resp.msg);
        }
      },
      shortImgUpBefore(file) {
        const isImgType = file.type === 'image/png';
        const isLt200K = file.size / 1024 / 1024 < 0.196;
        if (!isImgType) {
          this.$message.error('截图只能是 PNG 格式!');
        }
        if (!isLt200K) {
          this.$message.error('截图大小不能超过 200KB!');
        }
        return isImgType && isLt200K;
      },
      shortImgUpSucc(resp, file, fileList){
        if(resp.code=='00000'){
          this.modelInfo.pic_array.push(resp.data);
        }else{
          this.$message.error(resp.msg);
        }
      },
      shortImgRemove(file, fileList){
        let vm = this;
        _.pull(vm.modelInfo.pic_array,file.response.data)
      },
      labelClick(item){
        let vm = this,num = 0;
        vm.appInfo.labelArr.forEach(function(val,index,arr){
          if(val.selectd==true){
            num++
          }
        });
        if(num==3){
          if(item.selectd==true){
            item.selectd = !item.selectd;
          }else{
            vm.$message.error('最多只能选择三个分类');
          }
        }else{
          item.selectd = !item.selectd;
        }
      },
      subAppForm(){
        let vm = this,subData,categoryArr = [],shotImgArr = [],app_icon_url = '';
        vm.appInfo.labelArr.forEach(function(val,index,arr){
          if(val.selectd==true){
            categoryArr.push(val.id);
          }
        });
        vm.modelInfo.pic_array.forEach(function(val,index,arr){
          shotImgArr.push(val);
        });
        if(vm.app_icon_url==''){
          this.$message.error('apk 图标没有解析到，请手动上传');
          return;
        }
        if(vm.app_icon_url.indexOf('http')==-1){
          vm.app_icon_url = API.slice(0,API.length-3) + vm.app_icon_url;
        }
        subData = {
          apk_url: vm.appInfo.apkSrc,
          app_icon_url: vm.app_icon_url,
          app_name: vm.appInfo.name,
          apk_name: vm.appInfo.packName,
          apk_size: vm.appInfo.apkSize,
          apk_ver: vm.appInfo.apkVer,
          app_desc: vm.appInfo.apkNote,
          apk_ver_desc: vm.appInfo.verNote,
          app_category: categoryArr,
          app_screen_shot: shotImgArr
        };
        console.log(subData);
        return;
        api.appUpload(subData).then(resp=>{
          if(resp.data.code=='00000'){
            this.$message({
              type: 'success',
              message: 'apk上传成功'
            });
            this.$router.push({ name: 'AppList'});
          }
        });
      },
      back(){
        this.$confirm('此操作将返回首页，之前的数据不会有所保留, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({name:'AppList'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    },
    beforeDestroy(){
      sessionStorage.removeItem('apkInfo');
    }
  }
</script>
<style lang='scss'>
  .apk-upload{
    padding: 10px;
  .el-form-item{
    margin-bottom: 0;
    display: inline-block;
    width: 298px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .container{
    min-width: 950px;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px 30px 35px;
  .header{
    position: relative;
  .tip{
    position: absolute;
    display: inline-block;
    width: 5px;
    height: 24px;
    background-color: #3aa5ff;
  }
  .title{
    padding-left: 15px;
    font-size: 16px;
    color: #333;
  }
  }
  .info-wrap{
    margin-top: 22px;
    min-width: 500px;
    display: flex;
  .title{
    line-height: 36px;
    text-align: right;
    padding-left: 18px;
    padding-right: 20px;
    width: 98px;
    display: inline-block;
  }
  .content{
    line-height: 36px;
    font-size: 14px;
    color: #aaa;
    min-width: 400px;
    flex: 1;
  }
  .note{
    width: 100%;
    height: 80px;
  }
  }
  .pic-content{
    margin-left: 100px;
  .tag-arr{
    margin-left: -5px;
  }
  .el-upload-list__item{
    width: 148px;
    height: 230px;
    margin: 0 10px 10px 0;
  }
  .el-upload--picture-card{
    width: 148px;
    height: 230px;
    border: none;
  >img{
     width: 100%;
     height: 100%;
   }
  }
  }
  }
  }
</style>
