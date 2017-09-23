<template>
  <el-row>
    <el-col :span="8">
      <el-tree
        :data="data"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>
    </el-col>

    <!--添加菜单-->
    <el-dialog title="添加菜单" v-model="addModel" size="tiny">
      <el-form label-position="top" class="demo-form-stacked">
        <el-form-item label="是否属于子节点，默认1，代表是">
          <el-input v-model="menuAddData.is_action"></el-input>
        </el-form-item>
        <el-form-item label="输入action路径">
          <el-input v-model="menuAddData.write_res_action" placeholder="输入action路径"></el-input>
        </el-form-item>
        <el-form-item label="选择action路径">
          <el-select v-model="menuAddData.select_res_action" placeholder="请选择action路径" style="width: 100%;">
            <el-option v-for="data in menuAddData.actionList" :label="data" :value="data"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="menuAddData.res_note"></el-input>
        </el-form-item>
        <el-form-item label="所属父节点">
          <el-input v-model="menuAddData.res_parent" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="menuAdd">确 定</el-button>
        <el-button @click.native="addModel=false">取 消</el-button>
      </div>
    </el-dialog>

    <!--修改菜单-->
    <el-dialog title="修改菜单" v-model="modModel" size="tiny">
      <el-form label-position="top" class="demo-form-stacked">
        <el-form-item label="菜单名称">
          <el-input v-model="menuModifyData.res_note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="menuModify">确 定</el-button>
        <el-button @click.native="modModel=false">取 消</el-button>
      </div>
    </el-dialog>

  </el-row>


</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'

  export default{
    created(){
      this.getMenuData();
    },
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'perm_note'
        },

        addModel: false,
        modModel: false,
        menuAddData:{
          is_action:'1',
          select_res_action:'',
          write_res_action:'',
          action:'',
          res_note:'',
          res_parent:'',
          actionList:''
        },
        menuModifyData:{
          id:'',
          res_note:''
        }
      }
    },
    methods:{
      getMenuData(){
        axios.get(API + '/permission/menu/'+ 0)
          .then((resp)=>{
            this.data = resp.data.data;
          });
      },
      addDept:function(data){
        this.addModel = true;
        this.menuAddData.res_parent = data.id;
        this.menuAddData.res_note = '';
        this.menuAddData.write_res_action = '';
        this.menuAddData.select_res_action = '';
        //每次点击都应该拉取最新action列表
        axios({
          method: 'get',
          url: API + '/permission/action',
          params: {
            added_only: 0
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            this.menuAddData.actionList = resp.data.data;
          }
        });
      },
      menuAdd(){
        if(this.menuAddData.write_res_action==null || this.menuAddData.write_res_action==''){
          this.menuAddData.action = this.menuAddData.select_res_action;
        }else{
          this.menuAddData.action = this.menuAddData.write_res_action;
        }
        axios({
          method: 'post',
          url: API + '/permission',
          data: {
            permission: this.menuAddData.action,
            perm_note: this.menuAddData.res_note,
            perm_parent: this.menuAddData.res_parent
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.getMenuData();
            this.addModel = false;
          }
        });
      },
      editDept:function(data){
        this.modModel = true;
        this.menuModifyData.id = data.id;
        this.menuModifyData.res_note = data.perm_note;
      },
      menuModify(){
        axios.put(API + '/permission',
          {
            id: this.menuModifyData.id,
            perm_note: this.menuModifyData.res_note
          }
        ).then(resp=>{
          if(resp.data.code=="00000"){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getMenuData();
            this.modModel = false;
          }
        })
      },
      deleteDept:function(data){
        this.$confirm('此操作将删除该菜单项, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          axios({
            method: 'delete',
            url: API + '/permission',
            data: {
              id: data.id
            }
          }).then(resp=>{
            if(resp.data.code=="00000"){
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getMenuData();
            }else{
              this.$message({
                type: 'error',
                message: resp.data.msg
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      renderContent(h, { node, data, store }) {
        return (
          <span>
          <span>
          <span>{node.label}</span>
        </span>
        <span style="float: right; margin-right: 20px">
          <a class="el-icon-plus" on-click={ () => this.addDept(data) }></a>&nbsp;&nbsp;
          <a class="el-icon-edit" on-click={ () => this.editDept(data) }></a>&nbsp;&nbsp;
          <a class="el-icon-delete" on-click={ () => this.deleteDept(data) }></a>
        </span>
        </span>);
      }
    }
  }
</script>

<style>
  .el-tree {
    width: 500px;
    color: #fff;
    background: #237ab0;
    border: 1px solid #237ab0;
    border-radius: 5px;
    font-size: 14px;
  }
  .el-tree-node__content:hover {
    background: rgb(18, 70, 103);
  }
</style>
