<template>
  <div class="file-upload">
    <com-file-upload :comProp="comProp"></com-file-upload>
  </div>
</template>

<script type="text/ecmascript-6">
  import ComFileUpload from  './components/ComFileUpload.vue'
  export default {
    components:{
      ComFileUpload
    },
    created () {
    },
    data () {
      return {
        comProp:{
          signUpd: true,
          multiUpd: false,
          showList: true
        }
      }
    },
    methods: {}
  }
</script>

<style>

</style>
