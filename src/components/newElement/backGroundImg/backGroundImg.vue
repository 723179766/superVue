<template>
  <div class="back-ground-test">
    <div style="height: 400px;width: 1000px" v-for="item in [1]"></div>
  </div>
</template>

<script>
  export default {
    created () {
      var str = 'hello world'
      for (var i = 0; i < 20; i++) {
        var s = 'name' + i.toString()
        str = str + s
      }
      console.log(str)
    }
  }
</script>

<style>
  .back-ground-test{
    height: 100%;
    padding: 0 !important;
    background-image:url(1.jpg);
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-position:center;
  }
</style>
