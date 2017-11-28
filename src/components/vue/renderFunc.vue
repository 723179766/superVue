<template>
  <div>
    <h2>表头可拉伸</h2>
    <button class="dj-btn dj-btn-success" @click="changeTabHei">改变表格高度</button>
    <el-table
              border
              stripe
              @cell-mouse-enter="ss"
              @header-dragend="sss"
              :data="tableData"
              style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        placement="bottom"
        resizable
        prop="date"
        label="日期"
        min-width="280">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
        min-width="280">
      </el-table-column>
      <el-table-column
        header-align="left"
        align="right"
        prop="address"
        label="地址"
        min-width="280">
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){

    },
    data(){
      return{
        tabHei: '100px',
        tableData: [
          {
            date: '2016-05-021111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            name: '王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    methods:{
      ss(){
        console.log(1)
      },
      sss(){
        console.log(222)
      },
      changeTabHei(){
        this.tabHei = '200px'
      }
    }
  }
</script>
<style lang='scss'>

</style>
