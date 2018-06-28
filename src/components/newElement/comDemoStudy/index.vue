<template>
  <div id="com_demo_study">
    <div>
      <vmodelcom v-model="searchText"></vmodelcom>
    </div>
    <div>
      {{searchText}}
    </div>
    <div>
      <button class="dj-btn dj-btn-info" @click="write">输出值</button>
      <el-button type="primary" @click="openLpoa">点击打开 Dialog</el-button>
    </div>
  </div>
</template>

<script>
  import vmodelcom from './VModelCom.vue'

  export default {
    components: {
      vmodelcom
    },
    data () {
      return {
        searchText: '七七小鱼'
      }
    },
    methods: {
      write () {
        alert(this.searchText)
      },
      openLpoa () {
        console.log(document.body)
        var dialogHtml = 'div'
      }
    }
  }
</script>

<style>
  #com_demo_study{}
</style>
