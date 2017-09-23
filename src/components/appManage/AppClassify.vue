<template>
  <div class="page-model-upDown app-classify">
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
            v-model="search.category_name"
            @keyup.enter.native="getList"
            :on-icon-click="getList">
          </el-input>
        </div>
      </div>
      <div v-show="allData.length!=0" class="table-area">
        <table class="dj-table">
          <thead>
          <tr>
            <th>应用分类名称</th>
            <th>应用分类说明</th>
            <th>更新时间</th>
            <th>分类关联应用数量</th>
            <th>排序</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in allData" @click="trClick(item,index)" v-bind:class="{'border-orange':selectd==index}">
            <td class="font-pfsc">{{item.category_name}}</td>
            <td class="font-pfsc">{{item.category_note}}</td>
            <td class="font-arial">{{item.updated_at}}</td>
            <td class="font-arial">{{item.apps_count}}</td>
            <td class="t-opt">
              <img src="../../assets/up.png" v-show="index!=0" v-on:click.stop="changeSort(index, item, 'up')">
              <img src="../../assets/up-dis.png" v-show="index==0" style="cursor: not-allowed">
              <img src="../../assets/up.png" class="btn-down" v-show="index+1!=allData.length" v-on:click.stop="changeSort(index, item, 'down')">
              <img src="../../assets/down-dis.png" v-show="index+1==allData.length" style="cursor: not-allowed">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-show="allData.length==0" class="text-center">
        <img class="margin-top-20" src="../../assets/noSearch.png">
      </div>
    </div>

    <el-dialog title="新增应用分类" :visible.sync="addModel" class="el-dialog-success">
      <el-form :model="addData" label-width="100px">
        <el-form-item label="应用分类名称">
          <el-input v-model="addData.category_name" placeholder="请输入应用分类名称"></el-input>
        </el-form-item>
        <el-form-item label="应用分类说明">
          <el-input v-model="addData.category_note" placeholder="请输入应用分类说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="dj-btn dj-btn-primary  margin-right-5" @click="addList">确定</button>
        <button class="dj-btn dj-btn-back" @click="addModel=false">取消</button>
      </div>
    </el-dialog>

    <el-dialog title="修改应用分类" :visible.sync="modModel" class="el-dialog-info">
      <el-form :model="modData" label-width="100px">
        <el-form-item label="应用分类名称">
          <el-input v-model="modData.category_name" placeholder="请输入应用分类名称"></el-input>
        </el-form-item>
        <el-form-item label="应用分类说明">
          <el-input v-model="modData.category_note" placeholder="请输入应用分类说明"></el-input>
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
  import * as api from '../../api/appApi'
  export default {
    name: 'AppClassify',
    created(){
      this.getList();
    },
    data(){
      return {
        addModel: false,
        modModel: false,
        search: {
          category_name: '',
          page_size: 500
        },
        selectd: -1,
        allData: [],
        addData: {
          category_name: '',
          category_note: ''
        },
        modData: {
          category_id: '',
          category_name: '',
          category_note: ''
        },
        delData: {
          id: ''
        }
      }
    },
    methods:{
      getList(){
        let vm = this;
        api.getAppClassList(vm.search).then(resp=>{
          if(resp.data.code=='00000'){
            vm.allData = resp.data.data.data;
            if(resp.data.data.data.length==0){
              vm.$message({
                message: '没有查询到数据',
                type: 'info'
              });
            }
            if(vm.search.category_name!=''){
              vm.selectd = -1;
            }
          }
        });
      },
      add(){
        let vm = this;
        vm.addData.category_name = '';
        vm.addData.category_note = '';
        vm.addModel = true;
      },
      addList(){
        let vm = this;
        if(vm.addData.category_name==''){
          this.$message({
            message: '请填写应用分类名称',
            type: 'warning'
          });
          return;
        }
        vm.addModel = false;
        api.appClassAdd(vm.addData).then(function (resp){
          if(resp.data.code=="00000"){
            vm.search.category_name = '';
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
        if(vm.modData.category_name==''){
          this.$message({
            message: '请填写应用分类名称',
            type: 'warning'
          });
          return
        }
        vm.modModel = false;
        api.appClassMod(vm.modData).then(function (resp){
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
        vm.$confirm('此操作将删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.appClassDel({category_id:vm.delData.id}).then(function (resp){
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
          vm.modData.category_id = item.id;
          vm.modData.category_name = item.category_name;
          vm.modData.category_note = item.category_note;
          vm.delData.id = item.id;
        }
      },
      changeSort(index,item,val){
        let vm = this;
        if(val=='up'){
          api.appClassSort({
            origin_id: item.id,
            type: 0,
            prev_id: this.allData[index-1].id
          }).then(function(resp){
            if(resp.data.code=="00000"){
              vm.selectd = -1;
              vm.getList();
            }
          })
        }else if(val=='down'){
          api.appClassSort({
            origin_id: item.id,
            type: 1,
            next_id: this.allData[index+1].id
          }).then(function(resp){
            if(resp.data.code=="00000"){
              vm.selectd = -1;
              vm.getList();
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .app-classify{
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

