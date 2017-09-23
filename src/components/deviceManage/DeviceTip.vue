<!-- 设备标签 -->
<template>
  <div class="page-model-upDown device-tip">
    <div class="down">
      <div class="btn-opt-area1">
        <div class="opt-area">
          <button class="dj-btn dj-btn-success" @click="add">新增</button>
          <button class="dj-btn dj-btn-info" @click="mod">修改</button>
          <button class="dj-btn dj-btn-danger" @click="del">删除</button>
        </div>
        <div class="input-area">
          <el-input
            placeholder="请输入搜索内容"
            icon="search"
            v-model="search.label_name"
            @keyup.enter.native="getList"
            :on-icon-click="getList">
          </el-input>
        </div>
      </div>
      <div v-show="allData.length!=0" class="table-area">
        <table class="dj-table">
          <thead>
          <tr>
            <th>设备标签名称</th>
            <th>设备标签说明</th>
            <th>更新时间</th>
            <th>标签管理设备数量</th>
            <th>排序</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in allData" @click="trClick(item,index)" v-bind:class="{'border-orange':selectd==index}">
            <td class="font-pfsc">{{item.label_name}}</td>
            <td class="font-pfsc">{{item.label_note}}</td>
            <td class="font-arial">{{item.updated_at}}</td>
            <td>
              <span class="a-link" @click="goDeviceTipNum(item)">{{item.term_relate_count}}</span>
            </td>
            <td class="t-opt">
              <img src="../../assets/up.png" alt="" v-show="index!=0" v-on:click.stop="changeSort(index, item, 'up')">
              <img src="../../assets/up-dis.png" alt="" v-show="index==0" style="cursor: not-allowed">
              <img src="../../assets/up.png" class="btn-down" alt="" v-show="index+1!=allData.length" v-on:click.stop="changeSort(index, item, 'down')">
              <img src="../../assets/down-dis.png" alt="" v-show="index+1==allData.length" style="cursor: not-allowed">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-show="allData.length==0" class="text-center">
        <img class="margin-top-20" src="../../assets/noSearch.png" alt="">
      </div>
    </div>

    <el-dialog title="新增标签" :visible.sync="addModel" class="el-dialog-success">
      <el-form :model="addData" label-width="100px">
        <el-form-item label="设备标签名称" prop="label_name">
          <el-input v-model="addData.label_name" placeholder="请输入设备标签名称"></el-input>
        </el-form-item>
        <el-form-item label="设备标签说明" prop="label_note">
          <el-input v-model="addData.label_note" placeholder="请输入设备标签说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="dj-btn dj-btn-primary  margin-right-5" @click="addList">确定</button>
        <button class="dj-btn dj-btn-back" @click="addModel=false">取消</button>
      </div>
    </el-dialog>

    <el-dialog title="修改标签" :visible.sync="modModel" class="el-dialog-info">
      <el-form :model="modData" label-width="100px">
        <el-form-item label="设备标签名称" prop="label_name">
          <el-input v-model="modData.label_name" placeholder="请输入设备标签名称"></el-input>
        </el-form-item>
        <el-form-item label="设备标签说明" prop="label_note">
          <el-input v-model="modData.label_note" placeholder="请输入设备标签说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="dj-btn dj-btn-primary margin-right-5" @click="modList">确定</button>
        <button class="dj-btn dj-btn-back" @click="modModel=false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'
  export default {
    name: 'DeviceTip',
    created(){
      this.getList();
    },
    data(){
      return {
        addModel: false,
        modModel: false,
        search:{
          label_name: ''
        },
        selectd: -1,
        allData: [],
        addData:{
          label_name: '',
          label_note: ''
        },
        modData:{
          id: '',
          label_name: '',
          label_note: ''
        },
        delData:{
          id: ''
        }
      }
    },
    methods:{
      getList(){
        let vm = this;
        axios.post(API + '/termLabel', vm.search)
          .then(function (resp){
            if(resp.data.code=="00000"){
              vm.allData = resp.data.data;
              if(resp.data.data.length==0){
                vm.$message({
                  message: '没有查询到数据',
                  type: 'info'
                });
              }
              if(vm.search.label_name!=''){
                vm.selectd = -1;
              }
            }
          })
      },
      add(){
        let vm = this;
        vm.addData.label_name = '';
        vm.addData.label_note = '';
        vm.addModel = true;
      },
      addList(){
        let vm = this;
        if(vm.addData.label_name == ''){
          this.$message({
            message: '请填写设备标签名称',
            type: 'warning'
          });
          return;
        }
        vm.addModel = false;
        axios.post(API + '/termLabel/store', vm.addData)
          .then(function (resp) {
            if(resp.data.code=="00000"){
              vm.search.label_name = '';
              vm.getList();
            }
          })
      },
      mod(){
        if(this.selectd==-1){
          this.$message('请选择您要修改的数据');
          return;
        }
        this.modModel = true;
      },
      modList(){
        let vm = this;
        if(vm.modData.label_name == ''){
          this.$message({
            message: '请填写设备标签名称',
            type: 'warning'
          });
          return
        }
        vm.modModel = false;
        axios.put(API+'/termLabel', vm.modData)
          .then(function (resp) {
            if(resp.data.code=="00000"){
              vm.getList();
            }
          })
      },
      del(){
        if(this.selectd==-1){
          this.$message('请选择您要删除的数据');
          return;
        }
        let vm = this;
        vm.$confirm('此操作将删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(API+"/termLabel?id="+vm.delData.id)
            .then(function (resp) {
              if(resp.data.code=="00000"){
                vm.getList();
                vm.selectd = -1;
              }
            })
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      trClick(item,index){
        //这个判断只适合不分页，分页情况下，第一页的index和第二页的index是相同的，请去除如下判断
        if(this.selectd!=index){
          let vm = this;
          vm.selectd = index;
          vm.modData.id = item.id;
          vm.modData.label_name = item.label_name;
          vm.modData.label_note = item.label_note;
          vm.delData.id = item.id;
        }
      },
      changeSort(index,item,val){
        let vm = this;
        if(val=='up'){
          axios.post(API+'/termLabel/move',{
            id: item.id,
            prev: vm.allData[index-1].id
          }).then(function(resp){
            if(resp.data.code=="00000"){
              vm.selectd = -1;
              vm.getList();
            }
          })
        }else if(val=='down'){
          axios.post(API+'/termLabel/move',{
            id: item.id,
            next: vm.allData[index+1].id
          }).then(function (resp) {
            if(resp.data.code=="00000"){
              vm.selectd = -1;
              vm.getList();
            }
          })
        }
      },
      goDeviceTipNum(item){
        if(item.term_relate_count==0){
          this.$message({
            type: 'info',
            message: '该标签下没有设备'
          });
          return;
        }
        this.$router.push({ name: 'DeviceTipNum',params:{id: item.id}});
      }
    }
  }
</script>
<style lang='scss'>
  .device-tip{
  .down{
    padding-bottom: 0;
  }
  .el-input{
    display: block;
  }
  .dj-table > tbody > tr > td{
    padding: 0;
  }
  .btn-opt-area1{
    padding: 14px 30px;
    display: flex;
  .opt-area{
    flex: 1;
  }
  .input-area{
    width: 350px;
  }
  .dj-btn{
    margin-right: 6px;
  }
  }
  .btn-down{
    transform: rotate(180deg);
  }
  .t-opt img{
    cursor: pointer;
    margin-top: 4px;
    width: 28px;
    height: 28px;
  }
  .el-dialog--small{
    width: 520px;
    height: 278px;
  }
  .el-dialog__title{
    font-size: 14px;
  }
  .el-dialog-info .el-dialog__header{
    padding: 15px 20px;
  }
  .el-dialog__body{
    padding: 40px 60px;
  }

  }
</style>
