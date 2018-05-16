<template>
  <div>
    <input :value="value" @input="inputChange">{{value}}
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        required: true
      }
    },
    data () {
      return {
      }
    },
    methods: {
      inputChange () {
        this.$emit('input', event.target.value)
      }
    },
    watch: {
    }
  }
</script>

<style>

</style>
