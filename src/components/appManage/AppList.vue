<template>
  <div class="page-model-upDown app-list" v-loading.fullscreen.lock="upLoading" element-loading-text="上传中,请稍等...">
    <div class="up" style="min-width: 1065px">
      <div class="tag-box">
        <div class="tag-title">
          <span>应用分类</span>
        </div>
        <div class="tag-arr">
          <label-list-search @childComClick="getData" :comProp="comProp"></label-list-search>
        </div>
      </div>
      <el-form class="app-list-search-form" :inline="true">
        <el-form-item label="应用状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="审核未通过" value="1"></el-option>
            <el-option label="已上架" value="2"></el-option>
            <el-option label="已下架" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入搜索内容" class="search-input" v-model="form.app_name"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="dj-btn dj-btn-warning" @click="searchData">查询</button>
          <span class="dj-sign-font" @click="resetForm">重置</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="dj-btn-group margin-bottom-10">
      <button type="button" class="dj-btn dj-btn-group-default" v-bind:class="{'btn-selectd':btnSelectd=='num'}" @click="getDataSort('num')">下载量<img v-bind:src="numSrc" class="btn-img-right"></button>
      <button type="button" class="dj-btn dj-btn-group-default" v-bind:class="{'btn-selectd':btnSelectd=='time'}" @click="getDataSort('time')">上传时间<img v-bind:src="timeSrc" class="btn-img-right"></button>
      <button type="button" class="dj-btn dj-btn-group-default" v-bind:class="{'btn-selectd':btnSelectd=='class'}" @click="getDataSort('class')">应用分类<img :src="classSrc" class="btn-img-right"></button>
      <!--<button type="button" class="dj-btn dj-btn-group-default">应用分类<img src="../../assets/downArrow2.png" class="btn-img-right"></button>-->
    </div>

    <div class="card-area" style="margin-left: -10px">
      <div class="card-box">
        <div class="img-box">
          <el-upload class="upload-demo"
                     :action="apkUploadUrl"
                     name="apk"
                     :show-file-list="false"
                     :before-upload="appUpBefore"
                     :on-success="goApkUpload"
                     :on-error="appUpError">
            <img src="../../assets/uploadAdd.png" alt="" style="border: none;">
          </el-upload>
        </div>
        <div class="content-box">
          <div class="descr-font">点击&拖拽安装包到此处上传应用</div>
        </div>
      </div><div class="card-box" v-for="item in thisPageData">
      <div class="img-box">
        <img :src="item.app_icon" alt="">
        <div class="card-icon">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-gengduo"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goDetail">详情</el-dropdown-item>
              <el-dropdown-item @click.native="delApp(item)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content-box">
        <div class="apk-name">{{item.apk_name}}</div>
        <div class="apk-tag-primary" v-if="item.new_unsigned_exists==false">已签名</div>
        <div class="apk-tag-danger" v-if="item.new_unsigned_exists==true">有未签名版本</div>
      </div>
      <div class="footer-box">
        <div class="opt-double" v-if="item.newName=='已下架' || item.newName=='已上架'">
          <img src="../../assets/updSign.png" class="xs-icon-img" alt="">
          <span>更新</span>
        </div>
        <div class="opt-double" v-if="item.newName=='已下架'">
          <img src="../../assets/shangjia.png" class="xs-icon-img" alt="">
          <span>上架</span>
        </div>
        <div class="opt-double" v-if="item.newName=='已上架'">
          <img src="../../assets/xiajia.png" class="xs-icon-img" alt="" @click="appDown(item)">
          <span @click="appDown(item)">下架</span>
        </div>
        <div class="state-font" v-if="item.newName=='未通过'">审核未通过</div>
        <div class="state-font" v-if="item.newName=='待审核'">待审核...</div>
      </div>
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
        <img class="margin-top-20" src="../../assets/noSearch.png" alt="">
      </div>
    </div>

    <el-dialog title="下架" :visible.sync="downModel" class="el-dialog-info" style="text-align: center;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="静默卸载" style="margin-bottom: 10px">
          <el-radio class="radio" v-model="radio" label="0">是</el-radio>
          <el-radio class="radio" v-model="radio" label="1">否</el-radio>
        </el-form-item>
      </el-form>
      <p>静默卸载会自动卸载已安装在设备上的此应用</p>
      <div slot="footer" class="dialog-footer">
        <button class="dj-btn dj-btn-primary" @click="sureAppDown">确定</button>
        <button class="dj-btn dj-btn-back margin-left-6" @click="downModel=false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import LabelListSearch from './components/LabelListSearch.vue'
  import * as api from '../../api/appApi'
  import {API} from '../../config'
  export default {
    name: 'AppList',
    created(){
      this.searchData();
    },
    components:{
      LabelListSearch
    },
    data(){
      return {
        numSrc: '../../static/img/downArrow2.png',
        timeSrc: '../../static/img/downArrow2.png',
        classSrc: '../../static/img/downArrow2.png',
        upLoading: false,
        apkUploadUrl: API + '/appVer/apkUpload',
        radio: '0',
        downAppId: '',
        downModel: false,
        btnSelectd: -1,
        //组件需要的数据
        comProp:{
          body:{
            api: '/category/index',
            page_size: 500
          },
          initState: 0,
          name: 'label_name'
        },
        comInit: {
          data: [],
          allState: true
        },
        form: {
          status: '',
          app_name: '',
          app_cat_id: [],
          page_size: '',
          currentPage: '',
          is_download_num_sort: '',
          is_upload_time_sort: '',
          is_app_cat_sort: ''
        },
        thisPageData: [],
        totalPage: 0,
        total: 0,
        currentPage: 1,
        pageSize: 20
      }
    },
    methods:{
      searchData(){
        let vm = this;
        vm.form.app_cat_id = [];
        if(vm.comInit.allState==false){
          vm.comInit.data.forEach(function(value,index,arr){
            if(value.selectd==true){
              vm.form.app_cat_id.push(value.id)
            }
          })
        }
        vm.form.page_size = vm.pageSize;
        vm.form.currentPage = vm.currentPage;
        api.getAppList(vm.form).then(resp=>{
          if(resp.data.code=='00000'){
            vm.thisPageData = resp.data.data.data;
            vm.total = resp.data.data.total;
            vm.totalPage = Math.ceil(resp.data.data.total/vm.pageSize);
            vm.thisPageData.forEach(function(val,index,arr){
              if(val.status_name.indexOf('待审核')!=-1){
                arr[index].newName = '待审核';
                arr[index].new_unsigned_exists = -1;
              }else if(val.status_name.indexOf('未通过')!=-1){
                arr[index].newName = '未通过';
                arr[index].new_unsigned_exists = -1;
              }else{
                arr[index].newName = val.status_name;
                arr[index].new_unsigned_exists = val.unsigned_exists;
              }
            });
          }
        });
      },
      resetForm(){
        let vm = this;
        vm.comProp.initState++;
        vm.form = {
          status: '',
          app_name: '',
          app_cat_id: [],
          page_size: '',
          currentPage: ''
        };
        vm.comInit = {
          data: [],
          allState: true
        };
      },
      //排序搜索
      getDataSort(item){
        let vm = this;
        if(vm.btnSelectd == item){
          return;
        }
        vm.btnSelectd = item;
        if(item=='num'){
          vm.numSrc = '../../static/img/downArrow1.png';
          vm.timeSrc = '../../static/img/downArrow2.png';
          vm.classSrc = '../../static/img/downArrow2.png';
          vm.form.is_download_num_sort = 1;
          vm.form.is_upload_time_sort = '';
          vm.form.is_app_cat_sort = '';
        }
        if(item=='time'){
          vm.numSrc = '../../static/img/downArrow2.png';
          vm.timeSrc = '../../static/img/downArrow1.png';
          vm.classSrc = '../../static/img/downArrow2.png';
          vm.form.is_download_num_sort = '';
          vm.form.is_upload_time_sort = 1;
          vm.form.is_app_cat_sort = '';
        }
        if(item=='class'){
          vm.numSrc = '../../static/img/downArrow2.png';
          vm.timeSrc = '../../static/img/downArrow2.png';
          vm.classSrc = '../../static/img/downArrow1.png';
          vm.form.is_download_num_sort = '';
          vm.form.is_upload_time_sort = '';
          vm.form.is_app_cat_sort = 1;
        }
        vm.searchData();
      },
      getData(data,allState){
        this.comInit.data = data;
        this.comInit.allState = allState;
      },
      //后端分页函数
      pageChanged(item){
        let vm = this;
        if(item=='prev'){
          if(vm.currentPage!=1){
            vm.currentPage--;
            vm.searchData();
          }
        }else if(item=='next'){
          if(vm.currentPage!=vm.totalPage){
            vm.currentPage++;
            vm.searchData();
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
        vm.searchData();
      },
      //上传
      appUpBefore(){
        this.upLoading = true;
      },
      goApkUpload(resp){
        this.upLoading = false;
        if(resp.code=='00000'){
          this.$message({
            type: 'success',
            message: '上传成功'
          });
          sessionStorage.setItem('apkInfo',JSON.stringify(resp.data));
          this.$router.push({ name: 'ApkUpload'});
        }else{
          this.$message.error("上传失败，" + resp.msg);
        }
      },
      appUpError(){
        this.upLoading = false;
        this.$message.error('上传失败，服务器出了点问题，请稍后重试');
      },
      //详情
      goDetail(){
        this.$router.push({path:'/AppDetail'})
      },
      //删除
      delApp(item){
        api.appDel({app_id:item.id}).then(resp=>{
          if(resp.data.code=='00000'){
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.searchData();
          }
        });
      },
      //下架
      appDown(item){
        this.downModel = true;
        this.downAppId = item.id;
      },
      sureAppDown(){
        api.appDown({app_id:this.downAppId,status:this.radio}).then(resp=>{
          if(resp.data.code=='00000'){
            this.$message({
              type: 'success',
              message: '下架成功'
            });
            this.searchData();
            this.downModel = false;
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .app-list{
  .btn-selectd{
    border: 1px solid #39a3fe;
    color: #39a3fe;
  }
  .dj-btn-group{
  button{
  img{
    margin-top: 2px;
  }
  }
  }
  .el-form-item{
    margin-bottom: 0;
  .search-input{
    width: 350px;
  }
  }
  .app-list-search-form{
  .el-form-item:last-child{
    float: right;
    margin-right: 0;
  }
  }
  .up{
    min-width: 950px;
    overflow: hidden;
  }
  .tag-box:after{
    display: block;
    content: " ";
    clear: both;
  }
  .tag-box{
    margin-bottom: 15px;
  .tag-title{
    float: left;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #48576a;
  }
  .tag-arr{
    float: left;
    width: 90%;
    margin-left: 7px;
  }
  .dj-tag{
    margin-bottom: 5px;
  }
  }
  .card-area{
    white-space: nowrap;
  .el-upload-list{
    margin: 0 20px;
  }
  }
  }
</style>
