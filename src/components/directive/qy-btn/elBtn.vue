<template>
  <div class="">
    <el-input v-model="input" placeholder="请输入内容" :class="comProp"></el-input>
    {{comProp}}
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){

    },
    data(){
      return{

      }
    },
    methods:{

    },
    props:{
      comProp: String
    }
  }
</script>
<style lang='scss'>

</style>
