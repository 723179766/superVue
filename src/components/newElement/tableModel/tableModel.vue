<template>
  <div class="table-model">

    <div class="mg-table">
      <div class="table-header">
        <div class="table-header-tr">
          <div class="table-header-th">
            <span>账号种类</span>
            <i class="el-icon-information"></i>
          </div>
          <div class="table-header-th">
            <span>子分类</span>
            <i class="el-icon-information"></i>
          </div>
          <div class="table-header-th">
            <span>起始账号</span>
            <i class="el-icon-information"></i>
          </div>
        </div>
      </div>

      <div class="table-body">
        <div class="table-body-tr" v-for="item in searchData">
          <div class="table-body-td">
            <el-checkbox v-model="item.checked">{{item.name}}</el-checkbox>
            <i class="el-icon-information"></i>
          </div>
          <div class="table-body-td">
            <el-tag v-for="tag in item.childType" :key="tag.key" :closable="true" type="success">
              {{tag.label}}
            </el-tag>
            <i class="el-icon-plus"></i>添加分类
          </div>
          <div class="table-body-td">
            <el-input v-model="item.startAccount" placeholder="请输入内容" :disabled="item.checked===false"></el-input>
          </div>
        </div>
      </div>
    </div>

    <el-alert class="margin-top-15 margin-bottom-15"
      title="可固定的表格"
      type="success">
    </el-alert>

    <div class="margin-bottom-15">
      <el-tag class="margin-right-10" :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">{{tag}}</el-tag>
      <el-input v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style="display: inline-block;width: 100px;"></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>

    <div class="mg-table2">
      <div class="table-header">
        <div class="table-header-tr" style="position: relative; right: 0;">
          <div class="table-header-th">
            <span>账号类型</span>
          </div>
          <div class="table-header-th">
            <span>账号种类</span>
          </div>
          <div class="table-header-th">
            <span>账号种类-子分类</span>
          </div>
          <div class="table-header-th">
            <span>货币</span>
          </div>
          <div class="table-header-th">
            <span>点值</span>
          </div>
          <div class="table-header-th">
            <span>佣金</span>
          </div>
          <div class="table-header-th" style="min-width: 200px;"></div>
          <div class="table-header-th" style="min-width: 200px; position: absolute; right: 0;">
            <span>group</span>
            <i class="el-icon-information"></i>
          </div>
        </div>
      </div>
      <div class="table-body">
        <div class="table-body-tr" v-for="item in [1,2,3,4,5]" style="position: relative">
          <div class="table-body-td">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="黄金" value="good"></el-option>
            </el-select>
          </div>
          <div class="table-body-td">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="黄金" value="good"></el-option>
            </el-select>
          </div>
          <div class="table-body-td">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="黄金" value="good"></el-option>
            </el-select>
          </div>
          <div class="table-body-td">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="黄金" value="good"></el-option>
            </el-select>
          </div>
          <div class="table-body-td">
            <el-input placeholder="请输入"></el-input>
          </div>
          <div class="table-body-td">
            <el-input placeholder="请输入"></el-input>
          </div>
          <div class="table-body-td" style="min-width: 200px;"></div>
          <div class="table-body-td last-td" style="min-width: 200px; position: absolute; right: 0;">
              <el-input placeholder="请输入"></el-input>
              <i class="el-icon-delete"></i>
          </div>
        </div>
        <div class="table-body-tr">
          <div class="table-body-td">
            添加
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data () {
      return {
        checkbox: '',
        input: '',
        searchData: [
          {
            name: '交易账号',
            checked: true,
            startAccount: '723179766',
            childType: []
          },
          {
            name: '投资账号',
            checked: true,
            startAccount: '18351990218',
            childType: []
          },
          {
            name: 'PAMM账号',
            checked: true,
            startAccount: '15975487575',
            childType: [
              {
                key: 100,
                label: 'FT FOUND MANAGER'
              },
              {
                key: 101,
                label: 'FT ASDGG GDSFGH'
              },
              {
                key: 102,
                label: 'FT QWEQR EREBMZ'
              },
              {
                key: 103,
                label: 'FT QWEQR SSSSSS'
              },
              {
                key: 104,
                label: 'FT FFFFAZ ZAAS'
              }
            ]
          },
          {
            name: '返佣账号',
            checked: false,
            startAccount: '',
            childType: []
          },
          {
            name: '托管转账账号',
            checked: false,
            startAccount: '',
            childType: []
          }
        ],
        dynamicTags: ['标签一1', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      }
    },
    created () {
      console.log(1234)
    },
    methods: {
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>

<style>
  .table-model{
  }
  .mg-table{
    width: 1200px;
    border: 1px solid #dfe6ec
  }
  .table-header{
    background: #eef1f6;
  }
  .table-header-tr{
    display: flex;
    border-bottom: 1px solid #dfe6ec
  }
  .table-header-th{
    flex: 1;
    height: 44px;
    line-height: 44px;
    min-width: 150px;
    padding: 0 15px;
  }
  .table-body{
    background: #fff;
  }
  .table-body-tr{
    display: flex;
    width: 100%;
  }
  .table-body-tr:not(:last-child){
    border-bottom: 1px solid #dfe6ec
  }
  .table-body-td{
    flex: 1;
    min-height: 44px;
    line-height: 44px;
    min-width: 150px;
    padding: 0 15px;
  }
  .table-body-td .el-tag{
    margin-right: 10px;
  }

  .mg-table2{
    border: 1px solid #dfe6ec;
  }
  .mg-table2 .table-header{
  }
  .mg-table2 .table-body{
    width: 100%;
    height: 210px;
    overflow-x: auto;
  }
  .last-td .el-input{
    width: auto;
  }
  .last-td .el-input__inner{
    display: inline-block;
    width: 142px;
  }
  .ss{
    background: lightskyblue;
  }
</style>
