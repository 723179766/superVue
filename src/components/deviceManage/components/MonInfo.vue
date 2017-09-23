<template>
  <div class="mon-info">
    <div class="cap-info">
      <el-dropdown trigger="click" class="menu-icon">
        <span class="el-dropdown-link">
          <i class="icon iconfont icon-gengduo"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="editMan(cell.id)">修改</el-dropdown-item>
          <el-dropdown-item @click.native="deleteProvider(cell.id)">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="height:1px;width:314px;"></div>
      <img :src="cell.provider_logo" alt="">
      <p class="name show-ellipsis" :title="cell.provider_name">{{cell.provider_name}}</p>
      <p class="sname show-ellipsis">(简称：{{cell.abbreviation}})</p>
      <p class="base-info show-ellipsis" :title="cell.provider_address">地&emsp;址：{{cell.provider_address}}</p>
      <p class="base-info show-ellipsis">联系人：{{cell.provider_user}}</p>
      <p class="base-info show-ellipsis">电&emsp;话：{{cell.provider_phone}}</p>
      <p class="base-info show-ellipsis">备&emsp;注：{{cell.provider_note|note_con}}</p>
    </div>
    <div class="cap-pic">
      <div class="pos-info show" v-for="(item,index) in modelList" @click="goDetail(item.id)">
        <div class="trapezoid" @click.stop="deleteModel(item.id,index)">
          <div class="state icon iconfont icon-error"></div>
        </div>
        
        <img :src="item.term_model_logo" alt="">
        <p class="name">{{item.term_model_name}}</p>
      </div>
      

      <div class="pos-info more">
        <p class="all">型号总数：{{cell.term_model.length}}件</p>
        <p v-if="cell.term_model.length>3" class="type" @click="moreModel(cell.id)">更多型号>></p>
        <p v-else class="type-null"></p>
        <div class="btn" @click="addModel(cell.id)">
          +新增型号
        </div>
      </div>
      <div v-if="nullNum" class="pos-info-white" v-for="i in nullNum">
        
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from '../../../api/deviceApi'
  export default {
    props:{cell:Object},
    methods:{
      addModel(id){
        this.$router.push({path:'/AddModel',query:{providerId:id}})
      },
      moreModel(id){
        this.$router.push({path:'/MoreModel',query:{providerId:id}})
      },
      deleteProvider(id){
          this.$emit('deleteProvider',id)
      },
      goDetail(id){
        this.$router.push({name:'ModelDetail',params:{id:id}})
      },
      editMan(id){
        this.$router.push({path:'/EditMan',query:{providerId:id}})
      },
      deleteModel(id,index){
        /*本地删除数组，不做更新操作*/
        let vm = this,body = {
          term_model_id:id
        }
        vm.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          api.deleteModel(body).then(resp=>{
            if(resp.data.code=='00000'){
              vm.cell.term_model.splice(index,1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
                  
        });
        
      }
    },
    filters:{
      note_con(value){
        if(!value){
          return '无'
        }else{
          return value
        }
      }
    },
    computed:{
      modelList:function(){
        let vm = this
        if(vm.cell.term_model.length>3){
          return _.take(vm.cell.term_model,3)
        }else{
          return vm.cell.term_model
        }
      },
      nullNum:function(){
        if(this.cell.term_model.length<3)
         return parseInt(3 - this.cell.term_model.length)
      }
    }
  }
</script>
<style lang='scss' scoped>
  .mon-info{
    display: flex;
    width: 100%;
    height: 248px;
    .el-dropdown-link{
      position: relative;
      right: 6px;
      .icon-gengduo{
        font-size: 26px;
      }
    }
  }
  .mon-info .cap-info{
    position: relative;
    /*flex: 1;*/
    width: 380px !important;
    /*width: calc(100% - 718px);*/
    /*width: 500px;*/
    background: #f7f9fa;
    padding: 32px;
    border:1px solid #ddd;
  }
  .cap-info img{
    width: auto;
    height: 32px;
    margin-bottom: 15px;
  }
  .cap-info .name{
    color: #00a5ef;
    font-size: 16px;
  }
  .cap-info .sname{
    padding-bottom: 15px;
    color: #999;
    font-size: 12px;
  }
  .cap-info .base-info{
    font-size: 14px;
    color: #666;
    min-width: 280px;
    width: 100%;
  }
  .cap-pic{
    /*width: 718px !important;*/
    flex: 1;
    background: #fff;
    border:1px solid #ddd;
    border-left-width: 0;
    padding: 15px 11px;
    display: flex;
  }
  .pos-info{
    background: #f7f9fa;
    width: 164px;
    height: 208px;
    margin: 5px;
    border:1px solid #d9d9d9;
  }
  .pos-info-white{
    width: 164px;
    height: 208px;
    margin: 5px;
  }
  .pos-info.show{
    text-align: center;
    padding-top: 28px;
    cursor: pointer;
    position: relative;
    img{
      width: 130px;
      height: 130px;
      display: inline-block;
    }
  }
  .trapezoid{
    z-index: 1;
    position: absolute;
    top: -4px;
    right: -14.14px;
    width: 28.28px;
    height: 20px;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    border-bottom: 20px solid #e6262b;
    transform: rotate(45deg);
    /*transform-origin: right top;*/
    cursor: pointer;
  }
  .state{
    z-index: 10;
    position: absolute;
    top: 4px;
    right: -6px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    transform: rotate(45deg);
  }
  .pos-info.show .name{
    padding-top: 9px;
    font-size: 14px;
  }
  .pos-info.more{
    text-align: center;
  }
  .pos-info.more .all{
    padding-top: 71px;
    color: #999;
  }
  .pos-info.more .type{
    color: #00a5ef;
    font-size: 12px;
    padding-top: 6px;
    cursor: pointer;
  }
  .pos-info.more .type-null{
    color: #00a5ef;
    font-size: 12px;
    padding-top: 6px;
    height: 24px;
    width: 1;
    cursor: pointer;
  }
  .pos-info.more .btn{
    width: 112px;
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    border: 1px solid #ddd;
    background-color: #fff;
    display: inline-block;
    margin-top: 24px;
    cursor: pointer;
  }
  .menu-icon{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #6F6F6F;
    cursor: pointer;
  }
</style>
