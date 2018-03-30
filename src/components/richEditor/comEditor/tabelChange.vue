<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="data1"
        label="score1"
        width="180">
      </el-table-column>
      <el-table-column
        prop="data2"
        label="score2">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          data1: 246214,
          data2: 123456
        }, {
          data1: 989521,
          data2: 654321
        }]
      }
    },
    methods: {
//      dataChange () {
//        let vm = this
//        vm.tableData.forEach(function (val) {
//          val.data1 = val.data1 + 1
//          val.data2 = val.data2 + 1
//          console.log(val.data2)
//          setTimeout(vm.dataChange(), 2000)
//        })
//      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>

<style>
</style>
