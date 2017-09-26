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
  import axios from 'axios'
  import {API} from '../../../config'
  export default {
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
        let vm = this,
          fileDom = vm.$refs.inputer,
          fileData = fileDom.files[0],
          data = new FormData();
        data.append('term_model_pic', fileData);
        axios({
          url: API + '/term_model/upload',
          method: 'post',
          data: data,
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((resp)=>{
          if(resp.data.code=="00000"){
            vm.fileList.push({
              name: fileData.name,
              size: fileData.size
            });
            this.$message({
              type: 'success',
              message: '上传成功'
            });
            //vm.hasFile = true;
          }
        });
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
