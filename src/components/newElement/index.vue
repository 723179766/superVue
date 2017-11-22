<template>
  <div>
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
      style="width: 400px">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
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

      <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.valuess'"
                    :rules="myValdataes.myValidator">
        <el-input v-model="domain.valuess" style="width: 400px"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import qyBtn from './qyBtn/qyBtn.vue'
  export default {
    created () {
      console.log(this.ss)
      console.log(typeof this.ss)
      console.log(eval(this.stringss))
      console.log(typeof eval(this.stringss))
      console.log(new RegExp(this.stringss))
      console.log(typeof new RegExp(this.stringss))
      console.log(JSON.replace(new RegExp(this.stringss)))
    },
    components: {
      qyBtn
    },
    data () {
      var checkAge = (rule, value, callback) => {
        setTimeout(() => {
          if ( parseInt(value) < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }, 500);
      };
      return {
        checkAge: checkAge,
        tableData: [
          {
            date: '2016-05-02',
            address: '七七小鱼1号'
          },
          {
            date: '2016-05-04',
            address: '七七小鱼二号'
          },
          {
            date: '2016-05-01',
            address: '七七小鱼1号'
          },
          {
            date: '2016-05-03',
            address: '七七小鱼二号'
          }
        ],
        dynamicValidateForm: {
          domains: [
            {
              valuess: ''
            }
          ]
        },
        ss: /^[0-9]/,
        stringss: '/^[0-9]/'
      }
    },
    computed: {
      myValdataes () {
        return {
          myValidator: [
            { required: true, message: 'buweikong1', trigger: 'blur' },
            { validator: this.checkAge, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      myFunc () {
        alert(12345)
      },
      formatter (row, column) {
        console.log(1)
//        return ((a,b) => {
//          return a + '--->' + b
//        })(row.address,row.date)
//        return function (){
//          return 1111111
//        }()
        return <h1 class="table-cell-hello" title={row.address}>{row.address}</h1>
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
          valuess: '',
          key: Date.now()
        })
      }
    }
  }
</script>

<style>
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
</style>
