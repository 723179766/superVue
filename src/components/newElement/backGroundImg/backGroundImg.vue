<template>
  <div class="back-ground-test" id="ssssssssss" ref="ssssssssss">
    <div style="position: absolute;z-index: -100;width: 100px;height: 100px;overflow: hidden;">
      <img src="./1.png" alt="" id="imgNew">
    </div>
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
//      window.onresize = function () {
//        let dom = document.getElementById('ssssssssss')
//        console.log(dom.offsetHeight)
//        console.log(dom.offsetWidth)
//        let countVal = dom.offsetWidth + 'px' + ' ' + dom.offsetHeight + 'px'
//        console.log(countVal)
//        dom.style.backgroundSize = countVal
//
//        let positionVal = ((dom.offsetWidth/8).toFixed(2) + 200) + 'px' + ' ' + ((dom.offsetHeight/8).toFixed(2) + 200) + 'px'
//        dom.style.backgroundPosition = positionVal
//        console.log('positionVal')
//        console.log(positionVal)
//      }
//
//      var dom = document.getElementById('ssssssssss')
//      var countVal = dom.offsetWidth + 'px' + ' ' + dom.offsetHeight + 'px'
//      dom.style.backgroundSize = countVal
//      dom.style.backgroundPosition = '176px 58px'
      setTimeout(function(){
        var img = document.getElementById("imgNew");
        console.log(img.offsetWidth);
        console.log(img.offsetHeight);
      },1000)
    }
  }
</script>

<style>
  .back-ground-test{
    position: relative;
    height: 100%;
    padding: 0 !important;
    overflow-y: auto;

    /*background-image: url(4.png);*/
    /*background-repeat: no-repeat;*/
    /*background-attachment: fixed;*/

    position: absolute;
    width: 10%;
    background: red;
  }
</style>
