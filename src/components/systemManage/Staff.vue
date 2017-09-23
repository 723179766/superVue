<template>
  <div class="staff">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form label-width="80px">
          <el-form-item label="所属机构">
            <el-cascader style="width: 100%"
                         :options="getOrgData"
                         :props="props"
                         v-model="orgArrData"
                         @change="handleChange"
                         change-on-select>
            </el-cascader>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="staffSearch">查询</el-button>
        <el-button type="info" @click="orgReset">重置</el-button>
      </el-col>
    </el-row>

    <div class="margin-b-22">
      <el-button type="success" @click="staffAdd">新增</el-button>
      <el-button type="warning" @click="staffMod">修改</el-button>
      <el-button type="danger" @click="staffDel">删除</el-button>
    </div>

    <div class="margin-b-22">
      <el-table
        :data="thisPageData"
        border
        @row-click="rowClick"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="user_name"
          label="姓名">
        </el-table-column>
        <el-table-column label="性别">
          <template scope="scope">
            <div>{{scope.row.sex | sex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_phone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="job_number"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="organization.org_name"
          label="所属机构">
        </el-table-column>
        <el-table-column label="角色">
          <template scope="scope">
            <div class="show-ellipsis" v-for="item in scope.row.roles" :title="item.role_name">{{item.role_name}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="margin-b-22">
      <el-pagination class="clear-padding"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <el-dialog title="人员添加" :visible.sync="addModel">
      <el-form ref="formAdd" :model="formAdd" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="formAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formAdd.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formAdd.phone"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-input v-model="formAdd.org_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色组">
          <el-checkbox-group v-model="formAdd.roleArr">
            <el-row>
              <el-col :span="6" v-for="item in roleArr">
                <el-checkbox :label="item.id" :key="item.id">{{item.role_name}}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="formAdd.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formAdd.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="formAdd.surePwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sureStaffAdd('formAdd')">确定</el-button>
          <el-button @click="resetForm('formAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="人员修改" :visible.sync="modModel">
      <el-form ref="formMod" :model="formMod" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="formMod.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formMod.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色组">
          <el-checkbox-group v-model="formMod.roleArr">
            <el-row>
              <el-col :span="6" v-for="item in roleArr">
                <el-checkbox :label="item.id" :key="item.id">{{item.role_name}}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sureStaffMod('formMod')">确定</el-button>
          <el-button @click="resetForm('formMod')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'
  import md5 from 'js-md5'
  export default {
    name: 'Staff',
    created(){
      let vm = this;
      let orgId = vm.getUserOrgId();
      vm.orgId = orgId;
      vm.getStaffList(orgId);
      axios.get(API + '/role').then(function (resp){
        if(resp.data.code=='00000'){
          vm.roleArr = resp.data.data;
        }
      });
    },
    data(){
      return {
        formAdd: {
          name: '',
          sex: '',
          phone: '',
          org_id: '',
          roleArr: [],
          account: '',
          pwd: '',
          surePwd: ''
        },
        formMod: {
          id: '',
          name: '',
          sex: '',
          roleArr: [],
          org_id: ''
        },
        addModel: false,
        modModel: false,
        thisRowData: null,
        getOrgData: [],
        orgArrData: [],
        props: {
          value: 'id',
          label: 'org_name',
          children: 'children'
        },
        roleArr: [],
        orgId: '',
        tableData: [],
        thisPageData: [],
        currentPage: 1,
        pageSize: 6,
        total: 0
      }
    },
    methods:{
      staffSearch(){
        if(this.orgArrData.length==0){
          let orgId = this.getUserOrgId();
          this.getStaffList(orgId);
        }else{
          this.getStaffList(this.orgArrData[this.orgArrData.length-1]);
        }
      },
      orgReset(){
        let orgId = this.getUserOrgId();
        this.orgArrData = [orgId];
      },
      staffAdd(){
        this.addModel = true;
        let orgId = '';
        if(this.orgArrData.length!=0){
          orgId = this.orgArrData[this.orgArrData.length-1];
        }else{
          orgId = this.orgId;
        }
        this.formAdd = {
          name: '',
          sex: '0',
          phone: '',
          org_id: orgId,
          roleArr: [],
          account: '',
          pwd: '',
          surePwd: ''
        };
      },
      sureStaffAdd(formName){
        axios({
          method: 'post',
          url: API + '/user/add',
          data: {
            org_id: this.formAdd.org_id,
            sex: this.formAdd.sex,
            pass_word: md5(this.formAdd.pwd),
            confirm_password: md5(this.formAdd.surePwd),
            user_name: this.formAdd.name,
            role_id: this.formAdd.roleArr,
            user_phone: this.formAdd.phone,
            job_number: this.formAdd.account
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            this.getStaffList(this.formAdd.org_id);
            this.thisRowData = null;
            this.addModel = false;
          }
        });
      },
      resetForm(formName){
        if(formName=='formAdd'){
          this.addModel = false;
//          this.$refs[formName].resetFields();
        }
        if(formName=='formMod'){
          this.modModel = false;
        }
      },
      staffMod(){
        if(this.thisRowData==null){
          this.$message('请选择您要修改的数据');
          return;
        }
        let modRoleArr = [];
        for(let i=0;i<this.thisRowData.roles.length;i++){
          modRoleArr.push(this.thisRowData.roles[i].id);
        }
        this.formMod = {
          id: this.thisRowData.id,
          name: this.thisRowData.user_name,
          sex: this.thisRowData.sex,
          roleArr: modRoleArr,
          org_id: this.thisRowData.org_id
        };
        this.modModel = true;
      },
      sureStaffMod(){
        axios({
          method: 'post',
          url: API + '/user/edit',
          data: {
            user_id: this.formMod.id,
            sex: this.formMod.sex,
            user_name: this.formMod.name,
            role_id: this.formMod.roleArr
          }
        }).then(resp=>{
          if(resp.data.code=="00000"){
            this.getStaffList(this.formMod.org_id);
            this.thisRowData = null;
            this.modModel = false;
          }
        });
      },
      staffDel(){
        if(this.thisRowData==null){
          this.$message('请选择您要删除的数据');
          return;
        }
        this.$confirm('此操作将删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method: 'delete',
            url: API + '/user/del/',
            params: {
              user_id: this.thisRowData.id
            }
          }).then(resp=>{
            if(resp.data.code=="00000"){
              this.getStaffList(this.thisRowData.org_id);
              this.thisRowData = null;
              this.$message({
                type: 'success',
                message: '删除成功!'
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
      handleChange(value){
        console.log(value);
      },
      rowClick(row){
        this.thisRowData = row;
      },
      //分页改变页数
      handleCurrentChange(val){
        this.thisRowData = null;
        this.currentPage = val;
        this.getCurrentPageInfo(this.tableData);
      },
      //分页函数
      getCurrentPageInfo(list) {
        var num = parseInt(this.pageSize),
          startIndex = (this.currentPage - 1) * num,
          endIndex = startIndex + num;
        this.thisPageData = list.slice(startIndex, endIndex);
      },
      //获取人员列表
      getStaffList(orgId){
        let vm = this;
        let prs_id = JSON.parse(sessionStorage.getItem('userInfo')).prs_id;
        axios.post(API + '/user/get/500',{
          org_id: orgId,
          prs_id: prs_id
        }).then(function(resp){
          if(resp.data.code=="00000"){
            vm.tableData = resp.data.data.data;
            vm.getCurrentPageInfo(resp.data.data.data);
            vm.total = resp.data.data.data.length;
          }
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
      }
    },
    mounted(){
      this.initOrgTree();
    }
  }
</script>

<style scoped>
  .margin-b-22{
    margin-bottom: 22px;
  }
  .clear-padding{
    padding: 0;
  }
  .show-ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: help;
  }
</style>
