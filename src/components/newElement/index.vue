<template>
  <div>
    <div v-show="whichShow=='no'">
      <p>封装的element ui 的按钮</p>
      <qy-btn @click="myFunc" type="orange">点击me</qy-btn>
      <br />

      <p>垂直居中的图片实现方式</p>
      <div class="head-area">
        <div class="img-warp">
          <img class="myimg" src="../../../static/img/20-200.png" alt="">
        </div>
      </div>
      <br />
      <div class="head-area">
        <div class="img-warp">
          <img class="myimg" src="../../../static/img/44-440.png" alt="">
        </div>
      </div>
      <br />
      <div class="head-area">
        <div class="img-warp">
          <img class="myimg" src="../../../static/img/404Girl.jpg" alt="">s
        </div>
      </div>
      <br />

      <p>使用高度100%让图片自适应</p>
      <div class="new-head-area">
        <div class="new-img-warp">
          <img class="new-myimg" src="../../../static/img/22-100.png" alt="">
        </div>
      </div>
      <br />
      <div class="new-head-area">
        <div class="new-img-warp">
          <img class="new-myimg" src="../../../static/img/44-440.png" alt="">
        </div>
      </div>

      <br />
      <p>formatter函数不仅可以用来过滤数据，也可用来添加DOM</p>
      <el-table
        :data="tableData"
        border
        style="width: 1000px">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="arr"
          label="字段数组"
          width="380"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="changeTableData">改变表格数据</el-button>

      <br>

      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px">
        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.value'"
                      :rules="[
            { validator: checkAge, trigger: 'blur' }
                     ]">
          <el-input v-model="domain.value" style="width: 400px"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="checked">备选项</el-checkbox>{{checked}} 字符串"0" 会先转false <br>
      <el-checkbox v-model="checkedwei1">备选项</el-checkbox><br>
      <button class="dj-btn dj-btn-success" @click="ssss">{{bigCount}}</button>
      {{bigCount}}

      <p></p>
      <el-table :data="tableData5" :row-class-name="getRowClass" style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <div class="wode-tr" v-for="item in [1,2,3,4]">
              <td></td>
              <td>
                <div class="cell">好滋好味鸡蛋仔</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">荷兰优质淡123123奶</div>
              </td>
              <td>
                <div class="cell">
                  <el-popover placement="bottom" trigger="hover">
                    <div>123123</div>
                    <div>22222</div>
                    <div>33333</div>
                    <el-button slot="reference">hover 激活</el-button>
                  </el-popover>
                </div>
              </td>
            </div>
            <!--<div v-for="item in props.row.brother">-->
            <!--<span style="margin-left: 20px">{{item.id}}</span>-->
            <!--<span>{{item.name}}</span>-->
            <!--</div>-->
          </template>
        </el-table-column>
        <el-table-column label="商品 name" prop="name" v-for="item in [1,2,3,4,11,24,34,44,54,22]"></el-table-column>
      </el-table>
    </div>

    <div class="margin-top-20" style="width: 400px" v-for="item in inputArr">
      <el-form :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="item.formData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="item.formData.sex"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="margin-top-20" style="width: 400px">
      <el-button @click="inputData">input数据</el-button>
    </div>

    <button class="dj-btn dj-btn-info" @click="changeCom">改变加载的组件</button>
    <component v-bind:is="whichShow"></component>
  </div>
</template>

<script type="text/ecmascript-6">
  import qyBtn from './qyBtn/qyBtn.vue'
  import dongTaiCom1 from './qyBtn/testComp1.vue'
  import dongTaiCom2 from './qyBtn/testComp2.vue'
  export default {
    created () {
//      var str = /^[a-z]/
//      console.log(str)
//      console.log(typeof str)
      var newstr = '/^[a-z]/'
      var expStr = newstr.slice(1, newstr.length - 1)
      var thisStr = new RegExp(expStr)
//      console.log(expStr)
//      console.log(new RegExp(expStr))
//      console.log(typeof new RegExp(expStr))
//      console.log(thisStr.test('a'))
//      var a = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[\.\!\~\_@#$])[a-zA-Z0-9\.\!\~_@#$]{8,20}$/
//      console.log(a)
//      console.log('null')
//      console.log(Boolean(null))
//      console.log(Boolean(!null))
      var osfipin= '    http://www.cnblogs.com/osfipin/     '
//      console.log(osfipin.replace(/(^\s*)|(\s*$)/g, ""))
      var str = '  hcy   '
//      console.log(str.replace(/^\s+|\s+$/g,''));
    },
    components: {
      qyBtn,
      dongTaiCom1,
      dongTaiCom2
    },
    data () {
      var checkAge = (rule, value, callback) => {
        var newvalue = value.toString().replace(/^\s+|\s+$/g, '')
        console.log(newvalue)
        console.log(newvalue.length)
        return
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        setTimeout(() => {
          if (parseInt(value) < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }, 500)
      }
      return {
        rules: {
          name: [
            { required: true, message: 'required', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: 'required', trigger: 'blur' }
          ]
        },
        inputArr: [
          {
            title: 'mt4',
            formData: {
              name: 'hcy',
              sex: '男'
            }
          },
          {
            title: 'mt5',
            formData: {
              name: 'qiqixiaoyu',
              sex: '女'
            }
          }
        ],
        whichShow: 'no',
        checked: '0',
        checkedwei1: 1,
        showCao: true,
        checkAge: checkAge,
        tableData: [
          {
            date: '2016-05-02',
            address: '七七小鱼1号',
            arr: ['name', 'data', 'hello']
          },
          {
            date: '2016-05-04',
            address: '七七小鱼二号',
            arr: ['name', 'data', 'hello']
          },
          {
            date: '2016-05-01',
            address: '七七小鱼1号',
            arr: ['name', 'data', 'hello']
          },
          {
            date: '2016-05-03',
            address: '七七小鱼二号',
            arr: ['name', 'data', 'hello']
          }
        ],
        noTab: false,
        tableData5: [
          {
            id: '1',
            name: '黄焖鸡米饭',
            size: '很饿很大',
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
            id: '2',
            name: '百世可乐',
            size: '很饿很大',
            brother: []
          },
          {
            id: '3',
            name: '油条蛋糕',
            size: '很饿很大',
            brother: []
          },
          {
            id: '4',
            name: '荷兰优质淡奶',
            size: '很饿很大',
            brother: []
          }
        ],
        dynamicValidateForm: {
          domains: [
            {
              value: ''
            }
          ]
        }
      }
    },
    methods: {
      inputData () {
        console.log(this.inputArr)
      },
      getRowClass: function (row, index) {
        if (row.brother.length > 0) {
//          console.log(row)
//          console.log(index)
          return ''
        } else {
          return 'hide-expand'
        }
      },
      changeCom () {
        if (this.whichShow === 'no') {
          this.whichShow = 'dongTaiCom1'
        } else if (this.whichShow === 'dongTaiCom1') {
          this.whichShow = 'dongTaiCom2'
        } else if (this.whichShow === 'dongTaiCom2'){
          this.whichShow = 'no'
        }
      },
      ssss () {
        this.showCao = !this.showCao
      },
      myFunc () {
        alert(12345)
      },
      formatter (row, column) {
        var vm = this
        var h = vm.$createElement
        if (Array.isArray(row[column.property])) {
//          let children = []
//          for (let i = 0; i < row[column.property].length; i++) {
//            children.push(
//              h('span', {
//                class: ['span-margin-left-10']
//              }, row[column.property][i])
//            )
//          }
          return h('div', {}, row[column.property])
        } else {
          return h('h2', {
            class: ['table-cell-hello']
          }, row[column.property])
        }
      },
      changeTableData () {
        this.tableData = [
          {
            date: '2016-05-02',
            address: '11'
          },
          {
            date: '2016-05-04',
            address: '22'
          },
          {
            date: '2016-05-01',
            address: '33'
          },
          {
            date: '2016-05-03',
            address: '44'
          }
        ]
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.dynamicValidateForm.domains)
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      removeDomain (item) {
        console.log(item)
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain () {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        })
      }
    },
    computed: {
      bigCount: function () {
        if (this.showCao) {
//          console.log(1111111111111)
          return '你好世界'
        }else {
//          console.log(2222222222)
          return 'hello world'
        }
      }
    }
  }
</script>

<style lang="scss">
  .span-margin-left-10:not(:first-child){
    margin-left: 10px;
  }
  .head-area{
    box-sizing: border-box;
    height: 80px;
    padding: 10px;
    border: 1px solid sandybrown;
  }
  .img-warp{
    position: relative;
    width: 40%;
    height: 100%;
    border: 1px solid lawngreen;
  }
  .myimg{
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
  }

  .new-head-area{
    box-sizing: border-box;
    height: 80px;
    padding: 10px;
    border: 1px solid sandybrown;
  }
  .new-img-warp{
    width: 380px;
    height: 100%;
    border: 1px solid lawngreen;
  }
  .new-myimg{
    height: 100%;
    max-width: 100%;
  }
  .table-cell-hello{
    color: orange;
  }
  .hide-expand{
    .el-table__expand-icon{
      display: none;
    }
  }
  .el-table__expanded-cell{
    padding: 0;
  }
  .wode-tr{
    display: flex;
    >td:first-child{
      box-sizing: border-box;
      width: 49px;
      border-bottom: none;
    }
    >td:not(:first-child){
      box-sizing: border-box;
      flex: 1;
      border-bottom: none;
    }
    >td{
      >.cell{
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
