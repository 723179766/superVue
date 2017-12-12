<template>
  <div class="back-ground-test" id="img_area_warp" style="background-size: 0 0">
    <div style="position: absolute; z-index: -100; left: -500px; width: 100px; height: 100px; overflow: hidden;">
      <img src="./1.png" alt="" id="imgNew">
    </div>
    <div id="show_count1"></div>
    <div id="show_count2"></div>
    <!--<div style="height: 400px;color: yellow;" v-for="item in [1]">-->
    <!--Hello World Hello World-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    created () {
    },
    data () {
      return {
        imgType: ''
      }
    },
    methods: {
    },
    mounted () {
      var vm = this
      var dom = document.getElementById('img_area_warp')        // 获取C区节点
      dom.style.backgroundImage="url(./static/backgroundimg/2.png)"

      function imgChange () {
        let areaWidth = dom.offsetWidth                            //C区宽
        let areaHeight = dom.offsetHeight                         //C区高
        if (areaHeight < 250 || areaWidth < 600) {
          console.log(areaWidth, areaHeight, '比例合适')
          dom.style.backgroundSize = 'cover'
          dom.style.backgroundPosition = "50% 50%"
          return
        }
        let areaScale = (areaWidth/areaHeight).toFixed(2)          //C区宽/高的比

        let img = document.getElementById('imgNew')              //获取图片节点
        let imgWidth = img.offsetWidth                           //图片宽
        let imgHeight = img.offsetHeight                        //图片高
        let imgScale = (imgWidth/imgHeight).toFixed(2)           //图片宽/高的比

        console.log('C区宽/高' + areaScale)
        console.log('图片宽/高' + imgScale)

        let bilicha = (areaScale - imgScale).toFixed(3)
        console.log('比例差' + bilicha)
        if (bilicha >= -0.25 && bilicha <= 0.25) {
          vm.imgType = 'typeNormal'                     // typeNormal  标准图，比例合适(4,9)
        }
        if (bilicha <= -2) {
          vm.imgType = 'type1'                     // type1
        }
        if (bilicha>-2 && bilicha <= -1) {
          vm.imgType = 'type2'                     // type2
        }
        if (bilicha>-1 && bilicha < -0.25) {
          vm.imgType = 'type3'                     // type3
        }
        if (bilicha<1 && bilicha > 0.25) {
          vm.imgType = 'type5'                       // type5
        }
        if (bilicha<1.5 && bilicha >= 1) {
          vm.imgType = 'type6'                     // type6
        }
        if (bilicha >= 1.5) {
          vm.imgType = 'type7'                     // type7
        }
        let size,positionSize;
        switch(vm.imgType) {
          case 'typeNormal':
            console.log('typeNormal')
            dom.style.backgroundSize = 'cover'
            dom.style.backgroundPosition = "0 0"
            break;
          case 'type1':
            console.log('type1')
            size = (areaWidth + 600 + 'px') + ' ' + (areaHeight + 'px')
            positionSize = (-300 + 'px') + ' ' + (0 + 'px')
            dom.style.backgroundSize = size
            dom.style.backgroundPosition = positionSize
            break;
          case 'type2':
            console.log('type2')
            size = (areaWidth + 400 + 'px') + ' ' + (areaHeight + 'px')
            positionSize = (-200 + 'px') + ' ' + (0 + 'px')
            dom.style.backgroundSize = size
            dom.style.backgroundPosition = positionSize
            break;
          case 'type3':
            console.log('type3')
            size = (areaWidth + 200 + 'px') + ' ' + (areaHeight + 'px')
            positionSize = (-100 + 'px') + ' ' + (0 + 'px')
            dom.style.backgroundSize = size
            dom.style.backgroundPosition = positionSize
            break;
          case 'type5':
            console.log('type5')
            size = (areaWidth + 'px') + ' ' + (areaHeight + 200 + 'px')
            positionSize = (0 + 'px') + ' ' + (-100 + 'px')
            dom.style.backgroundSize = size
            dom.style.backgroundPosition = positionSize
            break;
          case 'type6':
            console.log('type6')
            size = (areaWidth + 'px') + ' ' + (areaHeight + 400 + 'px')
            positionSize = (0 + 'px') + ' ' + (-200 + 'px')
            dom.style.backgroundSize = size
            dom.style.backgroundPosition = positionSize
            break;
          case 'type7':
            console.log('type7')
            size = (areaWidth + 'px') + ' ' + (areaHeight + 600 + 'px')
            positionSize = (0 + 'px') + ' ' + (-300 + 'px')
            dom.style.backgroundSize = size
            dom.style.backgroundPosition = positionSize
            break;
          default:
            break;
        }

      }

      setTimeout(function(){
        imgChange()
      }, 1000)

      window.onresize = function () {
//        let newAreaWidth = dom.offsetWidth
//        let newAreaHeight = dom.offsetHeight
//        if ((newAreaHeight-areaHeight)!==0 && (newAreaWidth-areaWidth)!==0) {
//          console.log('Z轴变化了滚动条')
//          areaHeight = newAreaHeight
//          areaWidth = newAreaWidth
//        }
//        if ((newAreaHeight-areaHeight)!==0) {
//          console.log('Y轴变化了滚动条')
//          areaHeight = newAreaHeight
//        }
//        if ((newAreaWidth-areaWidth)!==0) {
//          console.log('X轴变化了滚动条')
//          areaWidth = newAreaWidth
//        }
//        console.log(newAreaWidth, newAreaHeight)
        imgChange()
      }
    }
  }
</script>

<style>
  .back-ground-test{
    position: relative;
    height: 100%;
    padding: 0 !important;
    overflow-y: auto;

    background-repeat: no-repeat;
  }
</style>
