<template>
  <div class="">
    <!--<el-btn :comProp="comProp"></el-btn>-->
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :render-header="renderHeader" prop="date" label="日期" width="180"></el-table-column>
        <el-table-column :render-header="renderHeader" prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import elBtn from './qy-btn/elBtn.vue'
  export default {
    components:{
      elBtn
    },
    created(){

    },
    data(){
      return{
        comProp: 'color-success',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods:{
      clickHandler(){
        alert('终于生效了')
      },
      renderHeader: function (h, { column, $index }) {
        return h('div',[
          h('span',column.label),
          h('span', {
            attrs: {
              id: 'span'
            }
          },'hcy'),
          h('i',{
            on: {
              click: this.clickHandler
            },
            style: {
              color: 'red',
              fontSize: '14px'
            }
          }, '我可以点击？')
        ])
      }
    }
  }
</script>
<style lang='scss'>

</style>
