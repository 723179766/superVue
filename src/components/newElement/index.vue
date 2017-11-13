<template>
  <div>
    <qy-btn @click="myFunc" type="orange">点击me</qy-btn>
  </div>
</template>

<script>
  import qyBtn from './qyBtn/qyBtn.vue'
  export default {
    components: {
      qyBtn
    },
    methods: {
      myFunc () {
        alert(1)
      }
    }
  }
</script>

<style>

</style>
