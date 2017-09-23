<!-- addTree editTree deleteTree dropTree都是可以配置的 -->
<template>
  <!-- [:draggable="{Boolean}"] 空节点不能被拖动，判断依据是是否存在 node.name -->
  <!-- [@dragover.prevent] 必须设置，否则浏览器默认是禁用拖动的 -->
  <div class="tree-node" :class="{'empty-node':!node[defaultProps.name]}"
       :draggable="!!node[defaultProps.name]&&defaultProps.dropTree"
       @dragover.prevent
       @dragstart.stop="handleDragStart"
       @drop.stop="handleDrop"
       @dragenter.stop="handleDragEnter"
       @dragleave.stop="handleDragLeave"
       @dragend.prevent="handleDragEnd">
    <div class="drop-tree-content" :style="{paddingLeft:level+'rem'}" v-if="node[defaultProps.name]" @mouseout="nodehoverout" @mouseover="nodehoverin"
         @click.stop="nodeClick" ref="curNode" :class="{'hoverNode':hoverFlag}">
      <span class="drop-tree-icon" :class="{'drop-tree-icon-show':showIconFlag,'expanded':childrenFlag}" @click.stop="toggleContent"></span>
      <span class="drop-tree-label" @click="handleClick">{{node[defaultProps.name]}}</span>
      <div v-show="hoverFlag" class="tree-operate">
        <a v-if="defaultProps.addTree" class="el-icon-plus" @click.stop="addNode"></a>
        <a v-if="defaultProps.editTree" class="el-icon-edit" @click.stop="editNode"></a>
        <a v-if="defaultProps.deleteTree && level!=1" class="el-icon-delete" @click.stop="deleteNode"></a>
      </div>
    </div>
    <transition name="slide-fade">
      <!-- level配置展开几级节点 -->
      <div v-show="childrenFlag || level==1" class="tree-node-children" v-if="children && children.length">
        <drop-tree v-for="(child,index) in children"
                   :defaultProps="defaultProps" :node="child" :idx="index" @dropClick="dropClick"
                   @addTree="addTree" @editTree="editTree" @deleteTree="deleteTree" @dropTree="dropTree">
        </drop-tree>
      </div>
    </transition>
  </div>
</template>
<script>
  export default{
    name:'drop-tree', // 递归组件需指明 name
    data(){
      return {
        hoverFlag:false,
        childrenFlag:false
      }
    },
    props:{
      node:{
        type:Object,// 节点数据，形如 { name: 'xxx', children: [] }
        required:true
      },
      idx:{
        type:Number,// v-for 的索引，用于相邻节点的判别
        required:false
      },
      defaultProps:{
        type:Object,
        required:false
      }
    },
    computed: {
      children () { // 为每个子节点前后都生成空节点，便于实现兄弟节点间的“插入排序”
        // 举例：原本是 [N1, N2, N3]
        var children = this.node[this.defaultProps.children];
        // 让第一个节点为展开状态
//        this.childrenFlag=true;//展开全部节点
        if(this.node[this.defaultProps.name]==''){
          this.childrenFlag=true
        }
        if (!children || !children.length) return [];
        let _children = [];
        children.forEach(child => {_children.push({}, child)})
        _children.push({});
        // 最后生成 [E1, N1, E2, N2, E3, N3, E4]（其中 N 表示节点，E 表示空节点）
        if(!this.node.hasOwnProperty('level')){
          this.node.level = 0;
          _children.forEach(child=>child.level = this.node.level+1)
        }else{
          if(_children!=={}){
            _children.forEach(child=>child.level = this.node.level+1)
          }
        }
        return _children
      },
      showIconFlag(){
        return this.children&&this.children.length>0
      },
      level(){
        if(!this.node.hasOwnProperty('level'))
          return 1;
        else
          return this.node.level+1
      }
    },
    methods: {
      clearBgColor () { // 清理样式
        this.$el.style.backgroundColor = ''
      },
      handleDragStart () {
        window._DRAG_NODE_ = this;
        this.$el.style.backgroundColor = 'silver'
      },
      handleDrop () {
        this.clearBgColor(); // 此时 this 为目的地节点，window._DRAG_NODE_ 才是被拖动节点
        if (!this.isAllowToDrop()) {
          window._DRAG_NODE_=null;
          return
        }
        // 无论如何都直接删除被拖动节点
        var tempnodes=window._DRAG_NODE_.$parent.node[this.defaultProps.children];
        tempnodes.forEach((e,index)=>{
          if(e==window._DRAG_NODE_.node){
          tempnodes.splice(index,1);
        }
      })
        // 情况 1：拖入空节点，成其兄弟（使用 splice 插入节点）
        if (!this.node[this.defaultProps.name]){
          let parentNode=this.$parent.node;
          var drop=window._DRAG_NODE_.node;
          var dest_parent=parentNode;
          // 从上往下移
          if(window._DRAG_NODE_.idx<this.idx){
            parentNode[this.defaultProps.children].splice(this.idx / 2 - 1, 0, window._DRAG_NODE_.node);
            if([this.idx/2]==0){
              var prev=null;
            }else{
              var prev=parentNode[this.defaultProps.children][this.idx/2-2]
            }
            if(this.idx/2===parentNode[this.defaultProps.children].length){
              var next=null
            }else{
              var next=parentNode[this.defaultProps.children][this.idx/2]
            }
          }else{
            parentNode[this.defaultProps.children].splice(this.idx / 2, 0, window._DRAG_NODE_.node);
            if([this.idx/2]==0){
              var prev=null;
            }else{
              var prev = parentNode[this.defaultProps.children][this.idx/2-1]
            }
            if(this.idx/2===parentNode[this.defaultProps.children].length){
              var next=null
            }else{
              var next=parentNode[this.defaultProps.children][this.idx/2+1]
            }
          }
          this.dropTree(dest_parent,drop,next,prev)
        }else{
          // 情况2：拖入普通节点，成为其子
          var id=window._DRAG_NODE_.node;
          var dest_parent=this.node;
          var next=null;
          if(!this.node[this.defaultProps.children]){
            this.$set(this.node,this.defaultProps.children,[]);
            this.node[this.defaultProps.children].push(window._DRAG_NODE_.node);
            var prev=null;
          }else{
            this.node[this.defaultProps.children].push(window._DRAG_NODE_.node);
            var prev=this.node[this.defaultProps.children][this.node[this.defaultProps.children].length-2]
          }
          this.dropTree(dest_parent,id,next,prev)
        }
        window._DRAG_NODE_=null;
      },
      handleDragEnter () { // 允许拖放才会显示样式
        if (!this.isAllowToDrop()) return;
        this.$el.style.backgroundColor = 'yellow'
      },
      handleDragLeave () {
        this.clearBgColor()
      },
      handleDragEnd () {
        this.clearBgColor()
      },
      isParent () { // 拖放限制 1：判断目标地址是否为被拖动节点的父节点
        return this === window._DRAG_NODE_.$parent
      },
      isNextToMe () { // 拖放限制 2：判断目标地址是否为被拖动节点的相邻节点
        return this.$parent === window._DRAG_NODE_.$parent && Math.abs(this.idx - window._DRAG_NODE_.idx) === 1
      },
      isMeOrMyAncestor () { // 拖放限制 3：判断目标地址是否为拖动节点自身或者拖动节点子节点
        var p = this;
        while (p) {
          if (window._DRAG_NODE_ === p) return true;
          p = p.$parent
        }
      },
      isAllowToDrop () { // 上述拖放限制条件的综合
        return !(this.isParent() || this.isNextToMe() || this.isMeOrMyAncestor())
      },
      /*样式类函数*/
      nodehoverin(){
        this.hoverFlag=true;
      },
      nodehoverout(){
        this.hoverFlag=false;
      },
      toggleContent(item){
        this.childrenFlag=!this.childrenFlag;
      },
      addChooseNode(){
        var dom = document.querySelectorAll('.drop-tree-content');
        // 兼容edge
        dom = Array.prototype.slice.call(dom);
        dom.forEach((item)=>{
          item.style.backgroundColor = ''
      })
        this.$refs.curNode.style.backgroundColor = '#124667'
      },
      nodeClick(){
        this.addChooseNode();
        this.handleClick();
      },
      dropClick(data){
        this.$emit('dropClick',data)
      },
      addTree(data){
        this.$emit('addTree',data)
      },
      editTree(data){
        this.$emit('editTree',data)
      },
      deleteTree(data){
        this.$emit('deleteTree',data)
      },
      dropTree(dest_parent,drop,next,prev){
        this.$emit('dropTree',dest_parent,drop,next,prev)
      },

      /*操作类函数*/
      handleClick(){
        this.dropClick(this.node)
      },
      deleteNode(){
        this.deleteTree(this.node)
      },
      addNode(){
        this.addTree(this.node)
      },
      editNode(){
        this.editTree(this.node)
      }
    }
  }
</script>
<style>
  .drop-tree-label{
    cursor: pointer;
    padding: 0 5px;
    border-radius: 4px;
  }
  .tree-node{
    cursor: pointer;
  }
  .tree-node.empty-node { /* 空节点 */
    height: .5em;
    list-style-type: none;
  }
  .tree-node-children { /* 层次缩进 */
  }
  .hoverNode{
    background-color:#1b618e;
  }
  .drop-tree-icon{
    display: inline-block;
    cursor: pointer;
    width: 0;
    height: 0;
    vertical-align: middle;
    border: 7px solid transparent;
    border-right-width: 0;
    border-left-width: 9px;
    transform: rotate(0deg);
    transition: transform .3s ease-in-out;
    margin-right: 3px;
  }
  .drop-tree-content{
    width: 100%;
  }
  .drop-tree-icon-show{
    border-left-color: #99a9bf;
  }
  .drop-tree-icon.expanded{
    transform: rotate(90deg);
  }
  .drop-tree-label{
    line-height: 26px;
    font-size: 14px;
    vertical-align: middle;
    display: inline-block;
  }
  .tree-operate{
    display: inline-block;
    cursor: pointer;
  }
  .tree-operate a:before{
    color: rgba(255,255,255,.7);
  }
  .tree-operate a:hover:before{
    color: rgba(255,255,255,1);
  }
  .tree-operate a:hover{
    text-decoration: none;
  }
  .slide-fade-enter-active {
    transition: all .5s ease-in-out;
    overflow-y: hidden;
  }
  .slide-fade-leave-active {
    transition: all .5s ease-in-out;
  }
  .slide-fade-enter, .slide-fade-leave-active {
    /*overflow-y: hidden;*/
    /*height: 0;*/
    padding-left: 10px;
    opacity: 0;
  }
</style>
