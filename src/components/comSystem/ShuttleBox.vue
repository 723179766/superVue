<template>
  <div class="">
    <div class="tool-primary margin-bottom-10">
      <span>基础用法</span>
    <pre>
      leftTitle: '未添加的联系人',
      rightTitle: '已存储的联系人',
      leftData: [],                          //必传，左边数据，没有该数据默认[]
      rightData: [],                        //必传，右边数据，没有该数据默认[]
      label: 'name'                        //必传，数据字段标签名称</pre>
    </div>
    <com-shuttle-box :comProp="comProp"></com-shuttle-box>
    <button class="dj-btn dj-btn-icon-info margin-top-10" @click="getData"><i class="el-icon-star-on icon-left"></i>获取数据</button>
    <div class="tool-info margin-top-10">可搜索</div>
    <div class="tool-success margin-top-10">可分页</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import ComShuttleBox from './components/ComShuttleBox.vue'
  export default {
    created(){
      let vm = this;
      vm.comProp.leftData = [{id:1,name:'家具'},{id:2,name:'冰雪'},{id:3,name:'火焰'},{id:4,name:'游戏'},{id:5,name:'雪糕'},{id:6,name:'动物'},
        {id:7,name:'快递'},{id:8,name:'瀑布'},{id:9,name:'军械'},{id:10,name:'电商'},{id:11,name:'七七小鱼'},{id:12,name:'七度鱼'}];
      vm.comProp.leftData.forEach(function(val,index,arr){
        vm.$set(val,"selectd",false);
      });
      vm.comProp.rightData = [{id:200,name:'张三'},{id:201,name:'理事'}];
      vm.comProp.rightData.forEach(function(val,index,arr){
        vm.$set(val,"selectd",false);
      });
    },
    components:{
      ComShuttleBox
    },
    data(){
      return{
        comProp:{
          leftTitle: '未添加的联系人',
          rightTitle: '已存储的联系人',
          leftData: [],                          //必传，左边数据
          rightData: [],                        //必传，右边数据
          label: 'name'                        //必传，数据字段标签名称
        }
      }
    },
    methods:{
      getData(){
        console.log(this.comProp.leftData);
        console.log(this.comProp.rightData);
        this.$message('控制台已经打印');
      }
    }
  }
</script>
<style lang='scss'>

</style>
