<template>
  <div class="com-shuttle-box">
    <div class="shuttle-box-left">
      <p class="shuttle-box-head">待选数据</p>
      <div class="shuttle-box-body">
        <label class="data-list" v-bind:class="{'data-list-disabled':item==4}" v-for="item in [1,4,3,4,5,6,1,1,2,1,3,4,1,1,9]">
          <span class="data-checkbox">
            <i v-bind:class="{'el-icon-check':item==4}"></i>
          </span>
          <span class="data-info">数据1</span>
        </label>
      </div>
    </div>
    <div class="shuttle-box-middle">
      <button class="opt-btn"><i class="el-icon-arrow-right"></i></button>
      <button class="opt-btn"><i class="el-icon-arrow-left"></i></button>
    </div>
    <div class="shuttle-box-right">
      <p class="shuttle-box-head">已选数据</p>
      <div class="shuttle-box-body">
        <label class="data-list" v-for="item in [1,2,1]">
          <span class="data-checkbox"></span>
          <span class="data-info">数据1</span>
        </label>
      </div>
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

    },
    props:{
      comProp: Object
    }
  }
</script>
