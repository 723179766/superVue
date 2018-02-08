<template>
  <div class="">
    <p>
      我是vuex2页面vuex2页面vuex2页面vuex2页面vuex2页面
    </p>
    <div>
      {{count}}-----------{{name1}}-----------{{name2}}
    </div>
    <div>
      <button class="dj-btn dj-btn-info" @click="changeVuex">vuex--</button>
      <br>
      <button class="dj-btn dj-btn-info" @click="back">去vuex1</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  export default {
    name: '',
    data () {
      return {

      }
    },
    created () {

    },
    methods: {
      back () {
        this.$router.push({name: 'vuex1'})
      },
      changeVuex () {
        this.$store.commit('decrement', 7)
      }
    },
    computed: mapState([
      // 映射 this.count 为 store.state.count
      'count',
      'name1',
      'name2'
    ])
  }
</script>

<style>

</style>
