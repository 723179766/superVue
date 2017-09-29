<template>
  <div class="com-shuttle-box">
    <div class="shuttle-box">
      <p class="shuttle-box-head">
        <span v-if="comProp.leftTitle">{{comProp.leftTitle}}</span>
        <span v-else>列表1</span>
      </p>
      <div class="shuttle-box-body">
        <label class="data-list" v-bind:class="{'data-list-disabled':false}" v-for="item in comProp.leftData" @click="leftDataClick(item)">
          <span class="data-checkbox">
            <i v-bind:class="{'el-icon-check':item.selectd==true}"></i>
          </span>
          <span class="data-info">{{item.name}}</span>
        </label>
      </div>
      <p class="shuttle-box-footer">
         <span class="data-checkbox" @click="leftAllClick">
            <i v-bind:class="{'el-icon-check':leftCountMax,'el-icon-minus':leftCountMax=='half'}"></i>
          </span>
        <span class="data-info">共{{leftCount}}项</span>
      </p>
    </div>

    <div class="shuttle-box-middle">
      <button class="opt-btn" :disabled="canMoveRight==false" @click="moveRight"><i class="el-icon-arrow-right"></i></button>
      <button class="opt-btn" :disabled="canMoveLeft==false" @click="moveLeft"><i class="el-icon-arrow-left"></i></button>
    </div>

    <div class="shuttle-box">
      <p class="shuttle-box-head">
        <span v-if="comProp.rightTitle">{{comProp.rightTitle}}</span>
        <span v-else>列表2</span>
      </p>
      <div class="shuttle-box-body">
        <label class="data-list" v-bind:class="{'data-list-disabled':false}" v-for="item in comProp.rightData" @click="rightDataClick(item)">
          <span class="data-checkbox">
            <i v-bind:class="{'el-icon-check':item.selectd==true}"></i>
          </span>
          <span class="data-info">{{item.name}}</span>
        </label>
      </div>
      <p class="shuttle-box-footer">
         <span class="data-checkbox" @click="rightAllClick">
            <i v-bind:class="{'el-icon-check':rightCountMax,'el-icon-minus':rightCountMax=='half'}"></i>
          </span>
        <span class="data-info">共{{rightCount}}项</span>
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){
      let vm = this;
      vm.leftCount = vm.comProp.leftData.length;
      vm.rightCount = vm.comProp.rightData.length;
    },
    data(){
      return{
        leftCount: 0,
        leftCountMax: false,
        rightCount: 0,
        rightCountMax: false,
        canMoveRight: false,
        canMoveLeft: false
      }
    },
    methods:{
      leftDataClick(item){
        let vm = this,num = 0;
        item.selectd = !item.selectd;
        vm.comProp.leftData.forEach(function(val,index,arr){
          if(val.selectd==true){
            num++
          }
        });
        if(0<num<vm.leftCount){
          vm.canMoveRight = true;
          vm.leftCountMax = 'half';
        }
        if(num==0){
          vm.canMoveRight = false;
          vm.leftCountMax = false;
        }
        if(num==vm.leftCount){
          vm.canMoveRight = true;
          vm.leftCountMax = true;
        }
      },
      leftAllClick(){
        let vm = this;
        if(vm.leftCountMax==false || vm.leftCountMax=='half'){
          vm.canMoveRight = true;
          vm.leftCountMax = true;
          vm.comProp.leftData.forEach(function(val,index,arr){
            val.selectd = true;
          });
        }else{
          vm.canMoveRight = false;
          vm.leftCountMax = false;
          vm.comProp.leftData.forEach(function(val,index,arr){
            val.selectd = false;
          });
        }
      },
      rightDataClick(item){
        let vm = this,num = 0;
        item.selectd = !item.selectd;
        vm.comProp.rightData.forEach(function(val,index,arr){
          if(val.selectd==true){
            num++
          }
        });
        if(0<num<vm.rightCount){
          vm.canMoveLeft = true;
          vm.rightCountMax = 'half';
        }
        if(num==0){
          vm.canMoveLeft = false;
          vm.rightCountMax = false;
        }
        if(num==vm.rightCount){
          vm.canMoveLeft = true;
          vm.rightCountMax = true;
        }
      },
      rightAllClick(){
        let vm = this;
        if(vm.rightCountMax==false || vm.rightCountMax=='half'){
          vm.canMoveLeft = true;
          vm.rightCountMax = true;
          vm.comProp.rightData.forEach(function(val,index,arr){
            val.selectd = true;
          });
        }else{
          vm.canMoveLeft = false;
          vm.rightCountMax = false;
          vm.comProp.rightData.forEach(function(val,index,arr){
            val.selectd = false;
          });
        }
      },
      moveRight(){
        let vm = this;
        console.log('moveRight');
        console.log(vm.comProp.leftData);
        vm.comProp.leftData.forEach(function(val,index,arr){

        });
      },
      moveLeft(){
        let vm = this;
        console.log('moveLeft');
        console.log(vm.comProp.rightData);
      }
    },
    props:{
      comProp: Object
    }
  }
</script>
