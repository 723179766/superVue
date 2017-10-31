<!--<template lang="pug">-->
<!--p asdfasdfaasdfasdadsfasdasdfasdfa-->
<!--</template>-->
<template>
  <div class="new-tree">
    <div class="new-tree-top">
      <com-top :comTopData="comtopdata"></com-top>
    </div>
    <div class="new-tree-left">
      <com-tree :comTreeData="comtreedata" :defaultProps="defaultProps"></com-tree>
    </div>
    <div class="new-tree-right">
      <com-right :comTreeData="comtreedata"></com-right>
    </div>
  </div>
</template>

<script>
  import ComTree from './components/ComTree.vue'
  import ComTop from './components/ComTop.vue'
  import ComRight from './components/ComRight.vue'

  export default {
    components:{
      ComTree,
      ComTop,
      ComRight
    },
    created () {

    },
    data () {
      return {
        comtopdata: {
          topData1: [
            {
              name: '水'
            },
            {
              name: '火'
            },
            {
              name: '水&火'
            }
          ],
          topData2: [
            {
              name: '皇宫'
            },
            {
              name: '你好'
            },
            {
              name: '天下'
            },
            {
              name: '物品1'
            },
            {
              name: '物品2'
            }
          ]
        },
        comtreedata: [
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
    }
  }
</script>

<style lang="less">
  .new-tree{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 !important;
    .new-tree-top{
      position: absolute;
      width: 100%;
      height: 80px;
    }
    .new-tree-left{
      position: absolute;
      top: 80px;
      bottom: 0;
      width: 500px;
      background: pink;
    }
    .new-tree-right{
      position: absolute;
      top: 80px;
      bottom: 0;
      left: 500px;
      right: 0;
      background: lightskyblue;
    }
  }
</style>
