<!--
    应用管理-应用分类功能 tag选择组件
-->
<template>
  <div class="app-tag-list">
    <span class="dj-tag margin-bottom-3" v-for="item in tagAll" @click="labelClick(item)" v-bind:class="{'dj-tag-selectd':item.selectd==true}">{{item.category_name}}</span>
  </div>
</template>
<script>
  import axios from 'axios'
  import {API} from '../../../config'
  export default {
    created(){
      this.getTags();
    },
    data(){
      return{
        tagAll: [],
      }
    },
    methods:{
      getTags(){
        let vm = this;
        axios.post(API + vm.api, {
          page_size: 100
        }).then(function(resp){
          if(resp.data.code=='00000'){
            vm.tagAll = resp.data.data.data;
            console.log(resp.data.data.data)
            for(let i=0;i<vm.tagAll.length;i++){
              vm.$set(vm.tagAll[i],"selectd",false);
            }
            for(let i=0;i<vm.tagAll.length;i++){
              for (let j=0;j<vm.initState.length;j++) {
                if (vm.tagAll[i].id == vm.initState[j].app_cat_id) {
                  vm.$set(vm.tagAll[i],"selectd",true);
                }
              }
            }
          }
        });
      },
      labelClick(item){
        let vm = this,num = 0;
        item.selectd = !item.selectd;
        vm.tagAll.forEach(function(val,index,arr){
          if(val.selectd == true){
            num++;
          }
        });
        if (num >= 4) {
          item.selectd = !item.selectd
          vm.$message.error('最多选三条！');
        }
        this.$emit('childComClick',vm.tagAll);
      },
    },
    props:{
      api: String,
      initState: Array
    },
    watch: {
      'initState': function(newVal,oldVal){
        this.initState = newVal
        this.getTags();
      }
    }
  }
</script>
<style lang='scss'>

</style>
