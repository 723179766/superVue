<template lang="pug">
  .com-tree
    el-tree(:data="treedata", :props="defaultProps", show-checkbox, node-key="id", default-expand-all, :expand-on-click-node="false", :render-content="renderContent", @click="append()")
</template>

<script type="text/ecmascript-6">
  let id = 1000
  export default {
    data () {
      return {
        treedata: [
          {
            id: 1,
            label: '皇上',
            children: [
              {
                id: 2,
                label: '丞相',
                children: [
                  {
                    id: 3,
                    label: '丞相儿子',
                    children: [
                      {
                        id: 7,
                        label: '书童',
                        children: [
                          {
                            id: 8,
                            label: '书童一号'
                          },
                          {
                            id: 9,
                            label: '书童二号'
                          },
                          {
                            id: 10,
                            label: '书童三号'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: 4,
                    label: '丞相女儿',
                    children: [
                      {
                        id: 5,
                        label: '大女儿一号'
                      },
                      {
                        id: 6,
                        label: '大女儿二号'
                      }
                    ]
                  }
                ]
              },
              {
                id: 20,
                label: '警衣卫',
                children: [
                  {
                    id: 21,
                    label: '警衣卫一号'
                  },
                  {
                    id: 22,
                    label: '警衣卫二号'
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },

    methods: {
      append (store, data) {
        console.log (1)
        store.append({ id: id++, label: 'testtest', children: [] }, data)
      },
      remove (store, data) {
        store.remove(data)
      },
      renderContent (h, { node, data, store }) {
        var elm = h('span', {}, [
          h('span', {}, node.label),
          h('i', {class: ['el-icon-plus']}, null),
          h('i', {class: ['el-icon-minus margin-left-15'],
            on: {
            click: () => {
              console.log('我是删除1')
              this.append(store,data)
            }
          }}, null)
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
    }
  }
</script>

<style lang="less">
  .com-tree{
    .margin-left-15{
      margin-left: 15px;
    }
    .icon-right{
      float: right;
    }
  }
</style>
