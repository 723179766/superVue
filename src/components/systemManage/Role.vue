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
    mounted(){
      setTimeout(() => {
        this.$refs.permissionTree.setCheckedNodes([
          {id:'2B222DD8-2E78-E9F6-A22A-5EF6A4F4EED6'},
          {id:'96A19189-AE85-098E-297C-D34F6D1D5D98'},
          {id:'07593D26-746A-C599-79C4-DB378A04AD50'},
          {id:'648AB4F0-DDC1-DEC9-36D3-290BF861487A'},
          {id:'58E8895A-3A52-C185-7657-6AB04FCC6028'}
        ]);
      }, 800);
    },
    data() {
      return {
        form:{
          roleId: '',
          addRoleName: '',
          modRoleName: '',
          modRoleNote: '',
          showName: '七七小鱼'
        },
        tableData: [
          {
            role_name: '超级管理员',
            role_note: '拥有所有权限'
          },
          {
            role_name: '分行管理员',
            role_note: '管理分行机构'
          },
          {
            role_name: '生产管理员',
            role_note: ''
          }
        ],
        flag: '',               //递归标志符
        formRoleModify: false, //修改表单隐藏
        menAllData: null,      //所有权限备份
        perAllData: [{"id":"359CB043-EFEB-D101-7C25-2CF3DA6B4142","res_action":"App\\Http\\Controllers\\Api\\organization","is_action":1,"res_parent":"0000","res_note":"\u7ec4\u7ec7","created_at":"2016-11-28 09:30:54","updated_at":"2016-11-28 09:30:54","sort":2,"children":[{"id":"2B222DD8-2E78-E9F6-A22A-5EF6A4F4EED6","res_action":"App\\Http\\Controllers\\Api\\Excess","is_action":1,"res_parent":"359CB043-EFEB-D101-7C25-2CF3DA6B4142","res_note":"\u5907\u7528","created_at":"2016-12-06 08:04:47","updated_at":"2016-12-06 08:04:47","sort":7,"children":[]}]},{"id":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_action":"general","is_action":1,"res_parent":"0000","res_note":"\u901a\u7528\u6743\u9650","created_at":"2016-11-30 08:50:22","updated_at":"2016-11-30 08:50:22","sort":6,"children":[{"id":"96A19189-AE85-098E-297C-D34F6D1D5D98","res_action":"App\\Http\\Controllers\\Api\\AuthController@login","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u7528\u6237\u767b\u5f55","created_at":"2016-11-30 08:50:42","updated_at":"2016-11-30 08:50:42","sort":0,"children":[]},{"id":"E961481A-E291-A22F-4542-CB8EDE773A48","res_action":"App\\Http\\Controllers\\Api\\ClassController@index","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5206\u9875\u83b7\u53d6\u804c\u4f4d\u4fe1\u606f","created_at":"2016-11-30 08:51:04","updated_at":"2016-11-30 08:51:04","sort":1,"children":[]},{"id":"ECFCC058-A09A-A4C9-BFAA-B723922AFCCA","res_action":"App\\Http\\Controllers\\Api\\RoleController@index","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5206\u9875\u83b7\u53d6\u89d2\u8272\u4fe1\u606f","created_at":"2016-11-30 08:51:24","updated_at":"2016-11-30 08:51:24","sort":2,"children":[]},{"id":"1359E95C-7738-87DE-5767-C6FBEE483412","res_action":"App\\Http\\Controllers\\Api\\PermissionController@getPermissionsByRoleId","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u6839\u636e\u89d2\u8272id\u83b7\u53d6\u6743\u9650\u5b50\u6811","created_at":"2016-11-30 08:51:53","updated_at":"2016-11-30 08:51:53","sort":3,"children":[]},{"id":"4418B004-8008-EB4D-0270-A59654607373","res_action":"App\\Http\\Controllers\\Api\\AuthController@sendPwdBackEmail","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u53d1\u9001\u627e\u56de\u5bc6\u7801\u90ae\u4ef6","created_at":"2016-11-30 08:52:15","updated_at":"2016-11-30 08:52:15","sort":4,"children":[]},{"id":"E046562F-A39E-65F6-0E3E-D2DB543ED2E8","res_action":"App\\Http\\Controllers\\Api\\AuthController@getPwdBack","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u627e\u56de\u5bc6\u7801","created_at":"2016-11-30 08:52:27","updated_at":"2016-11-30 08:52:27","sort":5,"children":[]},{"id":"1578C3C0-C2D5-CED6-6311-B864799F3826","res_action":"App\\Http\\Controllers\\Api\\DepartmentController@getDeptsTree","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u6839\u636e\u89d2\u8272id\u83b7\u53d6\u90e8\u95e8\u6811","created_at":"2016-12-01 00:29:41","updated_at":"2016-12-01 00:29:41","sort":6,"children":[]},{"id":"46F34AEA-8985-C8CB-DFC4-95DD77A75C33","res_action":"App\\Http\\Controllers\\Api\\AuthController@refreshToken","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5237\u65b0token","created_at":"2016-12-01 00:30:23","updated_at":"2016-12-01 00:30:23","sort":7,"children":[]},{"id":"4D2305DF-F08E-C9F9-D6FF-01B3CC0134AF","res_action":"App\\Http\\Controllers\\Api\\AuthController@resetPassword","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u4fee\u6539\u5bc6\u7801","created_at":"2016-12-01 00:30:46","updated_at":"2016-12-01 00:30:46","sort":8,"children":[]},{"id":"28290BA1-EC04-695F-CB60-FCCED4851E6B","res_action":"App\\Http\\Controllers\\Api\\AuthController@logoff","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u7528\u6237\u767b\u51fa","created_at":"2016-12-01 00:31:11","updated_at":"2016-12-01 00:31:11","sort":9,"children":[]},{"id":"DEB17C1B-CAF0-5FB8-D756-A7FC497B6755","res_action":"App\\Http\\Controllers\\Api\\DepartmentController@getDeptsByParent","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u6839\u636e\u7236\u7ea7\u90e8\u95e8id\u83b7\u53d6\u5b50\u7ea7\u90e8\u95e8id\uff08\u5217\u8868\u5f62\u5f0f\uff09","created_at":"2016-12-01 00:31:38","updated_at":"2016-12-01 00:31:38","sort":10,"children":[]},{"id":"77BB60BC-037E-BCBA-DD9A-94561BD6B590","res_action":"App\\Http\\Controllers\\Api\\DepartmentController@index","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5206\u9875\u83b7\u53d6\u90e8\u95e8\u4fe1\u606f","created_at":"2016-12-01 00:32:08","updated_at":"2016-12-01 00:32:08","sort":11,"children":[]},{"id":"B6946BAF-49A2-6404-2E67-978034DFD326","res_action":"App\\Http\\Controllers\\Api\\UserController@getDeptManagerByDeptId","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u6839\u636e\u90e8\u95e8id\u83b7\u53d6\u90e8\u95e8\u7ba1\u7406\u5458","created_at":"2016-12-01 00:32:33","updated_at":"2016-12-01 00:32:33","sort":12,"children":[]},{"id":"8E4E03E3-08F4-4176-C0DC-07C4C981394B","res_action":"App\\Http\\Controllers\\Api\\UserController@getUsersByDeptId","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u6839\u636e\u90e8\u95e8id\u83b7\u53d6\u90e8\u95e8\u5458\u5de5","created_at":"2016-12-01 00:33:09","updated_at":"2016-12-01 00:33:09","sort":13,"children":[]},{"id":"736996C9-378A-6B03-C4D5-1B3575455703","res_action":"App\\Http\\Controllers\\Api\\UserController@index","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5206\u9875\u83b7\u53d6\u5458\u5de5\u4fe1\u606f","created_at":"2016-12-01 00:33:33","updated_at":"2016-12-01 00:33:33","sort":14,"children":[]},{"id":"5BB8FD95-C169-95E1-78A7-8FB7FD56D37F","res_action":"App\\Http\\Controllers\\Api\\AuthController@getUserInfo","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u6839\u636etoken\u83b7\u53d6\u7528\u6237\u4fe1\u606f","created_at":"2016-12-13 02:22:19","updated_at":"2016-12-13 02:22:19","sort":15,"children":[]},{"id":"A5DDF06E-F2C6-B9AA-02E9-17B7B89CE2FA","res_action":"App\\Http\\Controllers\\Api\\UserController@uploadAvatar","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u4e0a\u4f20\u5934\u50cf","created_at":"2017-02-08 17:13:39","updated_at":"2017-02-08 17:13:39","sort":16,"children":[]},{"id":"CD83DD67-CB37-D69B-B75B-5E500A21C8C0","res_action":"App\\Http\\Controllers\\Api\\DingDingController@scanCode","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u9489\u9489\u7ed1\u5b9a","created_at":"2017-02-15 10:56:57","updated_at":"2017-02-15 10:56:57","sort":17,"children":[]},{"id":"08BB0BAC-BAC0-6D22-B6C2-58D1D03D9528","res_action":"App\\Http\\Controllers\\Api\\DingDingController@scanCodeLogin","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u9489\u9489\u626b\u7801\u767b\u5f55","created_at":"2017-02-15 10:57:19","updated_at":"2017-02-15 10:57:19","sort":18,"children":[]},{"id":"5A6A523D-0921-C13B-FF1E-E3493DF456F3","res_action":"App\\Http\\Controllers\\Api\\DingDingController@cancelScanCode","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u9489\u9489\u53d6\u6d88\u7ed1\u5b9a","created_at":"2017-02-15 10:57:33","updated_at":"2017-02-15 10:57:33","sort":19,"children":[]},{"id":"D9F48D08-6F4E-12F1-8576-4A22160E0FC4","res_action":"App\\Http\\Controllers\\Api\\WechatController@scanCode","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5fae\u4fe1\u7ed1\u5b9a\u626b\u7801","created_at":"2017-02-15 13:52:25","updated_at":"2017-02-15 13:52:25","sort":20,"children":[]},{"id":"91AB453B-0EAB-DE96-14D2-5CB28E01C646","res_action":"App\\Http\\Controllers\\Api\\WechatController@scanCodeLogin","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5fae\u4fe1\u626b\u7801\u767b\u5f55","created_at":"2017-02-15 13:52:40","updated_at":"2017-02-15 13:52:40","sort":21,"children":[]},{"id":"9C3EC8DF-59BE-2BF3-CEBB-80CB3235FCA0","res_action":"App\\Http\\Controllers\\Api\\WechatController@cancelScanCode","is_action":1,"res_parent":"70B974F5-0A75-57E3-AD53-574AE77A54B9","res_note":"\u5fae\u4fe1\u89e3\u7ed1","created_at":"2017-02-15 13:52:54","updated_at":"2017-02-15 13:52:54","sort":22,"children":[]}]},{"id":"756F4DFA-410E-58E8-EBA8-DF8DECDBC57D","res_action":"App\\Http\\Controllers\\Api\\DPMS","is_action":1,"res_parent":"0000","res_note":"DPMS","created_at":"2017-02-06 13:36:24","updated_at":"2017-02-06 13:36:24","sort":8,"children":[{"id":"EC056295-BCFD-73C8-C591-BF5057D431D8","res_action":"App\\Http\\Controllers\\Api\\TermInquiryAndInspection","is_action":1,"res_parent":"756F4DFA-410E-58E8-EBA8-DF8DECDBC57D","res_note":"\u8bbe\u5907\u67e5\u8be2\u4e0e\u68c0\u67e5","created_at":"2017-02-06 13:39:23","updated_at":"2017-02-06 13:39:23","sort":2,"children":[{"id":"07593D26-746A-C599-79C4-DB378A04AD50","res_action":"App\\Http\\Controllers\\Api\\TermSerach","is_action":1,"res_parent":"EC056295-BCFD-73C8-C591-BF5057D431D8","res_note":"\u8bbe\u5907\u68c0\u7d22","created_at":"2017-02-06 13:46:49","updated_at":"2017-02-06 13:46:49","sort":0,"children":[{"id":"84B4E93E-6F5A-14D3-5851-ACE73C81C658","res_action":"App\\Http\\Controllers\\Api\\TerminalController@search","is_action":1,"res_parent":"07593D26-746A-C599-79C4-DB378A04AD50","res_note":"\u8bbe\u5907\u68c0\u7d22","created_at":"2017-02-06 13:58:37","updated_at":"2017-02-06 13:58:37","sort":0,"children":[]},{"id":"9FDF9183-DF87-46E7-BE2A-89AB50C36FE5","res_action":"App\\Http\\Controllers\\Api\\TerminalController@getBatchNo","is_action":1,"res_parent":"07593D26-746A-C599-79C4-DB378A04AD50","res_note":"\u83b7\u53d6\u751f\u4ea7\u6279\u6b21","created_at":"2017-02-06 13:59:50","updated_at":"2017-02-06 13:59:50","sort":2,"children":[]},{"id":"2DCB02DF-2017-B19E-E9C5-29022925678C","res_action":"App\\Http\\Controllers\\Api\\TerminalController@searchTerminalExport","is_action":1,"res_parent":"07593D26-746A-C599-79C4-DB378A04AD50","res_note":"\u8bbe\u5907\u68c0\u7d22\u5bfc\u51fa","created_at":"2017-02-06 14:00:25","updated_at":"2017-02-06 14:00:25","sort":3,"children":[]}]},{"id":"E650FD4B-8603-130B-ED2A-C406E2268571","res_action":"App\\Http\\Controllers\\Api\\BoxSearch","is_action":1,"res_parent":"EC056295-BCFD-73C8-C591-BF5057D431D8","res_note":"\u7bb1\u53f7\u68c0\u7d22","created_at":"2017-02-06 13:47:27","updated_at":"2017-02-06 13:47:27","sort":1,"children":[{"id":"472FCF26-D11D-450D-83BA-0D583EFA4470","res_action":"App\\Http\\Controllers\\Api\\BoxController@search","is_action":1,"res_parent":"E650FD4B-8603-130B-ED2A-C406E2268571","res_note":"\u7bb1\u53f7\u68c0\u7d22","created_at":"2017-02-06 14:01:22","updated_at":"2017-02-06 14:01:22","sort":0,"children":[]},{"id":"010BA98E-6041-2A42-9D19-4FADF5439082","res_action":"App\\Http\\Controllers\\Api\\BoxController@getDest","is_action":1,"res_parent":"E650FD4B-8603-130B-ED2A-C406E2268571","res_note":"\u83b7\u53d6\u53d1\u8d27\u5730","created_at":"2017-02-06 14:01:59","updated_at":"2017-02-06 14:01:59","sort":1,"children":[]},{"id":"6B9BF3A1-839D-727F-0C29-8512A3E8CCB7","res_action":"App\\Http\\Controllers\\Api\\BoxController@getBoxBatchNo","is_action":1,"res_parent":"E650FD4B-8603-130B-ED2A-C406E2268571","res_note":"\u83b7\u53d6\u751f\u4ea7\u6279\u6b21\u7f16\u53f7","created_at":"2017-02-06 14:02:14","updated_at":"2017-02-06 14:02:14","sort":2,"children":[]},{"id":"BF4B4A2A-ED07-98BD-0BC8-DA44FAFB5708","res_action":"App\\Http\\Controllers\\Api\\BoxController@getCustomerType","is_action":1,"res_parent":"E650FD4B-8603-130B-ED2A-C406E2268571","res_note":"\u83b7\u53d6\u5ba2\u6237\u7c7b\u522b","created_at":"2017-02-06 14:06:13","updated_at":"2017-02-06 14:06:13","sort":3,"children":[]}]},{"id":"E38AE624-F988-5F27-5576-E6EA25A885BC","res_action":"App\\Http\\Controllers\\Api\\TermParamSearch","is_action":1,"res_parent":"EC056295-BCFD-73C8-C591-BF5057D431D8","res_note":"\u6a21\u5757\u7f16\u53f7\u68c0\u7d22","created_at":"2017-02-06 13:48:23","updated_at":"2017-02-06 13:48:23","sort":2,"children":[{"id":"084759F7-2930-B8FD-D94A-703F68AB9EC0","res_action":"App\\Http\\Controllers\\Api\\TerminalController@getTermParamsInfo","is_action":1,"res_parent":"E38AE624-F988-5F27-5576-E6EA25A885BC","res_note":"\u6a21\u5757\u7f16\u53f7\u68c0\u7d22","created_at":"2017-02-06 15:44:43","updated_at":"2017-02-06 15:44:43","sort":0,"children":[]}]},{"id":"2F6C67F0-5FC8-B8A6-E80A-14BE3E137224","res_action":"App\\Http\\Controllers\\Api\\TermInquiryAndInspectionGeneral","is_action":1,"res_parent":"EC056295-BCFD-73C8-C591-BF5057D431D8","res_note":"\u901a\u7528","created_at":"2017-02-06 14:04:05","updated_at":"2017-02-06 14:04:05","sort":4,"children":[{"id":"648AB4F0-DDC1-DEC9-36D3-290BF861487A","res_action":"App\\Http\\Controllers\\Api\\TerminalController@getBillId","is_action":1,"res_parent":"2F6C67F0-5FC8-B8A6-E80A-14BE3E137224","res_note":"\u83b7\u53d6\u53d1\u8d27\u6279\u6b21","created_at":"2017-02-06 14:04:34","updated_at":"2017-02-06 14:04:34","sort":0,"children":[]}]},{"id":"961A6C2B-69C1-C58E-8E0F-510768E4D585","res_action":"App\\Http\\Controllers\\Api\\customerController","is_action":1,"res_parent":"EC056295-BCFD-73C8-C591-BF5057D431D8","res_note":"\u5ba2\u6237\u53f7\u67e5\u8be2","created_at":"2017-02-20 19:58:41","updated_at":"2017-02-20 19:58:41","sort":5,"children":[{"id":"DFA093D6-A7B9-C4DA-852F-6EC097EEBCDA","res_action":"App\\Http\\Controllers\\Api\\TerminalController@getCusNoInfo","is_action":1,"res_parent":"961A6C2B-69C1-C58E-8E0F-510768E4D585","res_note":"\u641c\u7d22\u5ba2\u6237\u53f7","created_at":"2017-02-21 09:22:47","updated_at":"2017-02-21 09:22:47","sort":0,"children":[]},{"id":"8225436A-34ED-F8E7-2D80-FAB6B04F242B","res_action":"App\\Http\\Controllers\\Api\\TerminalController@searchCusNoExport","is_action":1,"res_parent":"961A6C2B-69C1-C58E-8E0F-510768E4D585","res_note":"\u5bfc\u51fa\u641c\u7d22\u5ba2\u6237\u53f7","created_at":"2017-03-07 09:30:49","updated_at":"2017-03-07 09:30:49","sort":1,"children":[]}]},{"id":"E04A1F53-D449-9E29-36AE-40ED99F28569","res_action":"App\\Http\\Controllers\\Api\\returnSearchsController","is_action":1,"res_parent":"EC056295-BCFD-73C8-C591-BF5057D431D8","res_note":"\u9000\u8d27\u67e5\u8be2","created_at":"2017-02-20 19:59:18","updated_at":"2017-02-20 19:59:18","sort":7,"children":[{"id":"5A19B035-8D5E-F7D7-005E-A3E8D9465FD4","res_action":"App\\Http\\Controllers\\Api\\TermOutController@search","is_action":1,"res_parent":"E04A1F53-D449-9E29-36AE-40ED99F28569","res_note":"\u9000\u8d27\u67e5\u8be2\u641c\u7d22","created_at":"2017-02-21 09:24:08","updated_at":"2017-02-21 09:24:08","sort":0,"children":[]}]}]},{"id":"ED07CD80-5E2E-C481-3C2D-92DC3D8CCD04","res_action":"App\\Http\\Controllers\\Api\\ContractManagement","is_action":1,"res_parent":"756F4DFA-410E-58E8-EBA8-DF8DECDBC57D","res_note":"\u5408\u540c\u7ba1\u7406","created_at":"2017-02-06 13:40:12","updated_at":"2017-02-06 13:40:12","sort":3,"children":[{"id":"0F70E620-C58E-2B14-F45C-615465600A2E","res_action":"App\\Http\\Controllers\\Api\\GenerateTermFile","is_action":1,"res_parent":"ED07CD80-5E2E-C481-3C2D-92DC3D8CCD04","res_note":"\u751f\u6210\u8bbe\u5907\u6587\u4ef6","created_at":"2017-02-06 13:52:04","updated_at":"2017-02-06 13:52:04","sort":2,"children":[{"id":"FAFBB0A9-8734-85D8-FBCA-2A9E26B710F7","res_action":"App\\Http\\Controllers\\Api\\TermOutFileController@outfile","is_action":1,"res_parent":"0F70E620-C58E-2B14-F45C-615465600A2E","res_note":"\u751f\u6210\u51fa\u5e93\u6587\u4ef6","created_at":"2017-02-06 15:27:58","updated_at":"2017-02-06 15:27:58","sort":0,"children":[]}]}]},{"id":"DD00FB5C-D8F8-B0EF-CA14-25221E78D4E6","res_action":"App\\Http\\Controllers\\Api\\MobileGenerator","is_action":1,"res_parent":"756F4DFA-410E-58E8-EBA8-DF8DECDBC57D","res_note":"\u79fb\u52a8\u91c7\u96c6\u5668","created_at":"2017-02-06 14:21:28","updated_at":"2017-02-06 14:21:28","sort":4,"children":[{"id":"5DAA70D2-B3AA-3DE5-1869-A15A347104C2","res_action":"App\\Http\\Controllers\\Api\\Out","is_action":1,"res_parent":"DD00FB5C-D8F8-B0EF-CA14-25221E78D4E6","res_note":"\u51faa\u5e93","created_at":"2017-02-06 14:23:33","updated_at":"2017-02-06 14:23:33","sort":0,"children":[{"id":"DDA1A703-1534-9E79-B7CB-280A3A4E2D15","res_action":"App\\Http\\Controllers\\Api\\TermOutController@createBill","is_action":1,"res_parent":"5DAA70D2-B3AA-3DE5-1869-A15A347104C2","res_note":"\u51fa\u5e93","created_at":"2017-02-06 14:26:25","updated_at":"2017-02-06 14:26:25","sort":0,"children":[]},{"id":"AE8A3CDB-2B63-D57D-AAE1-B80D604B813D","res_action":"App\\Http\\Controllers\\Api\\DestinationsController@getAllNode","is_action":1,"res_parent":"5DAA70D2-B3AA-3DE5-1869-A15A347104C2","res_note":"\u83b7\u53d6\u6240\u6709\u6700\u65b0\u53d1\u8d27\u5730","created_at":"2017-02-06 14:28:46","updated_at":"2017-02-06 14:28:46","sort":1,"children":[]},{"id":"0A394AE5-101F-0B5D-E671-450418974223","res_action":"App\\Http\\Controllers\\Api\\TermOutController@vmBoxNo","is_action":1,"res_parent":"5DAA70D2-B3AA-3DE5-1869-A15A347104C2","res_note":"\u7533\u8bf7\u865a\u62df\u7bb1\u53f7","created_at":"2017-02-06 14:29:38","updated_at":"2017-02-06 14:29:38","sort":2,"children":[]},{"id":"6943C296-E96F-FB51-F861-DD1FEF53E7AA","res_action":"App\\Http\\Controllers\\Api\\TermOutController@checkBoxAndTermStatus","is_action":1,"res_parent":"5DAA70D2-B3AA-3DE5-1869-A15A347104C2","res_note":"\u6821\u9a8c\u7bb1\u53f7\u548c\u8bbe\u5907\u662f\u5426\u53ef\u4ee5\u51fa\u5e93","created_at":"2017-02-06 14:31:19","updated_at":"2017-02-06 14:31:19","sort":3,"children":[]},{"id":"FFDD7F27-D6DE-FDFF-03BE-8BED3C2F1C86","res_action":"App\\Http\\Controllers\\Api\\TermOutController@vmBoxBind","is_action":1,"res_parent":"5DAA70D2-B3AA-3DE5-1869-A15A347104C2","res_note":"\u865a\u62df\u7bb1\u53f7\u4e0e\u8bbe\u5907\u7ed1\u5b9a\u51fa\u5e93","created_at":"2017-02-06 14:33:11","updated_at":"2017-02-06 14:33:11","sort":4,"children":[]}]},{"id":"36360355-AA80-F8AD-376C-D81351E1353D","res_action":"App\\Http\\Controllers\\Api\\Refuse","is_action":1,"res_parent":"DD00FB5C-D8F8-B0EF-CA14-25221E78D4E6","res_note":"\u64a4\u9500","created_at":"2017-02-06 14:36:02","updated_at":"2017-02-06 14:36:02","sort":1,"children":[{"id":"D2F0D6F5-38E8-BE71-477C-69A4AB8601BF","res_action":"App\\Http\\Controllers\\Api\\TermOutController@removeBind","is_action":1,"res_parent":"36360355-AA80-F8AD-376C-D81351E1353D","res_note":"\u64a4\u9500\u51fa\u5e93","created_at":"2017-02-06 14:36:17","updated_at":"2017-02-06 14:36:17","sort":0,"children":[]},{"id":"33266670-DEA2-8DDA-E078-CA66F7CC9D7D","res_action":"App\\Http\\Controllers\\Api\\TermOutController@checkCanRemoveBoxAndTerm","is_action":1,"res_parent":"36360355-AA80-F8AD-376C-D81351E1353D","res_note":"\u6821\u9a8c\u7bb1\u53f7\u4e0e\u8bbe\u5907\u53f7\u662f\u5426\u53ef\u4ee5\u64a4\u9500\u51fa\u5e93","created_at":"2017-02-06 14:36:46","updated_at":"2017-02-06 14:36:53","sort":1,"children":[]}]},{"id":"6840CEFD-B6D6-7E15-0DBB-B9D652AAB1DC","res_action":"App\\Http\\Controllers\\Api\\Return","is_action":1,"res_parent":"DD00FB5C-D8F8-B0EF-CA14-25221E78D4E6","res_note":"\u9000\u8d27","created_at":"2017-02-06 14:37:45","updated_at":"2017-02-06 14:37:45","sort":2,"children":[{"id":"A292AFE3-0454-6DA3-775C-53B5312746A5","res_action":"App\\Http\\Controllers\\Api\\TermOutController@checkCanReturnBoxAndTerm","is_action":1,"res_parent":"6840CEFD-B6D6-7E15-0DBB-B9D652AAB1DC","res_note":"\u6821\u9a8c\u7bb1\u53f7\u4e0e\u8bbe\u5907\u662f\u5426\u53ef\u4ee5\u9000\u8d27","created_at":"2017-02-06 14:38:10","updated_at":"2017-02-06 14:38:10","sort":0,"children":[]},{"id":"1BBD70F7-C2A3-A39F-A39F-F5CFC7848626","res_action":"App\\Http\\Controllers\\Api\\TermOutController@return","is_action":1,"res_parent":"6840CEFD-B6D6-7E15-0DBB-B9D652AAB1DC","res_note":"\u9000\u8d27","created_at":"2017-02-06 14:38:28","updated_at":"2017-02-06 14:38:28","sort":1,"children":[]}]}]},{"id":"58E8895A-3A52-C185-7657-6AB04FCC6028","res_action":"App\\Http\\Controllers\\Api\\DPMS\\general","is_action":1,"res_parent":"756F4DFA-410E-58E8-EBA8-DF8DECDBC57D","res_note":"\u901a\u7528\u6743\u9650","created_at":"2017-02-20 19:22:33","updated_at":"2017-02-20 19:22:33","sort":6,"children":[{"id":"FCFA8235-1364-EEF3-096F-1366BC5BA6F6","res_action":"App\\Http\\Controllers\\Api\\DestinationsController@getDestCustomer","is_action":1,"res_parent":"58E8895A-3A52-C185-7657-6AB04FCC6028","res_note":"\u83b7\u53d6\u53d1\u8d27\u5730\u5740\u5ba2\u6237","created_at":"2017-02-20 19:22:59","updated_at":"2017-02-20 19:22:59","sort":0,"children":[]},{"id":"548F666F-E72B-2D96-8073-F888786B612E","res_action":"App\\Http\\Controllers\\Api\\DestinationsController@getById","is_action":1,"res_parent":"58E8895A-3A52-C185-7657-6AB04FCC6028","res_note":"\u6839\u636e\u53d1\u8d27\u5730\u7236\u8282\u70b9\u83b7\u53d6\u5b50\u8282\u70b9","created_at":"2017-02-06 15:23:52","updated_at":"2017-02-06 15:23:52","sort":0,"children":[]},{"id":"D8CB6A7F-9D8B-9C71-2805-E82C4CEEA8F9","res_action":"App\\Http\\Controllers\\Api\\DestinationsController@getProvinces","is_action":1,"res_parent":"58E8895A-3A52-C185-7657-6AB04FCC6028","res_note":"\u83b7\u53d6\u5ba2\u6237\u540d\u79f0","created_at":"2017-02-06 14:48:39","updated_at":"2017-02-06 14:48:39","sort":1,"children":[]}]}]}],        //所有权限数据
        perSetting: {          //权限树配置
          children: 'children',
          label: 'res_note'
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
