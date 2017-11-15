<template>
  <div>
    <qy-btn @click="myFunc" type="orange">点击me</qy-btn>

    <br />

    <div class="head-area">
      <div class="img-warp">
        <img class="myimg" src="../../../static/img/20-200.png" alt="">
      </div>
    </div>

    <br />

    <div class="head-area">
      <div class="img-warp">
        <img class="myimg" src="../../../static/img/44-440.png" alt="">
      </div>
    </div>

    <br />

    <div class="head-area">
      <div class="img-warp">
        <img class="myimg" src="../../../static/img/404Girl.jpg" alt="">s
      </div>
    </div>

    <br />

    <div class="new-head-area">
      <div class="new-img-warp">
        <img class="new-myimg" src="../../../static/img/22-100.png" alt="">
      </div>
    </div>


    <br />

    <div class="new-head-area">
      <div class="new-img-warp">
        <img class="new-myimg" src="../../../static/img/44-440.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import qyBtn from './qyBtn/qyBtn.vue'
  export default {
    components: {
      qyBtn
    },
    methods: {
      myFunc () {
        alert(1)
      }
    }
  }
</script>

<style>
  .head-area{
    box-sizing: border-box;
    height: 80px;
    padding: 10px;
    border: 1px solid sandybrown;
  }
  .img-warp{
    position: relative;
    width: 40%;
    height: 100%;
    border: 1px solid lawngreen;
  }
  .myimg{
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
  }


  .new-head-area{
    box-sizing: border-box;
    height: 80px;
    padding: 10px;
    border: 1px solid sandybrown;
  }
  .new-img-warp{
    width: 440px;
    height: 100%;
    border: 1px solid lawngreen;
  }
  .new-myimg{
    height: 100%;
    max-width: 100%;
  }
</style>
