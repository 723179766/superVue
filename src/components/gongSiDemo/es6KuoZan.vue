<template>
  <div class="es6-kuo-zan">
    <div></div>
    <div>{{scss}}</div>
    <div>{{txt}}</div>
    <div>{{css}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import scss from '!raw-loader!./aaa.scss'
  import txt from '!raw-loader!./aaa'
  import css from '!raw-loader!./bbb.css'
  import Point from './es6Class'

  export default {
    data () {
      return {
        Point,
        scss: scss,
        txt: txt,
        css: css
      }
    },
    methods: {
    },
    mounted () {
      console.log(new Point().toString())
      console.log(new Point('hello', 'hcy').toString())
    }
  }
</script>
<style lang='scss'>

</style>
