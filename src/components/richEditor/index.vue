<template>
  <div class="app-container">
    <div id="editorElem" style="text-align:left"></div>
    <button v-on:click="getContent">查看内容</button>
    <div>
      <img src="/static/img/404Girl.jpg" large="/static/img/44-440.png" preview="0" preview-text="preview-chajian11">
    </div>
    <!--<tabel-change></tabel-change>-->
  </div>
</template>

<script>
  import E from 'wangeditor'
  import tabelChange from './comEditor/tabelChange'

  export default {
    name: 'editor',
    data () {
      return {
        editorContent: ''
      }
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
      }
    },
    mounted () {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.lang = {
        '设置标题': 'title',
        '正文': 'p',
        '链接文字': 'link text',
        '链接': 'link',
        '上传图片': 'upload image',
        '上传': 'upload',
        '创建': 'init',
        '网络图片': 'img',
        '插入': 'insert',
        '图片link': 'imgUrl'
        // 还可自定添加更多
      }
      editor.create()
      editor.txt.html('<p style="color:#00a0af;">用 JS 设置的内容</p>')
    },
    components: {
      tabelChange
    }
  }
</script>

<style>
</style>
