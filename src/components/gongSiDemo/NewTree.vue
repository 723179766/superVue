<!--<template lang="pug">-->
<!--p asdfasdfaasdfasdadsfasdasdfasdfa-->
<!--</template>-->
<template>
  <div class="new-tree">
    <div class="new-tree-top">
      <com-top :comTopData="comtopdata"></com-top>
    </div>
    <div class="new-tree-left">
      <com-tree></com-tree>
    </div>
    <div class="new-tree-right">
      <!--<com-right></com-right>-->
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
