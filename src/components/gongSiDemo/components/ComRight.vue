<template lang="pug">
  .com-right
    div(v-for="item in num" style="height: 36px;")
      button.dj-btn.dj-btn-success {{item.label}}
      button.dj-btn.dj-btn-primary {{item.label}}
      button.dj-btn.dj-btn-info {{item.label}}
      button.dj-btn.dj-btn-warning {{item.label}}
      button.dj-btn.dj-btn-danger {{item.label}}
      button.dj-btn.dj-btn-fff {{item.label}}
      button.dj-btn.dj-btn-icon-success
        i.el-icon-plus.icon-left {{item.id}}
      button.dj-btn.dj-btn-icon-danger {{item.label}}
        i.el-icon-plus.icon-right
    div(@click="getRightArr") 查看右边数组数据
  //我是一段看不见的注释
</template>

<script>
  import Bus from './bus'
  export default {
    created () {
      this.countNum(this.comTreeData[0].children)
      Bus.$on('nodeData', (opt, data, obj) => {
        if (opt === 'del') {
          this.getDelNodeArr(data)
          for (var i = this.delNodeArr.length - 1; i >= 0; i--) {
            for (let j = 0; j < this.num.length; j++) {
              if (this.delNodeArr[i] === this.num[j].id) {
                this.num.splice(j, 1)
              }
            }
          }
        }
        if (opt === 'add') {
          if (data.children.length === 0) {
            for (let j = 0; j < this.num.length; j++) {
              if (data.label === this.num[j].label) {
                this.num.splice(j + 1, 0, { id: obj.id, label: obj.label })
                break
              }
            }
          } else {
            this.findLastChild(data.children)
            for (let j = 0; j < this.num.length; j++) {
              if (this.addData.label === this.num[j].label) {
                this.num.splice(j + 1, 0, { id: obj.id, label: obj.label })
                break
              }
            }
          }
        }
      })
    },
    data () {
      return {
        num: [
          {
            id: 1,
            label: '皇上'
          }
        ],
        delNodeArr: [],
        addData: {
          id: '',
          label: ''
        }
      }
    },
    methods: {
      getRightArr () {
        console.log(this.num)
      },
      countNum (data) {
        for (var i = 0; i < data.length; i++) {
          this.num.push({
            id: data[i].id,
            label: data[i].label
          })
          if (data[i].children && data[i].children.length > 0) {
            this.countNum(data[i].children)
          }
        }
      },
      getDelNodeArr (data) {
        this.delNodeArr.push(data.id)
        if (data.children && data.children.length > 0) {
          this.findChild(data.children)
        }
      },
      findChild (data) {
        for (var i = 0; i < data.length; i++) {
          this.delNodeArr.push(data[i].id)
          if (data[i].children && data[i].children.length > 0) {
            this.findChild(data[i].children)
          }
        }
      },
      findLastChild (data) {
        if (data[data.length - 1].children && data[data.length - 1].children.length > 0) {
          this.findLastChild(data[data.length - 1].children)
        } else {
          this.addData.id = data[data.length - 1].id
          this.addData.label = data[data.length - 1].label
        }
      }
    },
    props: {
      comTreeData: Array
    }
  }
</script>
<style lang="less">
  .com-right{
    margin-top: 3px;
  }
</style>
