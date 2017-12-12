<template>
  <div class="table-model">

    <div class="table-header">
      <div class="table-header-tr">
        <div class="table-header-th">
          <span>表头第一个</span>
          <i class="el-icon-information"></i>
        </div>
        <div class="table-header-th">
          <span>表头第二个</span>
          <i class="el-icon-information"></i>
        </div>
        <div class="table-header-th">
          <span>表头第三个</span>
          <i class="el-icon-information"></i>
        </div>
      </div>
    </div>

    <div class="table-body">
      <div class="table-body-tr" v-for="item in [1,2,3]">
        <div class="table-body-td">
          <el-checkbox v-model="checkbox">交易账户</el-checkbox>
          <i class="el-icon-information"></i>
        </div>
        <div class="table-body-td">
          <i class="el-icon-plus"></i>添加分类
        </div>
        <div class="table-body-td">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
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
        input: ''
      }
    },
    created () {

    },
    methods: {

    }
  }
</script>

<style>
  .table-model{
  }
  .table-header{
    width: 800px;
    background: lightskyblue;
  }
  .table-header-th{
    display: table-cell;
    width: 3.5%;
    height: 44px;
    line-height: 44px;
    padding: 0 15px;
  }
  .table-body{
    width: 800px;
    background: oldlace;
  }
  .table-body-td{
    display: table-cell;
    width: 3.5%;
    height: 44px;
    line-height: 44px;
    padding: 0 15px;
  }
</style>
