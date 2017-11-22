<template>
  <div class="">
    我是动态组件222222222222
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'com2',
    data () {
      return {

      }
    },
    created () {
      alert('我是动态组件222222222222，created钩子被调用了')
    },
    methods: {

    },
    mounted (){
      alert('我是动态组件222222222222,mounted钩子被调用了')
    }
  }
</script>

<style>

</style>
