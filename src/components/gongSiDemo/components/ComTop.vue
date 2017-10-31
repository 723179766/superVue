<template lang="pug">
  .com-tree
    div.com-tree-row
      div.info-wrap(v-for="(item, $index) in comTopData.topData1")
        i.el-icon-circle-check.margin-left-45
        span.margin-left-15 {{item.name}}
    div.com-tree-row
      div.info-wrap(v-for="(item, $index) in comTopData.topData2")
        i.el-icon-circle-check.margin-left-45
        span.margin-left-15 {{item.name}}
</template>
<script>
  export default {
    created () {
    },
    data () {
      return {
      }
    },
    props: {
      comTopData: Object
    }
  }
</script>

<style lang="less">
  .com-tree{
    .com-tree-row{
      height: 40px;
      line-height: 40px;
    }
    .info-wrap{
      display: inline-block;
    }
    .margin-left-45{
      margin-left: 45px;
    }
    .margin-left-15{
      margin-left: 15px;
    }
  }
</style>
