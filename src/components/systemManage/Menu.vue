<template>
  <div>
    <div class="menu-tree">
      <drop-tree :defaultProps="defaultProps" :node="treeData" @dropClick="chooseDept"
                 @addTree="addDept" @editTree="editDept" @deleteTree="deleteDept"></drop-tree>
    </div>

    <!--添加菜单-->
    <el-dialog title="添加菜单" v-model="addModel" size="tiny">
      <el-form label-position="top" class="demo-form-stacked">
        <el-form-item label="是否属于子节点，默认1，代表是">
          <el-input v-model="menuAddData.is_action"></el-input>
        </el-form-item>
        <el-form-item label="输入action路径">
          <el-input v-model="menuAddData.write_res_action" placeholder="输入action路径"></el-input>
        </el-form-item>
        <el-form-item label="菜单是否已录入">
          <el-radio-group v-model="radio" @change="choseAction">
            <el-radio class="radio" v-model="radio" label="1">是</el-radio>
            <el-radio class="radio" v-model="radio" label="0">否</el-radio>
          </el-radio-group>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import DropTree from '../../common/DropTree'
  import axios from 'axios'
  import {API} from '../../config'
  export default{
    components:{
      DropTree
    },
    created(){
      this.getMenuData();
    },
    data(){
      return{
        radio: '0',
        addModel: false,
        modModel: false,
        defaultProps:{
          children: 'children',
          name: 'perm_note',
          id: 'id',
          addTree: true,
          editTree: true,
          deleteTree: true
        },
        treeData: {},
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
      chooseDept(data){},
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
      choseAction(){
        axios({
          method: 'get',
          url: API + '/permission/action',
          params: {
            added_only: this.radio
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            this.menuAddData.actionList = resp.data.data;
          }
        });
      },
      addDept:function(data){
        this.radio = '0';
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
      getMenuData(){
        let prs_id = JSON.parse(sessionStorage.getItem('userInfo')).prs_id;
        axios.get(API + '/permission/menu/'+ 0)
          .then((resp)=>{
            this.treeData = resp.data.data;
          });
      }
    }
  }
</script>

<style>
  .menu-tree{
    width: 500px;
    color: #fff;
    background: #237ab0;
    border: 1px solid #237ab0;
    border-radius: 5px;
  }
</style>
