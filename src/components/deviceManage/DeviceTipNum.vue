<template>
  <div class="dev-tip-num">
    <div class="title">
      <span class="tip"></span>
      <span class="title-font1">设备标签：</span>
      <span class="title-font2">{{label_name}}</span>
    </div>
    <div class="content">
      <div v-show="allData.length!=0" class="table-area">
        <table class="dj-table">
          <thead>
          <tr>
            <th class="md-width">SN号</th>
            <th>设备序列号</th>
            <th>厂商简称</th>
            <th>设备型号</th>
            <th>所属机构</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in currentData" @click="trClick(item,index)" v-bind:class="{'border-orange':selectd==index}">
            <td>
              <span class="a-link" @click="goDeviceInfoDetail(item.term_id)">{{item.term_id}}</span>
            </td>
            <td class="font-arial">{{item.terms.serial_number}}</td>
            <td class="font-pfsc">{{item.terms.term_models.provider.abbreviation}}</td>
            <td class="font-arial">{{item.terms.term_models.term_model_name}}</td>
            <td class="font-pfsc">{{item.terms.organizations.org_name}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-show="allData.length!=0" class="dj-page text-right padding-right-30">
        <span class="prev-page" @click="pageChanged('prev')" v-show="paginate.currentPage!=1">&lt;&nbsp;上一页</span>
        <span>第</span>
        <input type="number" class="dj-page-input" v-model="paginate.currentPage" v-on:keyup.enter="pageChanged()">
        <span>页</span>
        <span class="total-page">共{{paginate.totalPage}}页</span>
        <span class="next-page" @click="pageChanged('next')" v-show="paginate.currentPage!=paginate.totalPage">下一页&nbsp;&gt;</span>
        <span class="total-num">共{{paginate.totalItems}}条记录</span>
      </div>
      <div v-show="allData.length==0" class="text-center">
        <img class="margin-top-20" src="../../assets/noSearch.png" alt="">
      </div>
    </div>
    <div class="text-center margin-top-10">
      <button class="dj-btn dj-btn-back" @click="back">返回</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../../config'
  export default {
    name: 'DeviceTipNum',
    created () {
      this.getData(this.$route.params.id)
    },
    data () {
      return {
        selectd: -1,
        paginate:{
          totalPage: '',
          totalItems: '',
          currentPage: '1',
          pageSize: 500
        },
        allData:[],
        currentData:[],
        label_name: ''
      }
    },
    methods: {
      getData(id){
        let vm = this
        axios.post(API+"/termLabel/getTermList", {id: id})
          .then(function (res) {
            vm.allData = res.data.data[0].term_labels
            vm.label_name = res.data.data[0].label_name
            vm.currentData = res.data.data[0].term_labels.slice(0, vm.paginate.pageSize);
            vm.paginate.totalItems = res.data.data[0].term_labels.length
            vm.paginate.totalPage = Math.ceil(res.data.data[0].term_labels.length/vm.paginate.pageSize)
          })
      },
      pageChanged(arr){
        let vm = this
        if (arr == 'next') {
          vm.paginate.currentPage++
        } else if(arr == 'prev') {
          vm.paginate.currentPage--
        }
        vm.currentData = vm.allData.slice(vm.paginate.currentPage*vm.paginate.pageSize-vm.paginate.pageSize,vm.paginate.currentPage*vm.paginate.pageSize);
      },
      trClick(item,index){
        this.selectd = index;
      },
      goDeviceInfoDetail(item){
        this.$router.push({ name: 'DeviceInfoDetail',params:{id: item}});
      },
      back(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .dev-tip-num .title{
    position: relative;
    margin-bottom: 20px;
  }
  .dev-tip-num .tip{
    position: absolute;
    display: inline-block;
    width: 5px;
    height: 100%;
    background-color: #3aa5ff;
  }
  .dev-tip-num .title-font1{
    margin-left: 15px;
    font-weight: 600;
    color: #1f2d3d;
  }
  .dev-tip-num .title-font2{
    color: rgb(166,166,166);
  }
  .dev-tip-num .content{
    background: #fff;
    border: 1px solid #ccc;
    padding-bottom: 10px;
  }

</style>
