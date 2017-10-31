<template lang="pug">
  .com-tree
    el-tree(:data="comTreeData", :props="defaultProps", node-key="id", default-expand-all, :expand-on-click-node="false", :render-content="renderContent", @click="append()")
</template>

<script type="text/ecmascript-6">
  let id = 1000
  export default {
    data () {
      return {
      }
    },
    methods: {
      append (store, data) {
        store.append({ id: id++, label: '新的节点', children: [] }, data)
      },
      remove (store, data) {
//        console.log(store)
//        console.log(data)
//        return
        if(data.label=='皇上'){
          alert('根节点无法删除')
          return
        }
        store.remove(data)
      },
      renderContent (h, { node, data, store }) {
        var elm = h('div', {class: ['info-warp']}, [
          h('span', {}, node.label),
          h('span', {class: ['icon-warp']},[
            h('i', {
              'class': {
                'el-icon-plus': true,
                'margin-right-30': node.label=='皇上'
              },
              on: {
                click: () => {
                  this.append(store,data)
                }
              }}, null),
            h('i', {
              'class': {
                'el-icon-minus': true,
                'margin-left-15': true,
                'icon-hide': node.label=='皇上'
              },
              on: {
                click: () => {
                  this.remove(store,data)
                }
              }}, null)
          ])
        ])
        return elm
//        return (
//          <span>
//          <span>
//          <span>{node.label}</span>
//        </span>
//        <span style="float: right; margin-right: 20px">
//          <i class="el-icon-plus" on-click={ () => this.append(store, data) }></i>
//          <i class="el-icon-minus margin-left-15" on-click={ () => this.remove(store, data) }></i>
//        </span>
//        </span>);
      }
    },
    props: {
      comTreeData: Array,
      defaultProps: Object
    }
  }
</script>

<style lang="less">
  .com-tree{
  .margin-left-15{
    margin-left: 15px;
  }
  .margin-right-30{
    margin-right: 30px;
  }
  .icon-right{
    float: right;
  }
  .info-warp{
    display: inline-block;
    vertical-align: middle;
  }
  .icon-warp{
    position: absolute;
    right: 15px;
  }
  .icon-hide{
    display: none;
  }
  }
</style>
