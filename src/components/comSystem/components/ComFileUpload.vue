<template>
  <div class="com-file-upload">
    <input type="file" class="input-file" @change="fileChange" ref="inputer">
    <button class="dj-btn dj-btn-icon-primary" @click="selectFile" v-show="hasFile==false"><i class="el-icon-upload2 icon-left"></i>选取文件</button>

    <ul class="file-list" v-show="comProp.showList==true">
      <li v-for="(item,index) in fileList">
        <span class="file-index">{{index+1}}</span>
        <span class="file-name">{{item.name}}</span>
        <i class="el-icon-upload-success el-icon-circle-check"></i>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    created () {

    },
    data () {
      return {
        hasFile: false,
        fileList: []
      }
    },
    methods: {
      selectFile(){
        this.$refs.inputer.click();
      },
      fileChange(e){
        let vm = this,inputDom,fileData;
        inputDom = vm.$refs.inputer;
        fileData = inputDom.files[0];
        console.log(fileData);
        if('success'){
          vm.fileList.push({
            name: fileData.name,
            size: fileData.size
          });
//          vm.hasFile = true;
        }
      }
    },
    mounted(){

    },
    props:{
      comProp: Object
    }
  }
</script>

<style lang="scss">
  .com-file-upload{
  .input-file{
    display: none;
  }
  ul{
  li{
    height: 20px;
    margin-top:10px;
  }
  }
  .file-list{
  .file-index{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50% !important;
    background: #39a3fe;
    color: #fff;
  }
  .file-name{
    margin-left: 10px;
    margin-right: 40px;
    color: #48576a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color .3s;
  }
  .el-icon-upload-success{
    color: #13ce66;
  }
  }
  }
</style>
