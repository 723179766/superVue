<template>
  <div class="org">
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
        <el-button type="primary" @click="orgSearch">查询</el-button>
        <el-button type="info" @click="orgReset">重置</el-button>
      </el-col>
    </el-row>

    <div class="margin-b-22">
      <el-button type="success" @click="orgAdd">新增</el-button>
      <el-button type="warning" @click="orgMod">修改</el-button>
      <el-button type="danger" @click="orgDel">删除</el-button>
    </div>

    <div class="margin-b-22">
      <el-table :data="thisPageData"
                border
                @row-click="rowClick"
                highlight-current-row
                style="width: 100%">
        <el-table-column
          prop="org_name"
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="id"
          label="机构号">
        </el-table-column>
        <el-table-column
          prop="org_addr"
          label="机构地址">
        </el-table-column>
        <el-table-column
          prop="org_par_name"
          label="上级机构">
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-pagination class="clear-padding"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     layout="prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <el-dialog title="机构添加" :visible.sync="addModel">
      <el-form :model="formAdd" :rules="rulesAdd" ref="formAdd" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机构代码" prop="orgId">
          <el-input v-model="formAdd.orgId"></el-input>
        </el-form-item>
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="formAdd.orgName"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="orgAddr">
          <el-input v-model="formAdd.orgAddr"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="orgTel">
          <el-input v-model="formAdd.orgTel"></el-input>
        </el-form-item>
        <el-form-item label="上级机构" prop="orgParent">
          <el-input v-model="formAdd.orgParent" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="orgSureAdd('formAdd')">确定</el-button>
          <el-button @click="resetForm('formAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="机构修改" :visible.sync="modModel">
      <el-form :model="formMod" :rules="rulesMod" ref="formMod" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机构代码" prop="orgId">
          <el-input v-model="formMod.orgId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="formMod.orgName"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="orgAddr">
          <el-input v-model="formMod.orgAddr"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="orgTel">
          <el-input v-model="formMod.orgTel"></el-input>
        </el-form-item>
        <el-form-item label="上级机构" prop="orgParent">
          <el-input v-model="formMod.orgParent" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="orgSureMod('formMod')">确定</el-button>
          <el-button @click="resetForm('formMod')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'
  export default {
    name: 'Org',
    created(){
      let orgId = this.getUserOrgId();
      this.orgId = orgId;
      this.getChildOrg(orgId);
    },
    data(){
      return {
        loading2: false,
        formAdd: {
          orgId: '',
          orgName: '',
          orgAddr: '',
          orgTel: '',
          orgParent: ''
        },
        rulesAdd: {
          orgId: [
            { required: true, message: '请输入机构代码', trigger: 'change' },
            { max: 20, message: '长度在20字节以内', trigger: 'change' }
          ],
          orgName: [
            { required: true, message: '请输入机构名称', trigger: 'change' },
            { max: 20, message: '长度在20字节以内', trigger: 'change' }
          ],
          orgAddr: [
            { required: true, message: '请输入机构地址', trigger: 'change' },
            { max: 50, message: '长度在50字节以内', trigger: 'change' }
          ],
          orgTel: [
            { required: true, message: '请输入联系方式', trigger: 'change' },
            { max: 20, message: '长度在20字节以内', trigger: 'change' }
          ],
          orgParent: [
            { required: true, message: '父机构必须存在', trigger: 'change' }
          ]
        },
        formMod: {
          orgId: '',
          orgName: '',
          orgAddr: '',
          orgTel: '',
          orgParent: ''
        },
        rulesMod: {
          orgId: [
            { required: true, message: '请输入机构代码', trigger: 'change' },
            { max: 20, message: '长度在20字节以内', trigger: 'change' }
          ],
          orgName: [
            { required: true, message: '请输入机构名称', trigger: 'change' },
            { max: 20, message: '长度在20字节以内', trigger: 'change' }
          ],
          orgAddr: [
            { required: true, message: '请输入机构地址', trigger: 'change' },
            { max: 50, message: '长度在50字节以内', trigger: 'change' }
          ],
          orgTel: [
            { required: true, message: '请输入联系方式', trigger: 'change' },
            { max: 20, message: '长度在20字节以内', trigger: 'change' }
          ],
          orgParent: [
            { required: true, message: '父机构必须存在', trigger: 'change' }
          ]
        },
        addModel: false,
        modModel: false,
        thisRowData: null,
        orgId: '',
        getOrgData: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            },{
              value: 'xiaolv',
              label: '效率'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        },{
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        orgArrData: [],
        props: {
          value: 'value',
          label: 'label',
          children: 'children'
        },
        tableData: [
          {
            org_name: '栖霞区分行',
            id: '0001001',
            org_addr: '栖霞区下关村',
            org_par_name: '南京市'
          },
          {
            org_name: '建邺区分行',
            id: '0001002',
            org_addr: '建邺区白凤路',
            org_par_name: '南京市'
          },
          {
            org_name: '浦口分行',
            id: '0001003',
            org_addr: '浦口龙邦山',
            org_par_name: '南京市'
          },
          {
            org_name: '大河分行',
            id: '0001004',
            org_addr: '老城区',
            org_par_name: '南京市'
          }
        ],
        thisPageData: [],
        currentPage: 1,
//        pageSize: 6,
//        total: 0,
        pageSize: 3,
        total: 4
      }
    },
    methods:{
      orgSearch(){
        if(this.orgArrData.length==0){
          let orgId = this.getUserOrgId();
          this.getChildOrg(orgId);
        }else{
          this.getChildOrg(this.orgArrData[this.orgArrData.length-1]);
        }
      },
      orgReset(){
        let orgId = this.getUserOrgId();
        this.orgArrData = [orgId];
      },
      orgAdd(){
        this.addModel = true;
        let orgId = '';
        if(this.orgArrData.length!=0){
          orgId = this.orgArrData[this.orgArrData.length-1];
        }else{
          orgId = this.orgId;
        }
        this.formAdd = {
          orgId: '',
          orgName: '',
          orgAddr: '',
          orgTel: '',
          orgParent: orgId
        };
      },
      orgSureAdd(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            axios({
              method: 'post',
              url: API + '/organization/add',
              data: {
                id: this.formAdd.orgId,
                org_name: this.formAdd.orgName,
                org_addr: this.formAdd.orgAddr,
                org_tel: this.formAdd.orgTel,
                org_parent: this.formAdd.orgParent
              }
            }).then(resp=>{
              if(resp.data.code=="00000"){
                this.getChildOrg(this.formAdd.orgParent);
                this.initOrgTree();
                this.thisRowData = null;
                this.addModel = false;
                this.$refs[formName].resetFields();
              }
            });
          }
        });
      },
      resetForm(formName){
        if(formName=='formAdd'){
          this.addModel = false;
          this.$refs[formName].resetFields();
        }
        if(formName=='formMod'){
          this.modModel = false;
        }
      },
      orgMod(){
        if(this.thisRowData==null){
          this.$message('请选择您要修改的数据');
          return;
        }
        this.formMod = {
          orgId: this.thisRowData.id,
          orgName: this.thisRowData.org_name,
          orgAddr: this.thisRowData.org_addr,
          orgTel: this.thisRowData.org_tel,
          orgParent: this.thisRowData.org_parent
        };
        this.modModel = true;
      },
      orgSureMod(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            axios({
              method: 'post',
              url: API + '/organization/modify',
              data: {
                id: this.formMod.orgId,
                org_name: this.formMod.orgName,
                org_addr: this.formMod.orgAddr,
                org_tel: this.formMod.orgTel,
                org_parent: this.formMod.orgParent
              }
            }).then(resp=>{
              if(resp.data.code=="00000"){
                this.getChildOrg(this.formMod.orgParent);
                this.initOrgTree();
                this.thisRowData = null;
                this.modModel = false;
                this.$refs[formName].resetFields();
              }
            });
          }
        });
      },
      orgDel(){
        if(this.thisRowData==null){
          this.$message('请选择您要删除的数据');
          return;
        }
        this.$confirm('此操作将删除该机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method: 'get',
            url: API + '/organization/delete/' + this.thisRowData.id
          }).then(resp=>{
            if(resp.data.code=="00000"){
              this.getChildOrg(this.thisRowData.org_parent);
              this.initOrgTree();
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
      handleCurrentChange(val){
        this.thisRowData = null;
        this.currentPage = val;
        this.getCurrentPageInfo(this.tableData);
      },
      //获取机构子集
      getChildOrg(orgId){
        let vm = this;
        vm.getCurrentPageInfo(vm.tableData);
        return
        axios.get(API + '/organization/getChildOrg/' + orgId).then(function (response){
          if(response.data.code=='00000'){
            vm.tableData = response.data.data.data;
            vm.getCurrentPageInfo(response.data.data.data);
            vm.total = response.data.data.data.length;
          }
        }).catch(function (error){
          console.log(error);
        });
      },
      //分页函数
      getCurrentPageInfo(list) {
        var num = parseInt(this.pageSize),
          startIndex = (this.currentPage - 1) * num,
          endIndex = startIndex + num;
        this.thisPageData = list.slice(startIndex, endIndex);
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
</style>
