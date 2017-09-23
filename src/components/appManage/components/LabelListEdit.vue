<template>
  <div class="label-list">
    <span class="dj-tag" @click="labelAllClick()" v-bind:class="{'dj-tag-selectd':selectdAll==true}">全部</span><span class="dj-tag margin-bottom-3" v-for="item in thisTag" @click="labelClick(item)" v-bind:class="{'dj-tag-selectd':item.selectd==true}">{{item.label_name}}</span>
    <span class="dj-sign-font" v-show="moreFlag" @click="showMore">更多 <i class="el-icon-caret-right"></i></span>
    <span class="dj-sign-font" v-show="!moreFlag" @click="showMore">收起 <i class="el-icon-caret-left"></i></span>
  </div>
</template>
<script>
  import axios from 'axios'
  import {API} from '../../../config'
  export default {
    created(){
      alert('请勿使用本组件，没有编写完成');
      let vm = this;
      axios.post(API + vm.api).then(function(resp){
        if(resp.data.code=='00000'){
          vm.tagAll = resp.data.data;
          for(let i=0;i<vm.tagAll.length;i++){
            vm.$set(vm.tagAll[i],"selectd",false);
          }
          let halfLen = Math.floor(vm.tagAll.length/2);
          for(let i=0;i<halfLen;i++){
            vm.tagFold.push(vm.tagAll[i]);
          }
          vm.thisTag = vm.tagFold;
        }
      });
    },
    data(){
      return{
        selectdAll: true,
        moreFlag: true,
        tagAll: [],
        thisTag: [],
        tagFold: []
      }
    },
    methods:{
      labelAllClick(){
        let vm = this;
        vm.selectdAll = !vm.selectdAll;
        this.$emit('childComClick',vm.tagAll);
        let vm = this;
        vm.selectdAll = !vm.selectdAll;
        if(vm.selectdAll==true){
          vm.tagAll.forEach(function(val,index,arr){
            val.selectd = true;
          })
        }else{
          vm.tagAll.forEach(function(val,index,arr){
            val.selectd = false;
          })
        }
      },
      labelClick(item){
        let vm = this,num = 0;
        item.selectd = !item.selectd;
        vm.tagAll.forEach(function(val,index,arr){
          if(val.selectd == true){
            num++;
          }
        });
        if(num==vm.tagAll.length){
          vm.selectdAll = true;
        }else{
          vm.selectdAll = false;
        }
        this.$emit('childComClick',vm.tagAll);
      },
      showMore(){
        if(this.moreFlag==true){
          this.moreFlag = false;
          this.thisTag = this.tagAll;
        }else{
          this.moreFlag = true;
          this.thisTag = this.tagFold;
        }
      }
    },
    props:{
      api: String
    }
  }
</script>
<style lang='scss'>

</style>
