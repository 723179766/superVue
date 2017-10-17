<template>
  <div class="com-tab">
    <div class="tab-title">
      <h4 v-for="item in titleArr" @click="choiceTab">{{item}}</h4>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){

    },
    data(){
      return{
        titleArr: ['列表一','列表二','列表三']
      }
    },
    methods:{
      choiceTab(){
        console.log(12345)
      }
    },
    props:{
      active: String
    }
  }
</script>
<style lang='scss'>
  .com-tab{
    border: 1px solid #87cefa;
  }
  .com-tab:after{
    display: block;
    content: " ";
    clear: both;
  }
  .tab-title{
    background: #fff;
  }
  .tab-title>h4{
    display: inline-block;
    padding: 6px 20px;
    margin: 0 10px;
    color: #0f0f0f;
    border-bottom: 3px solid #87cefa;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  .tab-content{
    padding: 20px 50px;
    background: #fff;
  }
</style>
