<!-- 应用详情-设备列表tab -->
<template>
  <div class="page-model-upDown device-info" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="查询中，请稍等...">
    <div class="up">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="机构">
          <el-cascader
            :options="getOrgData"
            :props="props"
            v-model="orgArrData"
            change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="选择厂商">
          <el-select v-model="form.provider" @change="getDevNoArr(form.provider)">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in providerArr"
              :key="item.id"
              :label="item.provider_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号">
          <el-select v-model="form.devNo" placeholder="请选择厂商">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in devNoArr"
              :key="item.id"
              :label="item.term_model_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装版本">
          <el-select v-model="form.version">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in verArr"
              :key="item.id"
              :label="item.version_code"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="tag-box">
        <div class="tag-title">
          <span>设备标签</span>
        </div>
        <div class="tag-arr">
          <span class="dj-tag" @click="labelAllClick()" v-bind:class="{'dj-tag-selectd':selectdAll==true}">全部</span><span class="dj-tag" v-for="item in thisTag" @click="labelClick(item)" v-bind:class="{'dj-tag-selectd':item.selectd==true}">{{item.label_name}}</span>
          <span class="dj-sign-font" v-show="moreFlag" @click="showMore">更多 <i class="el-icon-caret-right"></i></span>
          <span class="dj-sign-font" v-show="!moreFlag" @click="showMore">收起 <i class="el-icon-caret-left"></i></span>
        </div>
        <div class="search-box">
            <el-input v-model="form.input" placeholder="请输入搜索内容" class="dlist-search-input"></el-input>
            <button type="button" class="dj-btn dj-btn-warning" @click="search">查询</button>
            <span class="dj-sign-font" @click="resetData">重置</span>
        </div>
      </div>
    </div>
    <div style="height: 10px; background: #F5F5F5;"></div>
    <div class="down">

      <div v-show="thisPageData.length!=0" class="table-area">
        <table class="dj-table">
          <thead>
          <tr>
            <th class="md-width">SN号</th>
            <th>设备序号</th>
            <th>厂商名称</th>
            <th>设备型号</th>
            <th>所属机构</th>
            <th>安装版本</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in thisPageData" @click="trClick(item,index)" v-bind:class="{'border-orange':selectd==index}">
            <td class="font-pfsc">{{item.term_id}}</td>
            <td class="font-arial">{{item.serial_number}}</td>
            <td class="font-pfsc">{{item.abbreviation}}</td>
            <td class="font-arial">{{item.term_model_name}}</td>
            <td class="font-pfsc">{{item.org_name}}</td>
            <td class="font-arial">{{item.version_code}}</td>
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

  </div>
</template>
<script>
  import axios from 'axios'
  import {API} from '../../../config'
	export default {
    created(){
      let vm = this;
      axios.post(API + '/termLabel').then(function(resp){       //获取设备标签列表
        if(resp.data.code=='00000'){
          vm.tagAll = resp.data.data;
          for(let i=0;i<vm.tagAll.length;i++){
            vm.$set(vm.tagAll[i],"selectd",false);
          }
          let halfLen = Math.floor(vm.tagAll.length/2);
          for(let i=0;i<halfLen;i++){
            vm.tagFold.push(vm.tagAll[i]);
          }
          vm.thisTag = vm.tagFold;
        }
      });
      axios.get(API + '/provider/getAllProvider').then(function(resp){
        if(resp.data.code=='00000'){
          vm.providerArr = resp.data.data;
        }
      });
      let token = JSON.parse(sessionStorage.getItem('userInfo')).token;
      this.token.Authorization = 'Bearer'+' '+token;

      axios.post(API + '/app/version_id', {
        app_id: this.$route.query.appid,
        status: 0,
      }).then(function (res) {
        vm.verArr = res.data.data
      })
    },
    data(){
      return {
        fullscreenLoading: false,
        token:{
          Authorization: ''
        },
        upLoadUrl: API + '/terminal/import',
        step: 1,
        uploadState: false,
        uploadTotal: '',
        errorTotal: '',
        importModel: false,
        getOrgData: [],
        orgArrData: [],
        props: {
          value: 'id',
          label: 'org_name',
          children: 'children'
        },
        providerArr: [],
        devNoArr: [],
        verArr: [],
        form: {
          provider: '',
          devNo: '',
          version: '',
          input: '',
        },
        selectdAll: true,
        moreFlag: true,
        tagAll: [],
        tagFold: [],
        thisTag: [],
        selectd: -1,
        thisPageData: [],
        thisRowData: null,
        totalPage: 0,
        total: 0,
        currentPage: 1,
        pageSize: 2,
        fileList: [],
        searchBeiFen: {
          orgId: '',
          form: '',
          tagArr: ''
        }
      }
    },
    methods:{
      getDevNoArr(item){
        if(item==''){    //重置需要
          return;
        }
        let vm = this;
        vm.form.devNo = '';
        axios.get(API + '/provider/getAllTermModel/' + item).then(function(resp){
          if(resp.data.code=='00000'){
            vm.devNoArr = resp.data.data;
          }
        });
      },
      labelClick(item){
        item.selectd = !item.selectd;
        this.selectdAll = false;
      },
      labelAllClick(){
        this.selectdAll = !this.selectdAll;
      },
      showMore(){
        if(this.moreFlag==true){
          this.moreFlag = false;
          this.thisTag = this.tagAll;
        }else{
          this.moreFlag = true;
          this.thisTag = this.tagFold;
        }
      },
      search(){
        let tagArr = [],orgId = '';
        if(this.selectdAll==true){
          tagArr = [];
        }else{
          for(let i=0;i<this.tagAll.length;i++){
            if(this.tagAll[i].selectd==true){
              tagArr.push(this.tagAll[i].id);
            }
          }
        }
        if(this.orgArrData.length==0){
          orgId = this.getUserOrgId();
        }else{
          orgId = this.orgArrData[this.orgArrData.length-1];
        }
        this.currentPage = 1;
        this.initTable(orgId,this.form,tagArr);
      },
      resetData(){
        this.orgArrData = [];
        this.form = {
          provider: '',
          devNo: '',
          version: '',
          input: '',
        };
        this.selectdAll = true;
        for(let i=0;i<this.tagAll.length;i++){
          this.tagAll[i].selectd = false;
        }
      },
      trClick(item,index){
        this.selectd = index;
        this.thisRowData = item;
      },
      goDeviceDetail(item){
        this.$router.push({ name: 'DeviceInfoDetail',params:{id: item}});
      },
      //查询表格数据
      initTable(orgId,form,tagArr){
        this.fullscreenLoading = true;
        axios({
          method: 'post',
          url: API + '/app/term_list?page=' + this.currentPage,
          data: {
            app_id: this.$route.query.appid,
            org_id: orgId,
            provider_id: form.provider,
            term_model_id: form.devNo,
            version_id: form.version,
            labels: tagArr,
            page_size: this.pageSize
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            this.thisPageData = resp.data.data.data;
            this.total = resp.data.data.total;
            this.totalPage = Math.ceil(resp.data.data.total/this.pageSize);
            this.searchBeiFen = {
              orgId: orgId,
              form: form,
              tagArr: tagArr
            };
            this.fullscreenLoading = false;
          }
        }).catch(() => {
          this.fullscreenLoading = false;
        });
      },
      //初始化机构树
      initOrgTree(){
        let orgId = this.getUserOrgId(),vm = this;
        axios.get(API + '/organization/getOrgTree/' + orgId).then(function (response){
          if(response.data.code=='00000'){
            //饿了么组件数据格式需要，删除children长度0的属性
            function delProp(data){
              for(let i=0;i<data.length;i++){
                if(data[i].children.length!=0){
                  delProp(data[i].children);
                }else{
                  delete data[i].children;
                }
              }
              return data;             //递归的return，注意调试
            }
            vm.getOrgData = delProp(response.data.data);
          }
        });
      },
      //后端分页函数
          pageChanged(item){
            let vm = this;
            if(item=='prev'){
              if(this.currentPage!=1){
                this.thisRowData = null;
                this.selectd = -1;
                this.currentPage--;
                vm.initTable(vm.searchBeiFen.orgId,vm.searchBeiFen.form,vm.searchBeiFen.tagArr);
              }
            }else if(item=='next'){
              if(this.currentPage!=this.totalPage){
                this.thisRowData = null;
                this.selectd = -1;
                this.currentPage++;
                vm.initTable(vm.searchBeiFen.orgId,vm.searchBeiFen.form,vm.searchBeiFen.tagArr);
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
        vm.initTable(vm.searchBeiFen.orgId,vm.searchBeiFen.form,vm.searchBeiFen.tagArr);
      }
    },
    mounted(){
      this.initOrgTree();
    }
	}
</script>
<style lang='scss'>
  .device-info .upload-font{
    color: #39a3fe;
    cursor: pointer;
  }
  .device-info .el-form-item{
    margin-right: 30px;
  }
  .device-info  .el-form-item:last-child{
    margin-right: 0;
  }
  .device-info  .tag-box:after{
    display: block;
    content: " ";
    clear: both;
  }
  .device-info  .tag-box>.tag-title{
    float: left;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #48576a;
  }
  .device-info  .tag-box>.tag-arr{
    float: left;
    width: 50%;
    margin-left: 7px;
  }
  .device-info  .tag-box>.search-box{
    float: right;
    width: 40%;
    text-align: right;
  }
  .device-info  .tag-box .dj-tag{
    margin-bottom: 5px;
  }
  .up {
    margin-bottom: 0px !important;
    border-top: 0px !important;
  }
  .dlist-search-input {
    width: 200px;
  }
  .el-tabs__content{
    border-left-width: 0px !important;
    border-right-width: 0px !important;
  }
</style>
