<template>
  <div class="page-model-upDown app-audit">
    <div class="up" style="min-width: 1065px">
      <div class="tag-box">
        <div class="tag-title">
          <span>应用分类</span>
        </div>
        <div class="tag-arr">
          <label-list-search @childComClick="getData" :comProp="comProp"></label-list-search>
        </div>
      </div>
      <el-form :inline="true">
        <el-form-item label="审核状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="审核未通过" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.app_name" placeholder="请输入搜索内容" class="search-input"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="dj-btn dj-btn-warning" @click="searchData">查询</button>
          <span class="dj-sign-font" @click="resetForm">重置</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="card-area" style="margin-left: -10px">
      <div class="card-box" v-for="item in thisPageData">
        <div class="img-box">
          <img :src="item.app_icon" alt="">
        </div>
        <div class="content-box">
          <div class="apk-name">{{item.app_name}}</div>
          <div v-bind:class="{'apk-tag-danger':item.status==1}" v-if="item.status==1">审核未通过</div>
        </div>
        <div class="footer-box">
          <div class="opt-sign">
            <img src="../../assets/check.png" class="xs-icon-img" alt="" v-if="item.status==0" @click="goExamine(item)">
            <span v-if="item.status==0" @click="goExamine(item)">审核</span>

            <img src="../../assets/lookSign.png" class="xs-icon-img" alt="" v-if="item.status==1" @click="goExamine(item)">
            <span v-if="item.status==1" @click="goExamine(item)">查看</span>
          </div>
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
  </div>
</template>
<script type="text/ecmascript-6">
  import LabelListSearch from './components/LabelListSearch.vue'
  import * as api from '../../api/appApi'
  export default {
    name: 'AppAudit',
    created(){
      this.searchData();
    },
    components:{
      LabelListSearch
    },
    data(){
      return {
        comProp: {
          body: {
            api: '/category/index',
            page_size: 500
          },
          initState: 0,
          name: 'category_name'
        },
        comInit: {
          data: [],
          allState: true
        },
        form: {
          status: '',
          app_name: '',
          category: [],
          page_size: '',
          currentPage: ''
        },
        thisPageData: [],
        totalPage: 0,
        total: 0,
        currentPage: 1,
        pageSize: 5
      }
    },
    methods:{
      searchData(){
        let vm = this;
        vm.form.category = [];
        if(vm.comInit.allState==false){
          vm.comInit.data.forEach(function(value,index,arr){
            if(value.selectd==true){
              vm.form.category.push(value.id)
            }
          })
        }
        vm.form.page_size = vm.pageSize;
        vm.form.currentPage = vm.currentPage;
        api.getAppAuditList(vm.form).then(resp=>{
          if(resp.data.code=='00000'){
            vm.thisPageData = resp.data.data.data;
            vm.total = resp.data.data.total;
            vm.totalPage = Math.ceil(resp.data.data.total/vm.pageSize);
          }
        });
      },
      resetForm(){
        let vm = this;
        vm.comProp.initState++;
        vm.form = {
          status: '',
          app_name: '',
          category: [],
          page_size: '',
          currentPage: ''
        };
        vm.comInit = {
          data: [],
          allState: true
        };
      },
      goExamine(item){
        this.$router.push({name: 'AppDetailExe',params:{appId: item.id,appState: item.status}});
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
      }
    }
  }
</script>
<style lang="scss">
  .app-audit{
  .el-form-item{
    margin-right: 30px;
    margin-bottom: 0;
  .search-input{
    width: 350px;
  }
  }
  .el-form-item:last-child{
    float: right;
    margin-right: 0;
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
    white-space:nowrap;
  }
  }
</style>
