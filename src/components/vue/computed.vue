<template>
  <div class="computed">
    计算属性，比较复杂的计算可以用计算属性,data()原值改变时，计算属性会自动计算，计算属性的值会被缓存
    <div></div>
    {{bigCount}}
    {{smallCount}}
    <div></div>
    {{reversedMessage}} <span></span> {{reversedMessage}} <span></span>{{reversedMessage}} <span></span>
    <div></div>
    <button class="dj-btn dj-btn-danger" @click="changeH">注意上面的文案</button>
    <div>
      <com-Computed :data="intoCom"></com-Computed>
    </div>
  </div>
</template>
<script>
  import comComputed from './components/comComputed.vue'
  export default {
    components:{
      comComputed
    },
    data () {
      return {
        message: 'Hello',
        step: 1
      }
    },
    computed: {
      bigCount: function () {
        return '你好世界'
      },
      smallCount () {
        return '嘻嘻嘻嘻'
      },
      intoCom () {
        return '我是计算属性，可以传到组件内部去'
      },
      reversedMessage: function () {
        alert('原值改变，重新计算')
        return this.message.split('').reverse().join('')
      }
    },
    methods: {
      changeH () {
        if(this.step==1){
          this.message = 'hcy'
          this.step++
        }else if(this.step==2){
          this.message = 'qiqixiaoyu'
          this.step++
        }else if(this.step==3){
          console.log(111111111)
          this.message = 'qiqixiaoyu'
        }
      }
    }
  }
</script>
<style>
  .computed{
    background: #87cefa;
  }
</style>
