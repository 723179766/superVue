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
      console.log(this.comProp)
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

      },
      labelClick(item){

      },
      showMore(){

      }
    },
    props:{
      comProp: Object
    }
  }
</script>
<style lang='scss'>

</style>
