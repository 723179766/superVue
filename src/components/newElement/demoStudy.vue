<template>
  <div class="demo-study">
    <button class="dj-btn dj-btn-primary" @click="goTable">EL表格封装</button>
    <button class="dj-btn dj-btn-info" @click="goBackGroundImg">背景图</button>
    <button class="dj-btn dj-btn-success" @click="goForm">表单循环</button>
    <button class="dj-btn dj-btn-warning" @click="goTableModel">伪Table</button>
    <button class="dj-btn dj-btn-info" @click="vuex1">vuex状态共享1</button>
    <button class="dj-btn dj-btn-info" @click="vuex2">vuex状态共享2</button>

    <div v-once="true">{{count}}</div>
    <div v-if="true">{{count}}</div>
    <button class="dj-btn dj-btn-info" @click="count++">++++++++++</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data () {
      return {
        count: 1
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
      },
      vuex1 () {
        this.$router.push({name: 'vuex1'})
      },
      vuex2 () {
        this.$router.push({name: 'vuex2'})
      }
    }
  }
</script>

<style lang="scss">
  .demo-study{
  }
</style>
