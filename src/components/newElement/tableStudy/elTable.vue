<template>
  <div class="fengzhuang-eltable">
    <el-table :data="tableData" style="width: 100%" :row-class-name="getRowClass">
      <el-table-column type="expand" v-if="tableType.expand">
        <template scope="props">
          <span>{{ props.row }}</span>
        </template>
      </el-table-column>

      <el-table-column v-for="(item,index) in tableConfig" v-if="item.auth" :label="item.label" :prop="item.dataKey"></el-table-column>
      <el-table-column label="自定义渲染列" :formatter="formatter"></el-table-column>
      <el-table-column label="更多" v-if="tableType.more">
        <template scope="scope">
          <el-dropdown trigger="click" menu-align="start">
            <span class="el-dropdown-link">操作</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data () {
      return {

      }
    },
    created () {

    },
    methods: {
      getRowClass: function (row, index) {
        if(row.brother.length>0){
          console.log(row)
          console.log(index)
          return ''
        }else {
          return 'hide-expand'
        }
      }
    },
    props: {
      tableData: {
        type: Array
      },
      tableConfig: {
        type: Array
      },
      tableType: {
        type: Object
      },
      formatter: {
        type: Function
      }
    }
  }
</script>

<style lang="scss">
  .fengzhuang-eltable{
  .hide-expand{
  .el-table__expand-icon{
    display: none;
  }
  }
  .el-table__expanded-cell{
    padding: 0;
  }
  }
</style>
