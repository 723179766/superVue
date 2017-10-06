<template>
  <div class="rate">
    <div class="tool-primary margin-bottom-10">
      <span>基础用法</span>
    <pre>
      num: 7           //不传默认5个评分项，最多10个</pre>
    </div>
    <com-rate :comProp="comProp"></com-rate>
    <button class="dj-btn dj-btn-icon-info margin-top-10"><i class="el-icon-star-on icon-left"></i>暂不提供数据获取方式</button>
    <div class="tool-info margin-top-10">可自定义样式</div>
    <div class="tool-success margin-top-10">可带文案提示</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import ComRate from './components/ComRate.vue'
  export default {
    components:{
      ComRate
    },
    created(){

    },
    data(){
      return{
        comProp:{
          num: 7
        }
      }
    },
    methods:{

    }
  }
</script>
<style lang='scss'>

</style>
