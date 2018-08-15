<template>
  <div class="label-edit">
    <tree :model="treeData" ref="tree"></tree>
    <el-button @click="getTreeData" style="margin-top: 100px">查看全部数据</el-button>
    <el-button @click="getCheckedTree" style="margin-top: 100px">已勾选的节点</el-button>
    <el-button @click="searchData" style="margin-top: 100px">查询节点</el-button>
    <el-button @click="resetData" style="margin-top: 100px">重置节点</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  import Tree from './components/ComTree.vue'
  import Bus from './components/Bus'

  export default {
    components: {
      Tree
    },
    data () {
      return {
        treeData: {
          uid: 10000,
          name: 'Root Tree',
          children: []
        },
        copyTreeData: null
      }
    },
    methods: {
      getTreeData () {
        console.log(this.treeData)
      },
      getCheckedTree () {
        let tmp = []
        if (this.treeData.state === true) {
          tmp.push(this.treeData.uid)
        }
        function getChecked (data) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].state === true) {
              tmp.push(data[i].uid)
            }
            if (data[i].children) {
              getChecked(data[i].children)
            }
          }
        }
        getChecked(this.treeData.children)
        console.log('tmp', tmp)
      },
      searchData () {
        this.copyTreeData = JSON.parse(JSON.stringify(this.treeData))
        this.treeData = {}
        this.treeData = {
          uid: 10000,
          name: 'Root Tree',
          children: []
        }
      },
      resetData () {
        this.treeData = {}
        this.treeData = JSON.parse(JSON.stringify(this.copyTreeData))
      }
    },
    mounted () {
      Bus.$on('loadChild', content => {
        let data = []
        if (Math.floor(Math.random() * 10 + 1) > 3) {
          data = [
            {
              uid: content.uid + 1,
              name: content.uid + 1,
              children: []
            },
            {
              uid: content.uid + 2,
              name: content.uid + 2,
              children: []
            }
          ]
        }
        this.$refs.tree.loadChild(content, data)
      })
      Bus.$on('loadMoreEvent', content => {
        var name = content.children[content.children.length - 1].name
        let data = []
        if (Math.floor(Math.random() * 10 + 1) > 5) {
          for (let i = 1; i <= 5; i++) {
            data.push({
              uid: name + i,
              name: name + i,
              children: []
            })
          }
        }
        this.$refs.tree.loadMoreData(content, data)
      })
    }
  }
</script>
<style lang='scss'>

</style>
