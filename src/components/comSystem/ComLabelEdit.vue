<template>
  <div class="">
    <label-list-edit :comProp="comProp"></label-list-edit>
  </div>
</template>
<script type="text/ecmascript-6">
  import LabelListEdit from './components/LabelListEdit.vue'
  export default {
    components:{
      LabelListEdit
    },
    created(){

    },
    data(){
      return{
        comProp:{
          body:{
            api: 'http://qiqixiaoyu',
            pageSize: 20
          },
          editNum: 4,
          labelName: 'tagName',
          reset: true
        }
      }
    },
    methods:{

    }
  }
</script>
<style lang='scss'>

</style>
