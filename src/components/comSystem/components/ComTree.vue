<template>
  <div class="tree-item">
    <div :class="{'tree-item-bold': isFolder}" class="tree-item-row">
      <i :class="{'el-icon-caret-right': !open, 'el-icon-caret-bottom': open}" v-if="isFolder" class="tree-icon" @click="toggle(model)"></i>
      <input type="checkbox" class="tree-checkbox" v-model="model.state">
      <span class="tree-label" @click="toggle(model)">{{ model.name }}</span>
    </div>
    <transition name="el-fade-in-linear">
      <ul v-show="open" v-if="isFolder">
        <tree-item class="item" v-for="(model, index) in model.children" :key="index" :model="model"></tree-item>
        <transition name="el-fade-in-linear">
          <i class="el-icon-plus more" v-if="model.more" @click="loadMoreEvent(model)"></i>
        </transition>
      </ul>
    </transition>
  </div>
</template>

<script>
  import Bus from './Bus'

  export default {
    name: 'tree-item',
    props: {
      model: Object
    },
    data () {
      return {
        open: false
      }
    },
    computed: {
      isFolder: function () {
        return (this.model.hasLoad === false) || this.model.children.length
      }
    },
    methods: {
      addTreeRely () {
        if (this.model.hasLoad === undefined) {
          this.$set(this.model, 'hasLoad', false) // 是否加载过子节点，每个节点只去懒加载一次子节点
        }
        if (this.model.more === undefined) {
          this.$set(this.model, 'more', true) // 子节点分页，为加载更多的形式
        }
        if (this.model.state === undefined) {
          this.$set(this.model, 'state', false) // 用于保存节点勾选状态
        }
      },
      toggle (model) {
        if (model.hasLoad === false) {
          model.hasLoad = true
          Bus.$emit('loadChild', model) // 只会加载一次
        }
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      loadChild (content, data) {
        content.children = content.children.concat(data)
      },
      loadMoreEvent (model) {
        Bus.$emit('loadMoreEvent', model) // 加载更多当前层级
      },
      loadMoreData (content, data) {
        if (data.length) {
          content.children = content.children.concat(data)
        } else {
          content.more = false
        }
      }
    },
    mounted () {
      this.addTreeRely()
    }
  }
</script>

<style lang='scss'>
  .tree-item{
    .tree-item-bold{
      font-weight: bold;
    }
    .tree-item-row{
      .tree-icon,.tree-checkbox,.tree-label{
        vertical-align: middle;
        cursor: pointer;
      }
      .tree-checkbox,.tree-label{
        margin-left: 5px;
      }
    }
    ul {
      padding-left: 1em;
      line-height: 1.5em;
      list-style-type: dot;
      .more{
        cursor: pointer;
      }
    }
  }
</style>
