<template>
  <div class="com-rate">
    <i class="dj-rate el-icon-star-off" v-for="item in rateArr" v-bind:class="{'dj-rate-hoverd':item.hover==true}"
       v-on:mouseenter="mouseEnter(item)" v-on:mouseleave="mouseLeave(item)" v-on:click="mouseClick(item)"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    created(){
      let vm = this;
      if(!vm.comProp.num){
        vm.comProp.num = 5;
      }
      if(vm.comProp.num>10){
        vm.comProp.num = 10;
      }
      for(let i=0;i<vm.comProp.num;i++){
        vm.rateArr.push({
          id: i,
          hover: false
        })
      }
    },
    data(){
      return{
        rateArr: [],
        choice: false,
        choiceId: ''
      }
    },
    methods:{
      mouseEnter(item){
        let vm = this;
        if(vm.choice==false){
          for(let i=0;i<item.id;i++){
            vm.rateArr[i].hover = true;
          }
        }
        if(vm.choice==true){
          if(item.id>vm.choiceId){
            for(let i=0;i<item.id;i++){
              vm.rateArr[i].hover = true;
            }
          }else if(item.id<vm.choiceId){
            for(let i=vm.rateArr.length-1;i>item.id;i--){
              vm.rateArr[i].hover = false;
            }
          }
        }
      },
      mouseLeave(item){
        let vm = this;
        if(vm.choice==false){
          for(let i=0;i<item.id;i++){
            vm.rateArr[i].hover = false;
          }
        }
        if(vm.choice==true){
          if(item.id>vm.choiceId){
            let thisId = item.id;
            for(thisId;thisId>vm.choiceId;thisId--){
              vm.rateArr[thisId].hover = false;
            }
          }else if(item.id<vm.choiceId){
            let thisId = item.id;
            for(thisId;thisId<=vm.choiceId;thisId++){
              vm.rateArr[thisId].hover = true;
            }
          }
        }
      },
      mouseClick(item){
        let vm = this;
        if(vm.choice==false){
          for(let i=0;i<=item.id;i++){
            vm.rateArr[i].hover = true;
          }
          vm.choice = true;
          vm.choiceId = item.id;
          return;
        }

        if(vm.choice==true){
          if(item.id>vm.choiceId){
            let choiceId = vm.choiceId+1;
            for(choiceId;choiceId<=item.id;choiceId++){
              vm.rateArr[choiceId].hover = true;
            }
          }else if(item.id<vm.choiceId){
            let choiceId = item.id+1;
            for(choiceId;choiceId<vm.choiceId;choiceId++){
              vm.rateArr[choiceId].hover = false;
              //console.log(1);//？？没有=号也正确了？
            }
          }
          vm.choiceId = item.id;
        }
      }
    },
    props:{
      comProp: Object
    }
  }
</script>
<style lang='scss'>
  .dj-rate{
    margin-right: 5px;
    font-size: 18px;
    color: rgb(198, 209, 222);
    transition: .3s;
    cursor: pointer;
  }
  .dj-rate:hover{
    -webkit-transform: scale(1.25);
    -moz-transform: scale(1.25);
    color: rgb(247, 186, 42);
  }
  .dj-rate-hoverd{
    color: rgb(247, 186, 42);
  }
</style>
