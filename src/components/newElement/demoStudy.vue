<template>
  <div class="demo-study">
    <button class="dj-btn dj-btn-primary" @click="goTable">EL表格封装</button>
    <button class="dj-btn dj-btn-info" @click="goBackGroundImg">背景图</button>
    <button class="dj-btn dj-btn-success" @click="goForm">表单循环</button>
    <button class="dj-btn dj-btn-warning" @click="goTableModel">伪Table</button>
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
        this.$router.push({name: 'table'})
      },
      goBackGroundImg () {
        this.$router.push({name: 'backGroundImg'})
      },
      goForm () {
        this.$router.push({name: 'formFor'})
      },
      goTableModel () {
        this.$router.push({name: 'tableModel'})
      }
    }
  }
</script>

<style lang="scss">
  .demo-study{
  }
</style>
