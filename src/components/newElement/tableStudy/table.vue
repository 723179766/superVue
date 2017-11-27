<template>
  <div class="">
    <my-table :tableConfig="tableConfig" :tableData="tableData" :tableType="tableType" :formatter="myFormatter"></my-table>

    <div class="margin-top-30">
      <button class="dj-btn dj-btn-primary" @click="changeTable1">表格列切换</button>
      <button class="dj-btn dj-btn-info" @click="changeTable2">表格展开切换</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import myTable from './elTable.vue'
  export default {
    name: '',
    components: {
      myTable
    },
    data () {
      return {
        init: 4,
        tableConfig: [
          {
            label: '日期',
            dataKey: 'date',
            auth: 'date'
          },
          {
            label: '姓名',
            dataKey: 'name',
            auth: 'name'
          },
          {
            label: '地址',
            dataKey: 'address',
            auth: 'address'
          }
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            brother: [
              {
                id: '1',
                name: '特辣黄焖鸡米饭'
              },
              {
                id: '2',
                name: '微辣黄焖鸡米饭'
              },
              {
                id: '3',
                name: '超级辣黄焖鸡米饭'
              }
            ]
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            brother: []
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            brother: []
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            brother: [
              {
                id: '1',
                name: '特辣黄焖鸡米饭'
              },
              {
                id: '2',
                name: '微辣黄焖鸡米饭'
              },
              {
                id: '3',
                name: '超级辣黄焖鸡米饭'
              }
            ]
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            brother: [
              {
                id: '1',
                name: '特辣黄焖鸡米饭'
              },
              {
                id: '2',
                name: '微辣黄焖鸡米饭'
              },
              {
                id: '3',
                name: '超级辣黄焖鸡米饭'
              }
            ]
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            brother: []
          }
        ],
        tableType: {
          expand: true,
          more: true
        }
      }
    },
    methods: {
      changeTable1 () {
        if (this.init == 4){
          this.tableConfig = [
            {
              label: 'ID',
              dataKey: 'ID',
              auth: true
            },
            {
              label: '姓名',
              dataKey: 'name',
              auth: true
            },
            {
              label: '地址',
              dataKey: 'address',
              auth: true
            },
            {
              label: '联系人',
              dataKey: 'person',
              auth: true
            },
            {
              label: '电话',
              dataKey: 'phone',
              auth: true
            },
            {
              label: '品牌',
              dataKey: 'brand',
              auth: true
            }
          ]
          this.tableData = [
            {
              ID: '12312312',
              name: '王小虎1',
              address: '上海一区',
              person: '七七小鱼',
              phone: '18351990218',
              brand: '七度连锁',
              brother: []
            },
            {
              ID: '23123232',
              name: '王小虎2',
              address: '天下无双',
              person: '往事随风',
              phone: '18322994418',
              brand: '往事随风连锁',
              brother: []
            },
            {
              ID: '234234234',
              name: '王小虎3',
              address: '北京田径',
              person: '往事随风',
              phone: '18322994418',
              brand: '往事随风连锁',
              brother: []
            },
            {
              ID: '123123345',
              name: '王小虎4',
              address: '贵州贵阳',
              person: '往事随风',
              phone: '18322994418',
              brand: '往事随风连锁',
              brother: []
            },
            {
              ID: '24545454',
              name: '王小虎5',
              address: '浙江杭州',
              person: '往事随风',
              phone: '18322994418',
              brand: '往事随风连锁',
              brother: [
                {
                  id: '1',
                  name: '特辣黄焖鸡米饭'
                }
              ]
            },
            {
              ID: '1453453453',
              name: '王小虎6',
              address: '江苏南京市',
              person: '往事随风',
              phone: '18322994418',
              brand: '往事随风连锁',
              brother: []
            }
          ]
          this.init = 6
        }else{
          this.tableConfig = [
            {
              label: '日期',
              dataKey: 'date',
              auth: 'date'
            },
            {
              label: '姓名',
              dataKey: 'name',
              auth: 'name'
            },
            {
              label: '地址',
              dataKey: 'address',
              auth: 'address'
            }
          ]
          this.tableData = [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              brother: [
                {
                  id: '1',
                  name: '特辣黄焖鸡米饭'
                },
                {
                  id: '2',
                  name: '微辣黄焖鸡米饭'
                },
                {
                  id: '3',
                  name: '超级辣黄焖鸡米饭'
                }
              ]
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
              brother: []
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              brother: []
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              brother: [
                {
                  id: '1',
                  name: '特辣黄焖鸡米饭'
                },
                {
                  id: '2',
                  name: '微辣黄焖鸡米饭'
                },
                {
                  id: '3',
                  name: '超级辣黄焖鸡米饭'
                }
              ]
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              brother: [
                {
                  id: '1',
                  name: '特辣黄焖鸡米饭'
                },
                {
                  id: '2',
                  name: '微辣黄焖鸡米饭'
                },
                {
                  id: '3',
                  name: '超级辣黄焖鸡米饭'
                }
              ]
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              brother: []
            }
          ]
          this.init = 4
        }
      },
      changeTable2 () {
        if (this.tableType.expand) {
          this.tableType.expand = false
        }else{
          this.tableType.expand = true
        }
      },
      myFormatter (row, column) {
        return <div>
        <div>12:24:22</div>
        <div><img src="../../../static/img/404Girl.jpg" class="mypic" /></div>
          </div>
      }
    }
  }
</script>

<style>
  .mypic{
    width: 40px;
    height: 40px;
  }
</style>
