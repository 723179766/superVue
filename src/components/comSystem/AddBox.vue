<template>
  <div class="add-box">
    <com-add-box :comProp="comProp" ></com-add-box>
    <!-- :comProp是组件接收的参数，comProp是data传递过去的数据 -->
    <button class="dj-btn dj-btn-icon-info margin-top-10" @click="getData"><i class="el-icon-search icon-left"></i>查看数据</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import ComAddBox from './components/ComAddBox.vue'
  export default {
    components:{
      ComAddBox
    },
    created(){
      this.comProp.initData = [{tagName:'家具'},{tagName:'冰雪'}];
    },
    data(){
      return{
        addVal: '',
        comProp:{
          labelName: 'tagName',                 //必传，标签数据名称字段
          initData: [],                          //必传，已经有的数据，格式[{name:'家具'},{name:'冰雪'}]
          maxNum: 13,                            //可选，最多添加的数目，不能小于initData.length
          showClose: true,                      //可选，是否显示删除图标
          nameRepeat: true                      //可选，是否允许添加数据的名称重复
        }
      }
    },
    methods:{
      getData(){
        console.log(this.comProp.initData)
      }
    }
  }
</script>

<style lang="scss">
  .add-box{
  }
</style>
