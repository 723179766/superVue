<template>
  <div id="ModelDetail">
    <div class="headRow">
      <div class="dev-logo">
        <img width="100%" :src="data.logo">
      </div>
      <div class="dev-title">
        <div class="headTitle">{{data.term_model_name}}</div>
        <div v-if="_provider" class="headP">所属厂商 | {{_provider.provider_name}}</div>
      </div>
    </div>
    <div class="bodyBack">
      <div class="bodyContent">
        <el-tabs type="border-card" :class="{'d-base-info':activeName=='baseinfo'}" :active-name="activeName"  @tab-click="changeTab">
          <el-tab-pane label="基本信息" name="baseinfo">
            <div class="margin-bottom-10">
              <img src="../../assets/img-show.png" alt="" class="icon-img"><span class="bodyLabelText">设备图</span>
            </div>
            <div class="bodyImage-box">
              <div class="bodyImage" v-for="(image,index) in images" v-bind:class="{'clear-margin-left':index==0}">
                <img :src="image">
              </div>
            </div>
            <div class="margin-bottom-10 margin-top-10">
              <img src="../../assets/pro_info.png" alt="" class="icon-img"><span class="bodyLabelText">产品参数
                <el-button type="text" @click="editParams" v-if="display"><span class="edit-font">修改</span><img src="../../assets/edit.png" class="icon-img" alt="">
                </el-button>
                <el-button type="text" @click="saveParams" v-else><span class="edit-font">保存</span><img src="../../assets/save.png" class="icon-img" alt="">
                </el-button>
              </span>
            </div>

            <div v-if="display">
              <div class="bodyParam" v-for="param in data.term_model_params" :title="param.param_value">
                {{param.param_key}}:{{param.param_value}}
              </div>
            </div>
            <div v-else class="form-box">
              <form>
                <div class="formTitle">
                  <div class="input-title">设备参数</div>
                  <div class="input-title">参数详情</div>
                </div>
                <div v-for="(param, index) in data.term_model_params" v-bind:class="{'margin-top-10':index==0,'margin-top-20':index!=0}">
                  <input class="dj-input inputKey" v-model=param.param_key>
                  <input class="dj-input inputValue" v-model=param.param_value>
                  <el-button :plain="true" type="danger" class="dangerButton" @click="deleteParam(index)">
                    <div class="dangerText">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-minus"></i>&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  </el-button>
                  <el-button v-if="index+1==data.term_model_params.length" :plain="true" type="success" class="successButton" @click="addParam">
                    <div class="successText">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-plus"></i>&nbsp;&nbsp;添加&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </el-button>
                </div>
                <el-button v-if="data.term_model_params.length==0" :plain="true" type="success" class="successButton otherButton" @click="addParam">
                  <div class="successText">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-plus"></i>&nbsp;&nbsp;添加&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                </el-button>
              </form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="设备详情" name="deviceinfo">
            <div class="page-model-upDown">
              <div class="up">
                <el-form ref="form" :inline="true" :model="form">
                  <el-form-item label="所属机构" style="margin-bottom: 0">
                    <el-cascader style="width: 300px"
                                 :options="getOrgData"
                                 :props="props"
                                 v-model="orgArrData"
                                 @change="handleChange"
                                 :clearable=true
                                 change-on-select>
                    </el-cascader>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0">
                    <button type="button" class="dj-btn dj-btn-warning" @click="getList">查询</button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="down">
                <div v-show="allData.length!=0" class="table-area">
                  <table class="dj-table">
                    <thead>
                    <tr>
                      <th class="md-width">SN号</th>
                      <th>设备序号</th>
                      <th>所属机构</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in allData">
                      <td>
                        <span class="a-link" @click="goDeviceInfoDetail(item.sn)">{{item.sn}}</span>
                      </td>
                      <td class="font-arial">{{item.serial_number}}</td>
                      <td class="font-pfsc">{{item.org_name}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div v-show="allData.length!=0" class="dj-page text-right">
                  <span class="prev-page" @click="pageChanged('prev')" v-show="page.currentPage!=1">&lt;&nbsp;上一页</span>
                  <span>第</span>
                  <input type="number" class="dj-page-input" v-model="page.currentPage" @keyup.13="pageChanged()">
                  <span>页</span>
                  <span class="total-page">共{{page.totalPage}}页</span>
                  <span class="next-page" @click="pageChanged('next')" v-show="page.currentPage!=page.totalPage">下一页&nbsp;&gt;</span>
                  <span class="total-num">共{{page.totalItems}}条记录</span>
                </div>
                <div v-show="allData.length==0" class="text-center">
                  <img class="margin-top-20" src="../../assets/noSearch.png" alt="">
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="text-center margin-top-20 margin-bottom-10">
      <button class="dj-btn dj-btn-default" style="background-color:#fff;" @click="goBack">返回</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'
  import Router from 'vue-router'
  export default {
    data() {
      return {
        display: true,
        data: '',
        images: [],
        addModel: false,
        modModel: false,
        selectd: -1,
        getOrgData: [],
        orgArrData: [],
        activeName:'deviceinfo',
        props: {
          value: 'id',
          label: 'org_name',
          children: 'children'
        },
        form: {},
        page:{
          totalPage: '',
          totalItems: '',
          currentPage: 1,
          pageSize: 6
        },
        org_id: '',
        allData: []
      }
    },
    computed:{
      _provider:function(){
        if(this.data!=''){
          return this.data.provider
        }
      }
    },
    created() {
      let vm = this
      axios.get(API+"/term_model/getInfo/"+this.$route.params.id)
        .then(function (res) {
          vm.data = res.data.data
          vm.images = res.data.data.termModelPic
        })
      vm.org_id = vm.getUserOrgId()
      vm.getList()
    },
    methods:{
      changeTab(targetName, action){
        console.log(targetName.name, action)
        this.activeName = targetName.name
      },
      getList() {
        let vm = this
        axios.get(API+"/term_model/terminalList/"+this.$route.params.id+"/"+vm.page.pageSize+"/?org_id="+vm.org_id+"&&page="+vm.page.currentPage)
          .then(function (res) {
            vm.allData = res.data.data.data
            vm.page.totalPage = Math.ceil(res.data.data.total/vm.page.pageSize)
            vm.page.totalItems = res.data.data.total
            vm.page.currentPage = res.data.data.current_page
          })
      },
      editParams() {
        let vm = this
        vm.display = false;
      },
      saveParams() {
        let vm = this

        axios.post(API+"/term_model/addTermModelParam", {
          term_model_id: vm.data.id,
          term_model_param: vm.data.term_model_params
        }).then(function (res) {
          vm.display = true;
        })
      },
      addParam() {
        let vm = this
        vm.data.term_model_params.push({"param_key": "", "param_value": ""})
      },
      deleteParam(index) {
        let vm = this
        vm.data.term_model_params.splice(index,1)
      },
      goDeviceInfoDetail(item){
        this.$router.push({ name: 'DeviceInfoDetail',params:{id: item}});
      },
      goBack() {
        this.$router.go(-1)
      },
      add(){
        this.addModel = true;
      },
      mod(){
        this.modModel = true;
      },
      del(){
        this.$confirm('此操作将删除该机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      pageChanged(val){
        if (val=='next') {
          this.page.currentPage++
          this.getList()
        } else if (val=='prev') {
          this.page.currentPage--
          this.getList()
        } else {
          this.getList()
        }
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
      handleChange(value){
        this.org_id = value
      }
    },
    mounted(){
      this.initOrgTree();
    }
  }
</script>
<style lang='scss'>
  #ModelDetail{
    padding: 0 !important;
  }
  .headRow{
    min-width: 500px;
    height: 98px;
    background: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px 32px;
    margin-bottom: 10px;
  }
  .dev-logo{
    float: left;
    height: 60px;
    width: 60px;
    border-radius: 50% !important;
    border: 1px solid #c3cedc;
  }
  .dev-title{
    float: left;
    height: 60px;
    margin-left: 16px;
  }
  .headTitle{
    margin-top: 5px;
    font-family: "PingFang SC";
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }
  .headP{
    margin-bottom: 5px;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: bold;
    color: #999;
  }
  .bodyBack{
    background-color: rgb(239,243,246);
    margin: 0 20px 0;
  }
  .bodyContent{
    background-color: #fff;
  }
  .icon-dj{
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: #E5E5E5;
    border-radius: 50% !important;
  }
  .bodyLabelText{
    margin-left: 10px;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  .edit-font{
    margin-left: 16px;
    margin-right: 5px;
    font-family: "PingFang SC";
    font-size: 12px;
    color: #1d8be9;
  }
  .edit-font-icon{
    font-size: 12px;
    color: #1d8be9;
  }
  .bodyImage-box{
    min-width: 900px;
  }
  .bodyImage{
    display: inline-block;
    width: 156px;
    height: 156px;
    padding: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    text-align: center;
    background: #f7f9fa;
    border: 1px solid #c3cedd;
  }
  .clear-margin-left{
    margin-left: 3px !important;
  }
  .bodyImage>img{
    width: 100%;
    height: 100%;
  }

  .bodyParam {
    float: left;
    width: 32%;
    margin: 0 0 18px 2px;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: bold;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .formTitle{
    display: inline-block;
    margin-top: 7px;
    font-size: 18px;
  }
  .input-title{
    display: inline-block;
  }
  .input-title:first-child{
    width: 154px;
  }
  .input-title:last-child{
    margin-left: 7px;
  }
  
  
  .dangerButton{
    border-radius: 0;
    border-color: #e64a19;
  }
  .el-button--danger.is-plain{
    background: #fff;
    border: 1px solid #e64a19;
    color: #1f2d3d;
  }
  .successButton{
    border-radius: 0;
    border-color: #4caf51;
  }
  .el-button--success.is-plain{
    background: #fff;
    border: 1px solid #4caf51;
    color: #1f2d3d;
  }
  .dangerText{
    color: #e64a19;
  }
  .successText{
    color: #4caf51;
  }
  .otherButton{
    margin-left: 463px;
  }
  .icon-img{
    vertical-align: middle;
  }
  #ModelDetail {
    .el-tabs--border-card{
      box-shadow: none;
      border:none;
    }
    .form-box{
      min-width: 800px;
    }
    .d-base-info{
      .el-tabs__content{
        padding: 26px 52px;
        border:1px solid #d1dbe5;
        border-top: none;
      }
      
    }
    .page-model-upDown{
      background-color: #f5f5f5;
    }
    .inputKey{
      width: 154px;
      height: 32px;
      margin: 0 10px 0 0;
      font-family: "PingFang SC";
      font-size: 14px;
      color: #999;
    }
    .inputValue{
      width: 320px;
      height: 32px;
      margin: 0 10px 0 0;
      font-family: "PingFang SC";
      font-size: 14px;
      color: #999;
    }
    .el-tabs__header{
      border:1px solid #d1dbe5;
    }
    .el-tabs__content{
      padding: 0;
      .up{
        border:1px solid #d1dbe5;
        border-top: none;
      }
      .down{
        border:1px solid #d1dbe5;
      }
    }
  }
  
</style>
