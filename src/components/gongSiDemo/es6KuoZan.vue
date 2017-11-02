<template>
  <div class="es6-kuo-zan">

  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from '../../api/appApi'
  export default {
    created(){
      console.log("for of 遍历[1,2,'xx',4,'ss']");
      for(let item of this.myArr1){
        console.log(item)
      }
      console.log("for in 遍历[1,2,'xx',4,'ss']");
      for(let item in this.myArr1){
        console.log(item);
        console.log(this.myArr1[item])
      }

    },
    data(){
      return{
        myObj: {
          name: 'hcy',
          age: 24,
          sex: '男'
        },
        myArr1: [1,2,'xx',4,'ss'],
        myArr2: [
          {name: 'hcy', age: 24, sex: '男'},
          {name: 'qiqixiaoyu', age: 20, sex: '女'}
        ]
      }
    },
    methods:{

    }
  }
</script>
<style lang='scss'>

</style>
