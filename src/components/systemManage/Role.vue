<template>
  <div style="text-align: left;">
    <div class="btn-warp1">
      <el-input placeholder="角色名称" v-model="form.addRoleName">
        <el-button slot="append" icon="plus" @click="roleAdd" class="role-add-btn">添加</el-button>
      </el-input>
    </div>
    <div class="btn-warp2">
      <el-button type="primary" icon="message" @click="perSave">保存权限</el-button>
    </div>

    <div style="clear: both"></div><!--解决opera浏览器样式换行问题-->

    <div class="div-left">
      <div class="show-left">
        <el-table highlight-current-row
                  @row-click="rowClick"
                  :data="tableData"
                  border
                  style="width: 100%;margin-top: 10px;">
          <el-table-column
            prop="role_name"
            label="名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="role_note"
            label="角色备注"
            width="auto">
          </el-table-column>
          <el-table-column
            :context="_self"
            inline-template
            label="操作"
            width="200">
            <div>
              <el-button @click="doHandleModify($index, row)" type="warning" size="small" icon="edit">修改</el-button>
              <el-button @click="doHandleDelete($index, row)" type="danger" size="small" icon="delete">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="div-right">
      <div class="show-right">
        <el-alert title="权限列表"
                  type="info"
                  show-icon
                  :closable="false">
        </el-alert>
        <div style="text-align: center;">
          <el-tag type="primary" style="font-size: 18px">{{ form.showName }}</el-tag>
        </div>
        <el-tree ref="permissionTree" :data="perAllData" :props="perSetting" style="clear: both" show-checkbox node-key="id"></el-tree>
      </div>
    </div>

    <!--修改角色-->
    <el-dialog title="角色信息" v-model="formRoleModify" size="tiny">
      <el-form label-position="top" class="demo-form-stacked">
        <el-form-item label="角色名称">
          <el-input v-model="form.modRoleName"></el-input>
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input v-model="form.modRoleNote"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="roleModify" @click.native="formRoleModify=false">确 定</el-button>
        <el-button @click.native="formRoleModify=false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'
  export default{
    name: 'Role',
    created(){
      let prs_id = JSON.parse(sessionStorage.getItem('userInfo')).prs_id;
      axios.get(API + '/permission/menu/'+ 0)
        .then((resp)=>{
          this.perAllData = resp.data.data.children;
          this.menAllData = resp.data.data;
        });

      axios.get(API + '/role')
        .then((resp)=>{
          this.tableData = resp.data.data;
          this.form.roleId = this.tableData[0].id;
          this.form.showName = this.tableData[0].role_name;
          axios.get(API + '/role/permission/' + this.tableData[0].id)//获取第一个角色的权限
            .then((resp)=>{

//              console.log('该角色权限');
//              console.log(resp.data.data);
              this.find(resp.data.data,this.perAllData);
//              console.log('处理后的权限');
//              console.log(this.defaultCheckd);

              setTimeout(() => {
                this.$refs.permissionTree.setCheckedNodes(this.defaultCheckd);
              }, 500);
            });
        });
    },
    methods:{
      //刷新表格
      initTable(){
        axios.get(API + '/role')
          .then((resp)=>{
            this.tableData = resp.data.data;
          });
      },


      //添加角色
      roleAdd(){
        if(this.form.addRoleName==null || this.form.addRoleName==''){
          this.$message('角色名称不能为空');
        }else{
          axios.post(API + '/role',{
            role_name:this.form.addRoleName,
            role_note: ''
          }).then((resp)=>{
            this.form.addRoleName = "";
            this.initTable();
          })
        }
      },


      //表格行点击事件
      rowClick(row,event){
        this.form.roleId = row.id;
        this.form.showName = row.role_name;
        this.defaultCheckd = [];
        this.$refs.permissionTree.setCheckedNodes([]);
        axios.get(API + '/role/permission/' + row.id)
          .then((resp)=>{
//            console.log('该角色权限');
//            console.log(resp.data.data);
            this.find(resp.data.data,this.perAllData);
//            console.log('处理后的权限');
//            console.log(this.defaultCheckd);
            setTimeout(() => {
              this.$refs.permissionTree.setCheckedNodes(this.defaultCheckd);
            }, 500);
          });
      },


      //角色名称修改
      doHandleModify(index, row){
        this.formRoleModify = true;
        this.form.roleId = row.id;
        this.form.modRoleName = row.role_name;
        this.form.modRoleNote = row.role_note;
      },

      //角色名称确认修改
      roleModify(){
        axios.put(API + '/role', {
          id: this.form.roleId,
          role_name: this.form.modRoleName,
          role_note: this.form.modRoleNote
        }).then(resp=>{
          this.form.showName = this.form.modRoleName;
          this.initTable();
        })
      },


      //删除按钮
      doHandleDelete(index, row){
        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          axios({
            method: 'delete',
            url: API + '/role',
            params: {
              id: row.id
            }
          }).then(resp=>{
            if(resp.data.code=="00000"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.form.showName = '';
              this.defaultCheckd = [];
              this.$refs.permissionTree.setCheckedNodes([]);
              this.initTable();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //保存权限
      perSave(){
        this.rolepermission = this.$refs.permissionTree.getCheckedNodes();
//        console.log('当前的勾选节点')
//        console.log(this.rolepermission)
//        console.log(this.menAllData)
//        return
        this.savePer.role_permissions = [];
        this.savePer.role_id = this.form.roleId;

//        for(let i=0;i<this.rolepermission.length;i++){
//          this.savePer.role_permissions.push(this.rolepermission[i].id);
//        }
        for(let j=0;j<this.rolepermission.length;j++){
          if(this.rolepermission[j].perm_parent!="0000"){
            this.savePer.role_permissions.push(this.rolepermission[j].id);
            let fatherMenuId = this.rolepermission[j].perm_parent;
            this.findOneMenu(this.menAllData,fatherMenuId);
          }
        }



        let unique = {};
        this.savePer.role_permissions.forEach(function(gpa){ unique[ JSON.stringify(gpa) ] = gpa });
        this.savePer.role_permissions = Object.keys(unique).map(function(u){return JSON.parse(u) });

//        console.log(this.savePer.role_permissions)
//        return

        axios.post(API + '/role/permission/associate',{
          roleId: this.savePer.role_id,
          perms: this.savePer.role_permissions
        }).then((resp)=>{
          if(resp.data.code == '00000'){
            this.$message({
              type: 'success',
              message: '权限分配成功'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '权限已经分配过了'
            });
          }
        });
      },


      //全量权限与部分权限进行对比，赛选出勾选节点
      find(data,menudata){
        for(let i=0;i<data.length;i++){
          this.findMenu(data[i].children.length,data[i].id,menudata);
          if(this.flag == true){
            this.defaultCheckd.push({'id':data[i].id});
          }else{
            this.find(data[i].children,menudata)
          }
        }
      },
      findMenu(len,name,menu){
        for(let i=0;i<menu.length;i++){
          if(menu[i].id==name){
            if(menu[i].children.length==len){
              this.flag = true;
              break;
            }else{
              this.flag = false;
              break;
            }
          }else{
            this.findMenu(len,name,menu[i].children)
          }
        }
      },
      //遍历所有菜单--将半选节点放入需要存储的数据中
      findOneMenu(data,menuId){
        data.children.forEach((e)=>{
          if(e.id==menuId){
            let push = true;
            for(let i=0;i<this.savePer.role_permissions.length;i++){
              if(e.id==this.savePer.role_permissions[i]){
                push = false;
              }
              break;
            }
            if(push){
              this.savePer.role_permissions.push(e.id);
            }
            if(e.perm_parent!="0000"){
              this.findOneMenu(this.menAllData,e.perm_parent)
            }
          }
          if(e.children.length>0){
            this.findOneMenu(e,menuId)
          }
        })
      }
    },
    data() {
      return {
        form:{
          roleId: '',
          addRoleName: '',
          modRoleName: '',
          modRoleNote: '',
          showName: ''
        },
        tableData: [],
        flag: '',               //递归标志符
        formRoleModify: false, //修改表单隐藏
        menAllData: null,      //所有权限备份
        perAllData: [],        //所有权限数据
        perSetting: {          //权限树配置
          children: 'children',
          label: 'perm_note'
        },
        defaultCheckd: [],     //存放权限勾选数组
        rolepermission: [],    //权限复选框点击后反馈的数据
        savePer:{               //保存权限
          "role_id": '',
          "role_permissions": []
        },
        orgPer: '',    //组织半选
        generalPer: ''//通用权限全选
      }
    }
  }
</script>
<style>
  .role-add-btn:hover{
    color: #20a0ff !important;
  }
  .btn-warp1{
    width: 50%;
    float: left;
    padding: 0 10px 0 0;
  }
  .btn-warp2{
    width: 50%;
    float: left;
    padding: 0 10px 0 0;
  }
  .div-left{
    width: 50%;
    float: left;
    padding: 15px 10px 0 0;
  }
  .div-right{
    width: 50%;
    float: left;
    padding: 15px 10px 0 0;
  }
  .show-left{
    width: 100%;
    padding: 0 10px 10px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .show-right{
    width: 100%;
    padding: 0 10px 10px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .show-right>div{
    margin-top: 10px;
  }
  @media screen and (max-width: 1024px){
    .div-left{
      width: 60%;
    }
    .div-right{
      width: 40%;
    }
    .btn-warp1{
      width: 60%;
    }
    .btn-warp2{
      width: 40%;
    }
  }
</style>
