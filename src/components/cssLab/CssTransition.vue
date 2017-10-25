<template>
  <div class="dj-transition">
    <div style="position: relative;border: 2px solid red;">
      <div>
        <h2>鼠标经过进行过渡</h2>
      </div>
      <div class="rotate-block" style="vertical-align: top;">旋转</div>
      <div class="rotate-circle" style="vertical-align: top;margin-left: 10px;"></div>
    </div>
    <div style="position: relative; margin-top: 10px; border: 2px solid red;">
      <div>
        <h2>鼠标经过进行动画</h2>
      </div>
      <button class="dj-btn dj-btn-info shake-block" @click="sayMe">抖动的按钮</button>
      <el-table class="shake-block-sm" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="小抖动" width="180"></el-table-column>
        <el-table-column prop="name" label="小抖动" width="180"></el-table-column>
        <el-table-column prop="address" label="小抖动" width="auto"></el-table-column>
      </el-table>
    </div>
    <div style="position: relative; height: 100px;margin-top: 10px; border: 2px solid red;">
      <div>
        <h2>开枪 射击？</h2>
      </div>
      <div class="gun" style="margin-left: 130px">
        <div class="gun-butt"></div>
        <div class="gun-leg-left"></div>
        <div class="gun-leg-right"></div>
        <div class="gun-leg-mouth"></div>
        <div class="gun-bullet"></div>
        <div class="gun-bullet"></div>
        <div class="gun-bullet"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){

    },
    data(){
      return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },{
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }
    },
    methods:{
      sayMe(){
        alert(1)
      }
    }
  }
</script>
<style lang='scss'>

</style>
