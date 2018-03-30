<template>
  <div class="com-solt-father">
    <slot text="name"></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '我是七七小鱼'
      }
    },
    created () {

    }
  }
</script>

<style>
  .com-solt-father{
    width: 400px;
    height: 400px;
    background: #87cefa;
  }
</style>
