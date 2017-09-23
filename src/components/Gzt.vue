<template>
  <div class="gzt">
    <el-row :gutter="20">
      <el-col :span="12" class="padding-20">
        <div class="box">
          <div class="mch-num">
            <div>商户总数</div>
            <div>{{mchTotal}}</div>
          </div>
          <div class="l">
            <e-charts :options="option"></e-charts>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="padding-20">
        <div class="y-u">
          <el-row>
            <el-col :span="8">
              <div class="circle">
                <i class="el-icon-star-off"></i>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="title">
                <div>{{trade.count}}<span class="small">笔</span></div>
                <div class="small">今日交易笔数</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="y-d">
          <el-row>
            <el-col :span="8">
              <div class="circle">
                <i class="el-icon-menu"></i>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="title">
                <div>{{trade.amount}}<span class="small">元</span></div>
                <div class="small">今日交易金额</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {API} from '../config'
  import ECharts from 'vue-echarts/components/ECharts.vue'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/map'
  import 'echarts/lib/chart/radar'
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/chart/effectScatter'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/polar'
  import 'echarts/lib/component/geo'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/visualMap'
  import ElRow from 'element-ui/packages/row/src/row'
  export default {
    name: 'Gzt',
    components: {
      ElRow,
      ECharts
    },
    created(){
      return
      axios({
        method: 'get',
        url: API + '/business/firstIndex'
      }).then(resp=>{
        if(resp.data.code=="00000"){
          this.option.series[0].data[0].value = resp.data.data.shop.authenticated;
          this.option.series[0].data[1].value = resp.data.data.shop.unauthorized;
          this.trade.count = resp.data.data.trade.count;
          this.trade.amount = resp.data.data.trade.amount;
          this.mchTotal = resp.data.data.shop.total;
        }
      });
    },
    data () {
      return {
        mchTotal: 0,
        trade: {
          count: '',
          amount: ''
        },
        option: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            y: 'bottom',
            data: ['认证商户', '大众商户']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 0, name: '认证商户'},
                {value: 0, name: '大众商户'}
              ]
            }
          ]
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .l {
    width: 340px;
    height: 360px;
    margin: 0 auto;
  }
  .box{
    position: relative;
    border: 1px solid lightgrey;
    border-radius: 4px;
    background: #fff;
  }

  .box .mch-num{
    position: absolute;
    top: 50px;
    left: 30px;
    text-align: center;
  }
  .box .mch-num div:first-child{
    font-size: 18px;
    color: #8c939d;
  }
  .box .mch-num div:last-child{
    font-size: 24px;
    font-weight: 900;
  }

  .padding-20{
    padding: 0 20px 20px;
  }

  .y-u {
    height: 170px;
    margin-bottom: 20px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    background: #fff;
  }

  .y-d {
    height: 170px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    background: #fff;
  }

  .y-u .circle,.y-d .circle {
    border-radius: 100%;
    background-color: #00A0AF;
    height: 80px;
    line-height: 80px;
    text-align: center;
    width: 80px;
    color: white;
    font-size: 36px;
    margin-top: 45px;
    margin-left: 40px;
  }

  .y-u .title,.y-d .title {
    font-size: 24px;
    margin-top: 56px;
  }

  .y-u .title .small,.y-d .title .small{
    font-size: 14px;
  }

  .l .echarts {
    height: 280px;
    width: 100%
  }

  .y-u .echarts,.y-d .echarts {
    height: 170px;
    width: 100%;
  }
</style>
