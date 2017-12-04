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

    <div>
      <el-transfer v-model="value1" :data="data" :render-content="renderFunc"></el-transfer>
      <div :title="arrTitle">数组title</div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import elBtn from './qy-btn/elBtn.vue'
  export default {
    components: {
      elBtn
    },
    created () {
      var strtestgArr = ['hcy']
      console.log(strtestgArr.length)
      var strtestg = 'hcy,'
      console.log(strtestg.slice(0, strtestg.length - 1))
//      console.log(this.tableData.length)
//      console.log(this.tableData[this.tableData.length])
//      console.log(this.tableData[this.tableData.length - 1])
      console.log(this.myObj)
      let newObj = Object.assign({}, this.myObj)
      newObj.hcy = 'hahaha'
      this.myObj = {
        name: 33,
        sex: 2
      }
      console.log(newObj)
      console.log(this.myObj)
      var arr = []
      for (let i = 0; i < 5; i++) {
        let testData = {
          name: 'hcy' + i.toString()
        }
        arr.push(testData)
      }
      console.log(arr)
      console.log(2 % 2)
    },
    data () {
      const generateData = _ => {
        const data = []
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i } `,
            disabled: i % 4 === 0
          })
        }
        return data
      }
      return {
        arrTitle: [['hcy', 'qiqixiaoyu', 'qiqixiaoyu', 'qiqixiaoyu', 'qiqixiaoyu', 'qiqixiaoyu', 'qiqixiaoyu']],
        data: generateData(),
        value1: [1, 4],
        comProp: 'color-success',
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
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
          }],
        myObj: {
          name: 1,
          sex: [1, 2, 3, 4]
        }
      }
    },
    methods: {
      clickHandler () {
        alert('终于生效了')
      },
      renderHeader: function (h, { column, $index }) {
        return h('div', [
          h('span', column.label),
          h('span', {
            attrs: {
              id: 'span'
            }
          }, 'hcy'),
          h('i', {
            on: {
              click: this.clickHandler
            },
            style: {
              color: 'red',
              fontSize: '14px'
            }
          }, '我可以点击？')
        ])
      },
      renderFunc: function (h, option) {
        return h('div', [
          h('span', {
            attrs: {
              id: 'span'
            }
          }, 'hcy')
        ])
      }
    }
  }
</script>
<style lang='scss'>

</style>
