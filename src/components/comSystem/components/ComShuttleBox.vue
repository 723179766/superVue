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
          <span class="data-info">{{item[comProp.label]}}</span>
        </label>
      </div>
      <p class="shuttle-box-footer">
         <span class="data-checkbox" @click="leftAllClick">
            <i v-bind:class="{'el-icon-check':leftCountMax,'el-icon-minus':leftCountMax=='half'}"></i>
          </span>
        <span class="data-info">共{{comProp.leftData.length}}项</span>
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
          <span class="data-info">{{item[comProp.label]}}</span>
        </label>
      </div>
      <p class="shuttle-box-footer">
         <span class="data-checkbox" @click="rightAllClick">
            <i v-bind:class="{'el-icon-check':rightCountMax,'el-icon-minus':rightCountMax=='half'}"></i>
          </span>
        <span class="data-info">共{{comProp.rightData.length}}项</span>
      </p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){
      let vm = this;
      vm.checkProp();
    },
    data(){
      return{
        leftCountMax: false,
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
        if(0<num<vm.comProp.leftData.length){
          vm.canMoveRight = true;
          vm.leftCountMax = 'half';
        }
        if(num==0){
          vm.canMoveRight = false;
          vm.leftCountMax = false;
        }
        if(num==vm.comProp.leftData.length){
          vm.canMoveRight = true;
          vm.leftCountMax = true;
        }
      },
      leftAllClick(){
        if(this.comProp.leftData.length==0){
          this.$message('左边已经没有可选数据');
          return;
        }
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
        if(0<num<vm.comProp.rightData.length){
          vm.canMoveLeft = true;
          vm.rightCountMax = 'half';
        }
        if(num==0){
          vm.canMoveLeft = false;
          vm.rightCountMax = false;
        }
        if(num==vm.comProp.rightData.length){
          vm.canMoveLeft = true;
          vm.rightCountMax = true;
        }
      },
      rightAllClick(){
        if(this.comProp.rightData.length==0){
          this.$message('右边已经没有可选数据');
          return;
        }
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
        if(this.canMoveRight==false){
          document.getElementsByClassName("shuttle-box-middle")[0].firstChild.disabled = true;
          this.$message('请勿使用控制台非法操作');
          return;
        }
        let vm = this,tempLeftArr = [];
        vm.comProp.leftData.forEach(function(val,index,arr){
          if(val.selectd == true){
            val.selectd = false;
            vm.comProp.rightData.push(val);
          }else{
            tempLeftArr.push(val);
          }
        });
        vm.comProp.leftData = tempLeftArr;
        vm.checkBoxState('right');
        vm.leftCountMax = false;
        vm.canMoveRight = false;
      },
      moveLeft(){
        if(this.canMoveLeft==false){
          document.getElementsByClassName("shuttle-box-middle")[0].lastChild.disabled = true;
          this.$message('请勿使用控制台非法操作');
          return;
        }
        let vm = this,tempRightArr = [];
        vm.comProp.rightData.forEach(function(val,index,arr){
          if(val.selectd == true){
            val.selectd = false;
            vm.comProp.leftData.push(val);
          }else{
            tempRightArr.push(val);
          }
        });
        vm.comProp.rightData = tempRightArr;
        vm.checkBoxState('left');
        vm.rightCountMax = false;
        vm.canMoveLeft = false;
      },
      //检查底部复选框状态
      checkBoxState(item){
        let vm = this,num = 0;
        if(item=='right'){
          vm.comProp.rightData.forEach(function(val,index,arr){
            if(val.selectd==true){
              num++
            }
          });
          if(0<num<vm.comProp.rightData.length){
            vm.rightCountMax = 'half';
          }
          if(num==0){
            vm.rightCountMax = false;
          }
          if(num==vm.comProp.rightData.length){
            vm.rightCountMax = true;
          }
        }
        if(item=='left'){
          vm.comProp.leftData.forEach(function(val,index,arr){
            if(val.selectd==true){
              num++
            }
          });
          if(0<num<vm.comProp.leftData.length){
            vm.leftCountMax = 'half';
          }
          if(num==0){
            vm.leftCountMax = false;
          }
          if(num==vm.comProp.leftData.length){
            vm.leftCountMax = true;
          }
        }
      },
      checkProp(){
        let vm = this;
        if(vm.comProp.leftData==undefined || vm.comProp.rightData==undefined){
          vm.$message.error('请配置leftData，rightData数据');
          vm.comProp.leftData = [];
          vm.comProp.rightData = [];
        }
      }
    },
    props:{
      comProp: Object
    }
  }
</script>
