<template>
  <div class="computed">
    计算属性，比较复杂的计算可以用计算属性,data()原值改变时，计算属性会自动计算，计算属性的值会被缓存
    <div></div>
    {{bigCount}}
    {{smallCount}}
    <div></div>
    {{reversedMessage}} <span></span> {{reversedMessage}} <span></span>{{reversedMessage}} <span></span>
    <p></p>
    <button class="dj-btn dj-btn-danger" @click="changeH">注意上面的文案</button>
    <div>
      <com-Computed :data="intoCom"></com-Computed>
    </div>
    <p>Object.assign(target, ...sources)拷贝对象</p>
    <p>原来对象:{{myObj1}}</p>
    <p>拷贝出来的对象:{{myObj2}}</p>
  </div>
</template>
<script>
  import comComputed from './components/comComputed.vue'
  export default {
    created () {

    },
    components: {
      comComputed
    },
    data () {
      return {
        message: 'Hello',
        step: 1,
        myObj1: {
          name: '七七小鱼',
          sex: '男',
          love: null,
          like: undefined,
          smt: {
            xiangmao: '帅气',
            yanzhi: '逆天'
          }
        },
        myObj2: ''
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
        return '我是计算属性，可以传到组件内部去，qiqixiaoyu分支'
      },
      reversedMessage: function () {
        alert('原值改变，重新计算')
        return this.message.split('').reverse().join('')
      }
    },
    methods: {
      changeH () {
        if (this.step === 1) {
          this.message = 'hcy'
          this.step++
        } else if (this.step === 2) {
          this.message = 'qiqixiaoyu'
          this.step++
        } else if (this.step === 3) {
          console.log(111111111)
          this.message = 'qiqixiaoyu'
        }
      }
    },
    mounted () {
      var res = Object.assign(this.myObj2, this.myObj1)
      this.myObj2 = res
      console.log(res)
      console.log(typeof res)
      console.log(this.myObj2)
    }
  }
</script>
<style>
  .computed{
    background: #87cefa;
  }
</style>
