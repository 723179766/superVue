<template>
  <div class="solt">
    <div style="margin-bottom: 30px"> 下面是一个具名插槽的演示 </div>
    <Com-Solt>
      <p>我可是随便插入进去的哦</p>
      <p>我可是随便插入进去的哦</p>
      <p>我可是随便插入进去的哦</p>

      <h4 slot="header">我插入到了header</h4>
      <h4 slot="footer">我插入到了footer</h4>
      <h4 slot="newName">我插入到了newName</h4>
    </Com-Solt>

    <div style="margin-bottom: 30px;margin-top: 30px"> 下面是一个作用域插槽的演示 </div>
    <Com-Solt2>
      <template slot-scope="props">
        <span>hello from parent</span>
        <span>{{ props.text }}</span>
      </template>
    </Com-Solt2>
  </div>
</template>

<script>
  import ComSolt from './components/ComSolt.vue'
  import ComSolt2 from './components/ComSolt2.vue'

  export default {
    components: {
      ComSolt,
      ComSolt2
    },
    data () {
      return {
//        props: {
//          text: 'hcy'
//        }
      }
    },
    created () {
    }
  }
</script>

<style>
</style>
