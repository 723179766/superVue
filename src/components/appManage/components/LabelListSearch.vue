<!--
    交互说明，进入页面（全部选项）默认勾选上
    当只有全部选项为勾选状态时候，不可取消全部的勾选状态
    子选项全满时候，全部选项为勾选状态，且不可取消全部的勾选状态
    用户点击其中几项子选项，可以中途勾选全部，全部勾选上后不会渲染所有子选项状态，有全部，先查询全部
-->
<template>
  <div class="label-list-search">
    <span class="dj-tag" @click="labelAllClick()" v-bind:class="{'dj-tag-selectd':selectdAll==true}">全部</span><span class="dj-tag margin-bottom-3" v-for="item in thisTag" @click="labelClick(item)" v-bind:class="{'dj-tag-selectd':item.selectd==true}">{{item[comProp.name]}}</span>
    <span class="dj-sign-font" v-show="moreFlag" @click="showMore">更多 <i class="el-icon-caret-bottom"></i></span>
    <span class="dj-sign-font" v-show="!moreFlag" @click="showMore">收起 <i class="el-icon-caret-top"></i></span>
  </div>
</template>
<script>
  import axios from 'axios'
  import {API} from '../../../config'
  export default {
    created(){
      let vm = this;
//      axios.post(API+vm.comProp.body.api,(vm.comProp.body)).then(function(resp){
//        if(resp.data.code=='00000'){
//          if(resp.data.data.data){
//            vm.tagAll = resp.data.data.data;
//          }else{
//            vm.tagAll = resp.data.data;
//          }
      vm.tagAll = [{id:1,label_name:'家具'},{id:2,label_name:'冰雪'},{id:3,label_name:'火焰'},{id:4,label_name:'游戏'},{id:5,label_name:'雪糕'},
        {id:6,label_name:'动物'},{id:7,label_name:'快递'},{id:8,label_name:'瀑布'},{id:9,label_name:'军械'},{id:10,label_name:'电商'}];
          for(let i=0;i<vm.tagAll.length;i++){
            vm.$set(vm.tagAll[i],"selectd",false);
          }
          let halfLen = Math.floor(vm.tagAll.length/2);
          for(let i=0;i<halfLen;i++){
            vm.tagFold.push(vm.tagAll[i]);
          }
          vm.thisTag = vm.tagFold;
//        }
//      });
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
        let vm = this,num = 0;
        vm.tagAll.forEach(function(val,index,arr){
          if(val.selectd == true){
            num++;
          }
        });
        if(num==vm.tagAll.length || num==0){
          vm.selectdAll = true;
        }else{
          vm.selectdAll = !vm.selectdAll;
        }
        this.$emit('childComClick',vm.tagAll,vm.selectdAll);
      },
      labelClick(item){
        let vm = this,num = 0;
        item.selectd = !item.selectd;
        vm.tagAll.forEach(function(val,index,arr){
          if(val.selectd == true){
            num++;
          }
        });
        if(num==vm.tagAll.length || num==0){
          vm.selectdAll = true;
        }else{
          vm.selectdAll = false;
        }
        this.$emit('childComClick',vm.tagAll,vm.selectdAll);
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
      comProp: Object
    },
    watch: {
      'comProp.initState': function(newVal,oldVal){
        this.selectdAll = true;
        this.tagAll.forEach(function(val,index,arr){
          val.selectd = false
        });
      }
    }
  }
</script>
