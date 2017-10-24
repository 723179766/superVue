<template>
  <div class="dj-amt">
    <h1>部分老版本浏览器可能不支持，因为没有加兼容性前缀，不支持IE9及IE9以下</h1>
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div class="animation2">
      <div class="rotate-page"></div>
    </div>
    <div class="animation3">
      <div class="circle1"></div>
      <div class="circle2"></div>
    </div>
    <div class="animation4">
      <div class="block1"></div>
      <div class="block2"></div>
    </div>
    <div class="animation5">
      <div class="loading1"></div>
      <div class="loading2"></div>
      <div class="loading3"></div>
    </div>
    <div class="animation6">
      <div class="bounceCircle"></div>
    </div>
    <h3 align="center">下面这个动画利用了动画嵌套来实现，外层元素旋转、里层元素缩放</h3>
    <div class="animation7">
      <div class="rotateCircle1"></div>
      <div class="rotateCircle2"></div>
    </div>
    <h3 align="center">下面是定位属性赋予每一个元素的，不太好维护、扩展，因为left、top这些需要根据元素自身大小和父元素大小去计算，可以网上参考别人的dom，决定采用哪一种方式</h3>
    <div class="more-loading">
      <div class="small small-1"></div>
      <div class="small small-2"></div>
      <div class="small small-3"></div>
      <div class="small small-4"></div>
      <div class="small small-5"></div>
      <div class="small small-6"></div>
      <div class="small small-7"></div>
      <div class="small small-8"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){

    },
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>
<style lang='scss'>

</style>
