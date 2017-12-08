<template>
  <div class="back-ground-test" id="img_area_warp">
    <div style="position: absolute;z-index: -100;width: 100px;height: 100px;overflow: hidden;">
      <img src="./1.png" alt="" id="imgNew">
    </div>
    <div id="show_count1"></div>
    <div id="show_count2"></div>
    <div style="height: 400px;color: yellow;" v-for="item in [1,2]">
      Hello World Hello World
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
        let img = document.getElementById('imgNew')
//        console.log('图片宽:' + img.offsetWidth + '   图片高:' + img.offsetHeight)
        let imgScale = (img.offsetWidth / img.offsetHeight).toFixed(2)
//        console.log('图片宽/高比例为:' + imgScale)
        document.getElementById('show_count1').innerHTML = '图片宽:' + img.offsetWidth + '   图片高:' + img.offsetHeight + '<br >' + '图片宽/高比例为:' + imgScale
        let dom = document.getElementById('img_area_warp')
//        console.log('C区宽:' + dom.offsetWidth + '   C区高:' + dom.offsetHeight)
        let domScale = (dom.offsetWidth / dom.offsetHeight).toFixed(2)
//        console.log('C区宽/高比例为:' + domScale)
        document.getElementById('show_count2').innerHTML = 'C区宽:' + dom.offsetWidth + '   C区高:' + dom.offsetHeight + '<br >' + 'C区宽/高比例为:' + domScale
        console.log(dom.offsetWidth)
        console.log(dom.offsetHeight)
      }
//      setTimeout(function () {
//        let img = document.getElementById('imgNew')
//        console.log('图片宽:' + img.offsetWidth + '   图片高:' + img.offsetHeight)
//        let imgScale = (img.offsetWidth / img.offsetHeight).toFixed(2)
//        console.log('图片宽/高比例为:' + imgScale)
//        document.getElementById('show_count1').innerHTML = '图片宽:' + img.offsetWidth + '   图片高:' + img.offsetHeight + '<br >' + '图片宽/高比例为:' + imgScale
//        let dom = document.getElementById('img_area_warp')
//        console.log('C区宽:' + dom.offsetWidth + '   C区高:' + dom.offsetHeight)
//        let domScale = (dom.offsetWidth / dom.offsetHeight).toFixed(2)
//        console.log('C区宽/高比例为:' + domScale)
//        document.getElementById('show_count2').innerHTML = 'C区宽:' + dom.offsetWidth + '   C区高:' + dom.offsetHeight + '<br >' + 'C区宽/高比例为:' + domScale
//      }, 1000)
    }
  }
</script>

<style>
  .back-ground-test{
    position: relative;
    height: 100%;
    padding: 0 !important;
    overflow-y: auto;
    background-size: cover;
    background-image: url(4.png);
    background-repeat: no-repeat;
    /*background-attachment: fixed;*/
  }
</style>
