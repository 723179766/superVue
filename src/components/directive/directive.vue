<template>
  <div class="">
    <el-btn :comProp="comProp"></el-btn>
  </div>
</template>
<script type="text/ecmascript-6">
  import elBtn from './qy-btn/elBtn.vue'
  export default {
    components:{
      elBtn
    },
    created(){

    },
    data(){
      return{
        comProp: 'color-success'
      }
    },
    methods:{

    }
  }
</script>
<style lang='scss'>

</style>
