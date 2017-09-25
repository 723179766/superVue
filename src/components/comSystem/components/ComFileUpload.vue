<template>
  <div class="com-file-upload">
    <input type="file" id="fileUpload" class="input-file">
    <button class="dj-btn dj-btn-icon-primary" @click="selectFile"><i class="el-icon-upload2 icon-left"></i>选取文件</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    created () {
    },
    data () {
      return {}
    },
    methods: {
      selectFile(){
        $("#fileUpload").click()
        console.log(document.getElementById("fileUpload").files[0])

      }
    }
  }
</script>

<style lang="scss">
  .com-file-upload{
    .input-file{
      display: none;
    }
  }
</style>
