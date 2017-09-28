<template>
  <div class="">
    <com-shuttle-box :comProp="comProp"></com-shuttle-box>
  </div>
</template>
<script type="text/ecmascript-6">
  import ComShuttleBox from './components/ComShuttleBox.vue'
  export default {
    created(){

    },
    components:{
      ComShuttleBox
    },
    data(){
      return{
        comProp:{
          "name":1234
        }
      }
    },
    methods:{

    }
  }
</script>
<style lang='scss'>

</style>
