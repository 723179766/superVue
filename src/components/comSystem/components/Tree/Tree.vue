<template>
  <div class="b-lazy-tree">
    <tree :model="model" ref="tree"></tree>
  </div>
</template>
<script type="text/ecmascript-6">
  import Tree from './ComTree.vue'
  import Bus from './Bus'

  export default {
    components: {
      Tree
    },
    props: {
      model: Object
    },
    data () {
      return {
        copyModel: null
      }
    },
    methods: {
      getCheckedTree () {
        let tmp = []
        if (this.model.state === true) {
          tmp.push(this.model.uid)
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
        getChecked(this.model.children)
        return tmp
      },
      searchData () {
        this.copyModel = JSON.parse(JSON.stringify(this.model))
      },
      resetData () {
        if (this.copyModel === null) return this.model
        return JSON.parse(JSON.stringify(this.copyModel))
      },
      appendChild (content, data) {
        this.$refs.tree.loadChild(content, data)
      },
      appendMore (content, data) {
        this.$refs.tree.loadMore(content, data)
      }
    },
    mounted () {
      Bus.$on('childEvent', content => {
        this.$emit('loadChild', content)
      })
      Bus.$on('moreEvent', content => {
        this.$emit('loadMore', content)
      })
    }
  }
</script>

<style lang='scss'>
</style>
