<template>
  <div class="label-edit">
    <com-label-edit :comProp="comProp"></com-label-edit>
  </div>
</template>
<script type="text/ecmascript-6">
  import ComLabelEdit from './components/ComLabelEdit.vue'
  export default {
    components:{
      ComLabelEdit
    },
    created(){

    },
    data(){
      return{
        comProp:{
          body:{
            api: 'http://qiqixiaoyu',
            pageSize: 20
          },  //必传
          labelName: 'name',                       //必传
          key: 'id',                                //必传
          initData: [1,2,3,4,5,6,7,8,9],                   //必传
          all: true,//是否可全选
          reset: true,//是否可重置状态
          editNum: 9//可选数目，异常，如果editNum<initData.length，editNum为initData.length
        }
      }
    },
    methods:{

    }
  }
</script>
<style lang='scss'>

</style>
