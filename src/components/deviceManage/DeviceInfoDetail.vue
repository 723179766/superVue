<template>
  <div>
    <div class="page-sign dev-info-detail margin-bottom-10">
      <div class="title-box">
        <span class="tip"></span>
        <span class="title">设备信息</span>
        <span class="dj-sign-font" v-show="!editFlag" @click="edit">修改 <img src="../../assets/edit.png" class="icon-img" alt=""></span>
        <span class="dj-sign-font" v-show="editFlag" @click="save">保存 <img src="../../assets/save.png" class="icon-img" alt=""></span>
      </div>
      <div class="content-box">
        <el-form label-width="120px" v-bind:class="{'dj-fade-in':!editFlag,'dj-fade-out':editFlag}" class="form-detail">
          <el-form-item label="所属机构">
            <p>|&nbsp;&nbsp;<span>{{formDetail.orgName}}</span></p>
          </el-form-item>
          <el-form-item label="所属厂商">
            <p>|&nbsp;&nbsp;<span>{{formDetail.providerName}}</span></p>
          </el-form-item>
          <el-form-item label="设备型号">
            <p>|&nbsp;&nbsp;<span>{{formDetail.devNo}}</span></p>
          </el-form-item>
          <el-form-item label="SN号">
            <p>|&nbsp;&nbsp;<span>{{formDetail.sn}}</span></p>
          </el-form-item>
          <el-form-item label="设备序号">
            <p>|&nbsp;&nbsp;<span>{{formDetail.serialNo}}</span></p>
          </el-form-item>
          <el-form-item label="设备标签">
            <span style="color: #999;vertical-align: top;">|</span><div style="display: inline-block;width: 95%;vertical-align: top;">
              <span class="dj-tag dj-tag-selectd" v-for="item in formDetail.devLabel">{{item.label_name}}</span>
            </div>
          </el-form-item>
        </el-form>
        <el-form label-width="120px" v-bind:class="{'dj-fade-in':editFlag,'dj-fade-out':!editFlag}" class="form-edit">
          <el-form-item label="所属机构">
            <p>|&nbsp;&nbsp;<span>{{formDetail.orgName}}</span></p>
          </el-form-item>
          <el-form-item label="所属厂商">
            <p>|&nbsp;&nbsp;<span>{{formDetail.providerName}}</span></p>
          </el-form-item>
          <el-form-item label="设备型号">
            <p>|&nbsp;&nbsp;<span>{{formDetail.devNo}}</span></p>
          </el-form-item>
          <el-form-item label="SN号">
            <p>|&nbsp;&nbsp;<span>{{formDetail.sn}}</span></p>
          </el-form-item>
          <el-form-item label="设备序号">
            <p>|&nbsp;&nbsp;<span>{{formDetail.serialNo}}</span></p>
          </el-form-item>
          <el-form-item label="设备标签">
            <span class="dj-tag" @click="labelAllClick()" v-bind:class="{'dj-tag-selectd':selectdAll==true}">全部</span><span class="dj-tag" v-for="item in devLabelArr" v-bind:class="{'dj-tag-selectd':item.selectd==true}" @click="labelClick(item)">{{item.label_name}}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="text-center margin-bottom-10">
      <button class="dj-btn dj-btn-back" @click="back">返回</button>
      <button class="dj-btn dj-btn-default margin-left-6" @click="cancle" v-show="editFlag">取消</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'
  export default {
    name: 'DeviceInfoDetail',
    created(){
      let vm = this;
      //获取设备信息
      this.getDevNoInfo();
      //获取设备标签列表
      axios.post(API + '/termLabel').then(function(resp){
        if(resp.data.code=='00000'){
          vm.devLabelArr = resp.data.data;
          for(let i=0;i<vm.devLabelArr.length;i++){
            vm.$set(vm.devLabelArr[i],"selectd",false);
          }
        }
      });
    },
    data(){
      return {
        selectdAll: false,
        editFlag: false,
        formDetail: {
          orgName: '',
          providerName: '',
          devNo: '',
          sn: '',
          serialNo: '',
          devLabel: []
        },
        devLabelArr: []
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      cancle(){
        this.editFlag = false;
      },
      edit(){
        let vm = this,num = 0;
        //先置未选择状态，然后再重新赋值，处理点击修改，然后点击返回的操作
        vm.selectdAll = false;
        for(let j=0;j<vm.devLabelArr.length;j++){
          vm.devLabelArr[j].selectd = false;
        }
        for(let i=0;i<vm.formDetail.devLabel.length;i++){
          for(let j=0;j<vm.devLabelArr.length;j++){
            if(vm.formDetail.devLabel[i].label_id==vm.devLabelArr[j].id){
              vm.devLabelArr[j].selectd = true;
            }
          }
        }
        //处理全部tag的状态
        for(let i=0;i<vm.devLabelArr.length;i++){
          if(vm.devLabelArr[i].selectd == true){
            num++;
          }
        }
        if(num==vm.devLabelArr.length){
          vm.selectdAll = true;
        }else{
          vm.selectdAll = false;
        }
        vm.editFlag = true;
      },
      save(){
        let vm = this;
        let tagArr = [];
        for(let i=0;i<vm.devLabelArr.length;i++){
          if(vm.devLabelArr[i].selectd==true){
            tagArr.push(vm.devLabelArr[i].id);
          }
        }
        axios({
          method: 'post',
          url: API + '/terminal/modify',
          data: {
            id: this.$route.params.id,
            labels: tagArr
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            this.getDevNoInfo();
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            vm.editFlag = false;
          }
        });
      },
      labelAllClick(){
        let vm = this;
        vm.selectdAll = !vm.selectdAll;
        if(vm.selectdAll==true){
          for(let i=0;i<vm.devLabelArr.length;i++){
            vm.devLabelArr[i].selectd = true;
          }
        }
      },
      labelClick(item){
        let vm = this,num = 0;
        item.selectd = !item.selectd;
        for(let i=0;i<vm.devLabelArr.length;i++){
          if(vm.devLabelArr[i].selectd == true){
            num++;
          }
        }
        if(num==vm.devLabelArr.length){
          vm.selectdAll = true;
        }else{
          vm.selectdAll = false;
        }
      },
      getDevNoInfo(){
        let vm = this;
        axios({
          method: 'post',
          url: API + '/terminal/index',
          data: {
            id: this.$route.params.id,
            page_size: 1
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            let result = resp.data.data.data[0];
            vm.formDetail.orgName = result.org_name;
            vm.formDetail.providerName = result.provider_name;
            vm.formDetail.devNo = result.term_model_name;
            vm.formDetail.sn = result.id;
            vm.formDetail.serialNo = result.serial_number;
            vm.formDetail.devLabel = result.labels;
          }
        });
      }
    }
  }
</script>

<style lang='scss'>
  .dev-info-detail .title-box{
    position: relative;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .dev-info-detail .tip{
    position: absolute;
    display: inline-block;
    width: 5px;
    height: 100%;
    background-color: #3aa5ff;
  }
  .dev-info-detail .title{
    margin-left: 15px;
    font-weight: 600;
    color: #1f2d3d;
  }
  .dev-info-detail .form-detail .el-form-item{
    margin-bottom: 0;
  }
  .dev-info-detail .form-edit .el-form-item{
    margin-bottom: 0;
  }
  .dev-info-detail .dj-sign-font{
    margin-left: 18px;
  }
  .dev-info-detail .dj-tag{
    line-height: 1.4;
  }
  .dev-info-detail .el-form-item__label{
    font-family: "PingFang SC";
    color: #999;
  }
  .dev-info-detail p{
    color: #999;
  }
  .dev-info-detail p>span{
    font-family: "PingFang SC";
    font-size: 14px;
  }
  .dev-info-detail .icon-img{
    vertical-align: middle;
  }
</style>
