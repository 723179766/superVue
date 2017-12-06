<template>
  <div class="back-ground-test" id="ssssssssss" ref="ssssssssss" style="background-position: 176px 58px; background-size: 100%;">
    <div style="height: 400px;color: yellow;" v-for="item in [1,2,3,4]">
      Hello World
      Hello World
    </div>
  </div>
</template>

<script>
  export default {
    created () {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
      window.onresize = function () {
        let dom = document.getElementById('ssssssssss')
        console.log(dom.offsetHeight)
        console.log(dom.offsetWidth)
        let countVal = dom.offsetWidth + 'px' + ' ' + dom.offsetHeight + 'px'
        console.log(countVal)
        dom.style.backgroundSize = countVal
      }

      var dom = document.getElementById('ssssssssss')
      var countVal = dom.offsetWidth + 'px' + ' ' + dom.offsetHeight + 'px'
      console.log(dom.offsetWidth)
      console.log(dom.offsetHeight)
      console.log(countVal)
      dom.style.backgroundSize = countVal
//      console.log(countVal)
      console.log(dom.style.backgroundSize)
    }
  }
</script>

<style>
  .back-ground-test{
    position: relative;
    height: 100%;
    padding: 0 !important;
    overflow-y: auto;

    background-image: url(1.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
