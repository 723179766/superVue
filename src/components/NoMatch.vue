<template>
  <div style="margin-top: 20px;text-align: center;">
    <div>
      <img src="../../static/img/404Girl.jpg" alt="">
    </div>
    <div style="position: absolute; left: 20px; top:20px;">
      <button @click="back" class="dj-btn dj-btn-primary">返回 <i class="el-icon-d-arrow-left"></i></button>
    </div>
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
      back(){
        window.history.back();
      }
    }
  }
</script>
