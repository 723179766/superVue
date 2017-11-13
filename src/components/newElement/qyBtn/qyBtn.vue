<template>
  <el-button @click="handleClick" :class="btnClass" :type="type" :size="size" :disabled="disabled">
    <slot></slot>
  </el-button>
</template>

<script>
  export default {
    name: 'qy-btn',
    data () {
      return {
        btnClass: {
          'theme-bg-A': this.type === 'orange'
        }
      }
    },
    methods: {
      handleClick () {
        this.$emit('click')
      }
    },
    props: {
      type: {
        type: String,
        default: 'info'
      },
      size: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style>
  .theme-bg-A{
    background: orange;
    color: #fff;
  }
</style>
