<template>
  <div class="">
    <p>
      我是vuex1vuex1vuex1vuex1vuex1vuex1vuex1页面
    </p>
    <div>
      <p>{{count}} ------------ {{countPlusLocalState}} ------------ {{countAlias}}</p>
      <p>{{arr1Filter1}} ------------ {{arr1Filter2}} ------------ {{useGetters}} ------------ {{useFilterArrCount}}</p>
    </div>
    <div>
      <button class="dj-btn dj-btn-info" @click="changeVuex">vuex++</button>
      <br>
      <button class="dj-btn dj-btn-info" @click="back">去vuex2</button>
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
        this.$router.push({name: 'vuex2'})
      },
      changeVuex () {
        this.$store.commit('increment', 10)
      }
    },
    computed: mapState({
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count+1
      },
      arr1Filter1 () {
        return this.$store.state.arr1.filter(function (val) {
          return val >= 4;
        })
      },
      arr1Filter2 () {
        return this.$store.state.arr1.filter(val => val < 3)
      },
      useGetters () {
        return this.$store.getters.filterArr
      },
      useFilterArrCount () {
        return this.$store.getters.filterArrCount
      }
    })
  }
</script>

<style>

</style>
