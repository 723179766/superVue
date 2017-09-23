<!-- 应用详情-应用详情tab -->
<template>
	<div class="tab-tab-detail">

		<el-row :gutter="20">
    <el-col :span="2" :offset="22" style="margin-right: -20px; float: right">
      <el-button type="text" @click="edit" v-show="disabled">编辑<img src="../../../assets/edit.png" style="height: 12px"></el-button>
      <el-button type="text" @click="save" v-show="!disabled">保存<img src="../../../assets/save.png" style="height: 12px"></el-button>
    </el-col>
  </el-row>
    <div class="content-box">
      <el-form label-width="120px" class="form-detail">
        <el-form-item label="安装包" v-show="disabled">
          <button type="button" class="dj-btn dj-btn-icon-download" :href="formDetail.apk_download_url"><img class="apk-download-sign" src="../../../assets/downSign.png">&nbsp;&nbsp;下载</button>
        </el-form-item>
        <el-form-item label="图标" v-show="disabled">
          <div class="apk-img-icon margin-top-10 apk-img-box">
            <img :src="formDetail.app_icon" alt="">
          </div>
        </el-form-item>
        <el-form-item label="应用简介">
          <el-input type="textarea" v-model="formDetail.app_desc" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="版本说明">
          <el-input type="textarea" v-model="formDetail.version_desc" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="应用分类">
          <div v-show="!disabled" style="color:#999">(最多选三条)</div>
          <div class="form-item-right">
            <span class="dj-tag dj-tag-selectd" v-for="item in formDetail.app_cats" v-show="disabled">{{item.cats.category_name}}</span>
            <app-tag-list @childComClick="getData" :api="api" :initState="initState" v-show="!disabled"></app-tag-list>
          </div>
        </el-form-item>
        <el-form-item label="应用截图">
          <div style="color:#999">(竖版)</div>
          <div class="form-item-right margin-top-10 apk-img-box">
            <img :src="formDetail.app_img" v-show="formDetail.app_img" alt=""
            ><img :src="formDetail.app_img1" v-show="formDetail.app_img1" alt=""
            ><img :src="formDetail.app_img2" v-show="formDetail.app_img2" alt=""
            ><img :src="formDetail.app_img3" v-show="formDetail.app_img3" alt=""
            ><img :src="formDetail.app_img4" v-show="formDetail.app_img4" alt="">
            <div class="pic-content" v-show="!disabled">
              <el-upload class="avatar-uploader"
                         list-type="picture-card"
                         :action="upLoadUrl"
                         :data="uploadData"
                         :on-success="upSucc"
                         :on-remove="remove"
                         name="app_pic"
                         :disabled="picCount>4"
                         :before-upload="beforeAvatarUpload">
                <img src="../../../assets/uploadAddBig.png" alt="" class="my-upload-img">
                <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
	</div>
</template>
<script>
  import AppTagList from './AppTagList.vue'
  import axios from 'axios'
  import {API} from '../../../config'
	export default {
    data(){
      return {
        formDetail: {},
        disabled: true,
        //组件需要的数据
        api: '/category/index',
        initState: [{}],
        upLoadUrl:API+'/app/imgUpload',
        uploadData: {type: '1', app_screen_shot:''},
        picCount: 0,
        app_screen_shot_url: [],
        fileList:[],
        app_category:[],
        appId: '',
      }
    },
    components:{
      AppTagList
    },
    created(){
      this.appId = this.$route.query.appid
      this.getDetail(false)
    },
    methods:{
      getDetail(change) {
        let vm = this

        axios.get(API + '/app/' + vm.appId).then(function(resp){
          console.log(resp)
          vm.formDetail = resp.data.data
          vm.initState = resp.data.data.app_cats

          vm.app_category = []
          for (let i=0; i<vm.initState.length;i++) {
            vm.app_category.push(vm.initState[i].app_cat_id)
          }

          if (vm.formDetail.app_img != null) {
            vm.picCount++
          }
          if (vm.formDetail.app_img1 != null) {
            vm.picCount++
          }
          if (vm.formDetail.app_img2 != null) {
            vm.picCount++
          }
          if (vm.formDetail.app_img3 != null) {
            vm.picCount++
          }
          if (vm.formDetail.app_img4 != null) {
            vm.picCount++
          }
        }).then(function (resp) {
          if (change) {
            vm.disabled = true;
          }
        });
      },
      upSucc(resp, file, fileList){
        let vm = this
        vm.picCount++
        vm.fileList = fileList
        console.log('123', fileList)
      },
      remove(file, fileList){
        let vm = this
        vm.fileList = fileList
        vm.picCount--
        _.pull(vm.modelInfo.pic_array,file.response.data)
      },
      beforeAvatarUpload(file) {
        const isImgType = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt200K = file.size / 1024 / 1024 < 0.196;

        this.uploadData.app_screen_shot = file

        if (!isImgType) {
          this.$message.error('上传LOGO图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt200K) {
          this.$message.error('上传头像图片大小不能超过 200KB!');
        }
        return isImgType && isLt200K;
      },
      goBack() {
        this.$router.go(-1)
      },
      edit() {
        this.disabled = false;
      },
      save() {
        let vm = this

        vm.app_screen_shot_url = []
        if (vm.formDetail.app_img != null) {
          vm.app_screen_shot_url.push(vm.formDetail.app_img)
        }
        if (vm.formDetail.app_img1 != null) {
          vm.app_screen_shot_url.push(vm.formDetail.app_img1)
        }
        if (vm.formDetail.app_img2 != null) {
          vm.app_screen_shot_url.push(vm.formDetail.app_img2)
        }
        if (vm.formDetail.app_img3 != null) {
          vm.app_screen_shot_url.push(vm.formDetail.app_img3)
        }
        if (vm.formDetail.app_img4 != null) {
          vm.app_screen_shot_url.push(vm.formDetail.app_img4)
        }

        for (let i=0; i<vm.fileList.length; i++) {
          vm.app_screen_shot_url.push(vm.fileList[i])
        }


        axios.put(API+'/app', {
          id: vm.appId,
          app_screen_shot_url:vm.app_screen_shot_url,
          app_desc:vm.formDetail.app_desc,
          apk_ver_desc:vm.formDetail.version_desc,
          app_category: vm.app_category,
        }).then(function (resp) {
          vm.getDetail(true)
        })
      },
      getData(data) {
        let vm = this
        vm.app_category = []
        for (let i=0; i<data.length;i++) {
          if (data[i].selectd == true) {
            vm.app_category.push(data[i].id)
          }
        }
      },
    }
	}
</script>
<style lang='scss'>
  .tab-tab-detail {
    .my-upload-img{
      margin-left: 0 !important;
    }
    .pic-content {
      width:136px !important;
      height:200px !important;
      display: inline;
      margin-left: -3px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width:136px;
      height:200px;
      margin: 0 0 0 10px !important;
    }
    .el-upload-list__item-actions{
      width:136px;
      height:200px;
    }

    .el-upload-list__item-thumbnail{
      margin-left: 0px !important;
    }
    .avatar-uploader {
      display: inline;
    }
    .el-upload--picture-card {
      margin: 0 0 0 10px !important;
      width:136px !important;
      height:200px !important;
      border: 0px !important;
    }
    .form-detail .el-form-item__label{
      color: #666;
    }
    .apk-download-sign {
      width: 20px;
      height: 20px;
    }
  }
</style>
