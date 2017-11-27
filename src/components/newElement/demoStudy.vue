<template>
  <div class="demo-study">
    <button class="dj-btn dj-btn-primary" @click="goTable">EL表格封装</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data () {
      return {

      }
    },
    created () {

    },
    methods: {
      goTable () {
        this.$router.push({name:'table'})
      }
    }
  }
</script>

<style lang="scss">
  .demo-study{
  }
</style>
