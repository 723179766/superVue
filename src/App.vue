<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created(){
      let userInfo = sessionStorage.getItem('userInfo');
      if(userInfo==null){
        this.$router.push({ name: 'Login'});
      }
    }
  }
</script>

<style>
  #app {
    height: 100%;
    overflow-y: hidden;
  }
</style>
