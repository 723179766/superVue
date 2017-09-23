<template>
  <div class="more-model">
    <div class="title-box">
      <div class="left-box">
        <img :src="manInfo.provider_logo" alt="">
      </div>
      <div class="right-box">
        <div class="margin-bottom-5"><span class="title-info">{{manInfo.provider_name}}</span>
        <span class="abbr">(简称：{{manInfo.abbreviation}})</span></div>
        <div><span>地&nbsp;&nbsp;&nbsp;址：</span><span>{{manInfo.provider_address}}</span></div>
        <div><span>联系人：</span><span>{{manInfo.provider_user}}</span></div>
        <div><span>电&nbsp;&nbsp;&nbsp;话：</span><span>{{manInfo.provider_phone}}</span></div>
        <div><span>备&nbsp;&nbsp;&nbsp;注：</span><span>{{manInfo.provider_note}}</span></div>
      </div>
    </div>
    <div class="content-box">
        <div class="pos-info" v-for="(item,index) in term_model" @click="goDetail(item.id)">
            <div class="trapezoid" v-on:click.stop="deleteModel(item.id,index)">
              <div class="state icon iconfont icon-error"></div>
            </div>
            <img :src="item.term_model_logo" alt="">
            <div>{{item.term_model_name}}</div>
        </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../api/deviceApi'
  export default {
    name: 'MoreModel',
    
    data () {
      return {
        manInfo:{},
        term_model:[]
      }
    },
    methods: {
      loadInfo(){
        let vm = this,body = {
          provider_id:this.$route.query.providerId
        }
        api.getManData(body).then(resp=>{
            if(resp.data.code=='00000'){
              vm.manInfo = resp.data.data[0]
            }
        })
        api.getMoreModel(body).then(resp=>{
            if(resp.data.code=='00000'){
              vm.term_model = resp.data.data.term_model
            }
        })
      },
      goDetail(id){
        this.$router.push({name:'ModelDetail',params:{id:id}})
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
    mounted(){
      this.loadInfo()
    }
  }
</script>

<style lang='scss' scoped>
  .more-model .title-box{
    padding: 20px;
    background: #F7F9FA;
    border: 1px solid #ccc;
  }
  .more-model .title-box:after{
    display: block;
    content: " ";
    clear: both;
  }
  .title-box .left-box{
    float: left;
    height: 125px;
    line-height: 125px;
    text-align: center;
    margin-right: 15px;
    border:1px solid #ddd;
    padding: 4px;
    background: #fff;
  }
  .title-box .left-box img{
    width: 125px;
  }
  .title-box .right-box{
    float: left;
    width: 70%;
    padding-left: 10px;
    .abbr{
      color: #999;
    }
  }
  .title-box .title-info{
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  .more-model .content-box{
    padding: 15px;
    background: #fff;
    border: 1px solid #ccc;
    border-top-width: 0;
  }
  .pos-info{
    background: #f7f9fa;
    width: 164px;
    height: 208px;
    margin: 5px;
    border:1px solid #d9d9d9;
    display: inline-block;
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
</style>
