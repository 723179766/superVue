<template>
  <div class="com-solt-father">
    <h2>我是子组件的标题</h2>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot>只有在没有要分发的内容时才会显示。</slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
    <template style="height: 100px;width: 100px">
      <slot name="newName"></slot>
    </template>
  </div>
</template>

<script>
  export default {
    created () {

    }
  }
</script>

<style>
  .com-solt-father{
    width: 400px;
    height: 400px;
    background: #87cefa;
  }
</style>
