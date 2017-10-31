<template>
  <div style="margin-top: 3px">
    <div v-for="item in num" style="height: 36px">
      <button class="dj-btn dj-btn-success">{{item.label}}</button>
      <button class="dj-btn dj-btn-primary">{{item.label}}</button>
      <button class="dj-btn dj-btn-info">{{item.label}}</button>
      <button class="dj-btn dj-btn-warning">{{item.label}}</button>
      <button class="dj-btn dj-btn-danger">{{item.label}}</button>
      <button class="dj-btn dj-btn-fff">{{item.label}}</button>
      <button class="dj-btn dj-btn-icon-success"><i class="el-icon-plus icon-left"></i>ID->{{item.id}}</button>
      <button class="dj-btn dj-btn-icon-danger">ID->{{item.id}}<i class="el-icon-minus icon-right"></i></button>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.countNum(this.comTreeData[0].children);
      console.log(this.num)
    },
    data(){
      return{
        num: [
          {
            id: 1,
            label: '皇上'
          }
        ]
      }
    },
    methods:{
      countNum(data){
        for(var i=0;i<data.length;i++){
          this.num.push({
            id: data[i].id,
            label: data[i].label
          });
          if(data[i].children && data[i].children.length>0){
            this.countNum(data[i].children);
          }
        }
      }
    },
    props: {
      comTreeData: Array
    }
  }
</script>
<style>

</style>
