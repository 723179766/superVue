<template>
  <div class="computed">
    我是计算属性，比较复杂的计算都是用计算属性，不能通过this去访问
    <div></div>
    {{bigCount}}
    {{smallCount}}
    {{reversedMessage}}
    <button class="dj-btn dj-btn-danger" @click="changeH">改变hello</button>
  </div>
</template>

<script>
  export default {
    created () {
      setTimeout(function () {
        this.message = 'hcy'
      }, 1000)
    },
    data () {
      return {
        message: 'Hello'
      }
    },
    computed: {
      bigCount: function () {
        return 1
      },
      smallCount () {
        return 2
      },
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      }
    },
    method: {
      changeH () {
      }
    }
  }
</script>

<style>
  .computed{
    background: #87cefa;
  }
</style>
