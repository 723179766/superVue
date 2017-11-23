<template>
  <div class="">
    我是动态组件1111111111111
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'com1',
    data () {
      return {

      }
    },
    created () {
      alert('我是动态组件1111111111111,created钩子被调用了')
    },
    methods: {

    },
    mounted (){
      alert('我是动态组件1111111111111,mounted钩子被调用了')
    }
  }
</script>

<style>

</style>
