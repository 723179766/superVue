<!--
     comProp:{                                    //缺少必传配置项，组件不会有数据
        body:{
          api: 'http://qiqixiaoyu',
          pageSize: 20
        },                                        //必传，组件获取数据
        labelName: 'name',                        //必传，接口标签名字字段
        key: 'id',                                //必传，使用key对应项默认勾选
        initData: [4,9,1,8],                      //必传，已有的选项，可传[]
        all: true,                                //是否有全选标签
        reset: true,                              //是否有重置标签
        editNum: 2                                //标签可选多少数目，异常配置，如果editNum<initData.length，editNum为initData.length
                                                  //all和editNum配置项不能同时存在，默认editNum
     }
-->
<template>
  <div class="com-label-edit">
    <span class="dj-tag" @click="labelAllClick()" v-show="comProp.all" v-bind:class="{'dj-tag-selectd':selectdAll==true}">全部</span><span class="dj-tag margin-bottom-3" v-bind:class="{'dj-tag-selectd':item.selectd==true}" v-for="item in thisTag" @click="labelClick(item)">{{item[comProp.labelName]}}</span>
    <span class="reset-a" @click="reset" v-show="comProp.reset">重置</span>
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
      if(vm.checkProp()==false){
        return;
      }
      if(vm.comProp.body.api){
        vm.tagAll = [{id:1,name:'家具'},{id:2,name:'冰雪'},{id:3,name:'火焰'},{id:4,name:'游戏'},{id:5,name:'雪糕'},{id:6,name:'动物'},
          {id:7,name:'快递'},{id:8,name:'瀑布'},{id:9,name:'军械'},{id:10,name:'电商'}];
        let halfLen = Math.floor(vm.tagAll.length/2);
        vm.tagAll.forEach(function(val,index,arr){
          vm.$set(val,"selectd",false);
          if(index<halfLen){
            vm.tagFold.push(val);
          }
        });
        vm.thisTag = vm.tagFold;
        for(let i=0;i<vm.comProp.initData.length;i++){
          for(let j=0;j<vm.tagAll.length;j++){
            if(vm.comProp.initData[i]==vm.tagAll[j][vm.comProp.key]){
              vm.tagAll[j].selectd = true;
              break;
            }
          }
        }
        vm.init = vm.tagAll;
      }
    },
    data(){
      return{
        selectdAll: false,
        moreFlag: true,
        tagAll: [],
        thisTag: [],
        tagFold: [],
        init: []
      }
    },
    methods:{
      labelAllClick(){
        let vm = this;
        vm.selectdAll = !vm.selectdAll;
        if(vm.selectdAll==true){
          vm.tagAll.forEach(function(val,index,arr){
            val.selectd = true;
          });
        }
        if(vm.selectdAll==false){
          vm.tagAll.forEach(function(val,index,arr){
            val.selectd = false;
          });
        }
      },
      labelClick(item){
        let vm = this,num = 0,editNum;
        if(vm.comProp.editNum){
          editNum = vm.comProp.editNum;
          vm.tagAll.forEach(function(val,index,arr){
            if(val.selectd==true){
              num++
            }
          });
          if(num==editNum){
            if(item.selectd==true){
              item.selectd = !item.selectd;
            }else{
              vm.$message.error('最多只能选择'+editNum+'个分类');
            }
          }else{
            item.selectd = !item.selectd;
          }
        }
        if(!vm.comProp.editNum){
          editNum = vm.tagAll.length;
          item.selectd = !item.selectd;
          vm.tagAll.forEach(function(val,index,arr){
            if(val.selectd == true){
              num++;
            }
          });
          if(num==editNum){
            vm.selectdAll = true;
          }else{
            vm.selectdAll = false;
          }
        }
      },
      showMore(){
        let vm = this;
        if(vm.moreFlag==true){
          vm.moreFlag = false;
          vm.thisTag = vm.tagAll;
        }else{
          vm.moreFlag = true;
          vm.thisTag = vm.tagFold;
        }
      },
      reset(){
        let vm = this,num = 0;
        vm.tagAll.forEach(function(val,index,arr){
          val.selectd = false;
        });
        for(let i=0;i<vm.comProp.initData.length;i++){
          for(let j=0;j<vm.tagAll.length;j++){
            if(vm.comProp.initData[i]==vm.tagAll[j][vm.comProp.key]){
              vm.tagAll[j].selectd = true;
              num++;
              break;
            }
          }
        }
        if(num==vm.tagAll.length){
          vm.selectdAll = true;
        }else{
          vm.selectdAll = false;
        }
      },
      checkProp(){
        let vm = this;
        if(vm.comProp.all && vm.comProp.editNum){
          vm.comProp.all = false;
          vm.$message('all和editNum配置项不能同时存在，默认editNum');
        }
        if(vm.comProp.editNum<vm.comProp.initData.length){
          vm.comProp.editNum = vm.comProp.initData.length;
        }
        if(!vm.comProp.body || !vm.comProp.labelName || !vm.comProp.key || !vm.comProp.initData){
          vm.$message.error('配置项不正确');
          return false;
        }
      }
    },
    props:{
      comProp: Object
    }
  }
</script>
<style lang='scss'>
  .com-label-edit{
  .reset-a{
    margin-left: 10px;
    color: #31a2ff;
    cursor: pointer;
  &:hover{
     color: #f00;
   }
  }
  .dj-tag-selectd{
    color: #fff;
    background: #31a2ff;
  }
  }
</style>
