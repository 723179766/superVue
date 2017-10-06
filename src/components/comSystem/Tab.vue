<template>
  <div class="">
    <tabs>
      <div>father</div>
      <tabs-child></tabs-child>
    </tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import tabs from './components/ComTab.vue' //引入组件
  import tabsChild from './components/ComTabChild.vue' //引入组件
  export default {
    components: {
      tabs,
      tabsChild
    },
    methods: {
    },
    data() {
      return {

      }
    }
  }
</script>

<style>

</style>
