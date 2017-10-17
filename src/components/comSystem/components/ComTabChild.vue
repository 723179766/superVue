<template>
  <div class="" v-show="name=='third'">
    <slot></slot>
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
      name: String
    }
  }
</script>
<style lang='scss'>

</style>
