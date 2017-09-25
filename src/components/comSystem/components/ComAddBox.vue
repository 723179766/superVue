<!--
    组件请勿配置0,'',这种数据格式，因为没有做数据检测处理
-->
<template>
  <div class="com-add-box">
    <div class="input-area">
      <el-input placeholder="请输入内容" v-model="addVal" @keyup.enter.native="addTag"></el-input>
      <button class="dj-btn dj-btn-icon-success" @click="addTag"><i class="el-icon-plus icon-left"></i>添加</button>
    </div>

    <div class="box-area">
      <span class="dj-tag dj-tag-selectd" v-for="(item,index) in comProp.initData">{{item[comProp.labelName]}}<i class="el-icon-close" @click="delTag(item,index)" v-show="comProp.showClose"></i></span>
      <div class="no-data" v-show="comProp.initData.length==0">暂无数据</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created(){

    },
    data(){
      return{
        addVal: ''
      }
    },
    methods:{
      addTag(){
        let vm = this;
        if(vm.addVal==''){
          vm.$message({
            type: 'error',
            message: '添加数据不能为空'
          });
          return;
        }
        //配置了最大添加数目
        if(vm.comProp.maxNum==vm.comProp.initData.length){
          vm.$message({
            type: 'info',
            message: '已到达最大的添加数目'
          });
          return;
        }
        //配置了名称不能重复
        if(vm.comProp.nameRepeat){
          let nextFlag = true;
          try{
            vm.comProp.initData.forEach(function(val,index,arr){
              if(val[vm.comProp.labelName]==vm.addVal){
                nextFlag = false;
                forEach.break;
              }
            });
          }catch(e){

          }
          if(nextFlag==false){
            vm.$message({
              type: 'error',
              message: '添加的名称相同了'
            });
            return;
          }
        }
        vm.comProp.initData.push({[vm.comProp.labelName]:vm.addVal});
        vm.$message({
          type: 'success',
          message: '添加成功'
        });
        vm.addVal = '';
      },
      delTag(item,index){
        let vm = this;
        vm.comProp.initData.splice(index,1);
      },
      checkProp(){
        return true;
      }
    },
    props:{
      comProp: Object
    },
    mounted(){
      let vm = this;
      if(vm.checkProp()==false){
        $(".com-add-box").html('<h4>参数配置错误，请重新配置</h4>');
      }
    }
  }
</script>

<style lang="scss">
  .com-add-box{
  .input-area{
  .el-input{
    width: 200px;
    height: 36px;
    vertical-align: top;
  }
  button{
    height: 36px;
    margin-bottom: 10px;
    vertical-align: top;
  }
  }
  .box-area{
    padding: 10px;
    background: #fff;
    border: 1px solid #bfcbd9;
  .dj-tag{
    margin-bottom: 3px;
  }
  .el-icon-close{
    margin-left: 10px;
    font-size: 12px;
  &:hover{
     color: #f00;
   }
  }
  .no-data{
    text-align: center;
  }
  }
  }
</style>
