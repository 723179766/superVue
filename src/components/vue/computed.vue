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
    <button class="dj-btn dj-btn-danger" @click="mixinClick">mixins11使用</button>

    <input type="text" v-model="myColor">
    <input type="color" id="color" v-model="myColor">
    <button class="dj-btn dj-btn-info" @click="getColor">获取color</button>

    <img src="http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg" alt="">

  </div>
</template>
<script>
  import comComputed from './components/comComputed.vue'
  import mymix from './mixin'
  export default {
    created () {
      console.log('这个created钩子在自身组件中执行')
    },
    mixins: [mymix],
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
        myObj2: '',
        myColor: '#ffffff'
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
        return '我是计算属性，可以传到组件内部去，master文件'
      },
      reversedMessage: function () {
//        alert('原值改变，重新计算')
        return this.message.split('').reverse().join('')
      }
    },
    methods: {
      getColor () {
        console.log(document.getElementById('color').value)
      },
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
