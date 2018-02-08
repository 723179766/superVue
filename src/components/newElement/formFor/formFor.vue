<template>
  <div class="form-for">
    <div style="width: 300px;display: inline-block" v-for="(item, index) in inputArr" :key="index">
      <el-form label-width="100px" class="demo-ruleForm" :model="item" ref="form">
        <el-form-item label="标题" prop="type">
          <el-input v-model="item.title"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="data.name"
                      :rules="{ required: true, message: '请输入至少10个字符的活动名称', trigger: 'blur' , min: 10}">
          <el-input v-model="item.data.name"></el-input>
        </el-form-item>
        <el-form-item label="活动类型" prop="data.type"
                      :rules="{ required: true, message: '活动类型必填', trigger: 'blur' }">
          <el-input v-model="item.data.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form', index)">立即创建</el-button>
          <el-button @click="resetForm('form', index)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button @click="addForm">添加表单</el-button>
      <el-button @click="delForm">删除表单</el-button>
      <el-button @click="consoleAllForm">输出所有表单</el-button>
    </div>
    <div>vuex的值{{count}}</div>
  </div>
</template>

<script>
  export default {
    created () {},
    data () {
      return {
        inputArr: [
          {
            title: 'mt4',
            data: {
              name: 'hcy',
              type: 'VIP活动'
            }
          },
          {
            title: 'mt5',
            data: {
              name: 'qiqixiaoyu',
              type: '白金活动'
            }
          },
          {
            title: 'mt7',
            data: {
              name: '七度鱼',
              type: '砖石会员'
            }
          }
        ]
      }
    },
    methods: {
      submitForm (formName, index) {
        this.$refs[formName][index].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName, index) {
        this.$refs[formName][index].resetFields()
      },
      addForm () {
        this.inputArr.push(
          {
            title: '',
            data: {
              name: '',
              type: ''
            }
          }
        )
      },
      delForm () {
        this.inputArr.splice(this.inputArr.length - 1, 1)
      },
      consoleAllForm () {
        console.log(this.inputArr)
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      }
    }
  }
</script>

<style>
</style>
