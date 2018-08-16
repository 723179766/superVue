<template>
  <div class="tree">
    <Tree :model="treeData" @loadChild="loadChild" @loadMore="loadMore" ref="tree"></Tree>
    <div>
      <el-button @click="getTreeData" style="margin-top: 100px">查看全部数据</el-button>
      <el-button @click="getChecked" style="margin-top: 100px">已勾选的节点</el-button>
      <el-button @click="search" style="margin-top: 100px">查询节点</el-button>
      <el-button @click="reset" style="margin-top: 100px">重置节点</el-button>
    </div>
  </div>
</template>

<script>
  import Tree from './components/Tree/Tree.vue'

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
        }
      }
    },
    methods: {
      loadChild (content) {
        let data = []
        if (Math.floor(Math.random() * 10 + 1) > 4) {
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
        this.$refs.tree.appendChild(content, data)
      },
      loadMore (content) {
        let name = content.children[content.children.length - 1].name
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
        this.$refs.tree.appendMore(content, data)
      },
      getTreeData () {
        console.log(this.treeData)
      },
      getChecked () {
        console.log('勾选的数据', this.$refs.tree.getCheckedTree())
      },
      search () {
        this.treeData = {
          uid: 10000,
          name: 'Root Tree',
          children: []
        }
        this.$refs.tree.searchData()
      },
      reset () {
        this.treeData = this.$refs.tree.resetData()
      }
    },
    created () {
    }
  }
</script>

<style>
</style>
