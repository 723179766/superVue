<template>
  <div id="echarts">
    <div v-for="(item, index) in echartsArr" :id="'main' + index"></div>
    <div>
      <el-button size="medium" class="dj-block" @click="addEcharts">
        <i class="el-icon-plus"></i>添加图表
      </el-button>
    </div>
    <div>
      <el-button size="medium" class="dj-block" @click="delEcharts">
        <i class="el-icon-minus"></i>删除图表
      </el-button>
    </div>
    <div>
      <el-button size="medium" class="dj-block" @click="changeDate">
        <i class="el-icon-time"></i>改变时间
      </el-button>
    </div>
  </div>
</template>

<script>
  var echarts = require('echarts')

  export default {
    name: 'echarts',
    data () {
      return {
        echartsArr: [
          {}, {}
        ]
      }
    },
    methods: {
      addEcharts () {
        let vm = this
        this.echartsArr.push({})
        setTimeout(function () {
          vm.initSingle()
        }, 2000)
      },
      delEcharts () {
        this.echartsArr.splice(1, 1)
      },
      initSingle () {
        var index = 2
        let myChart = echarts.init(document.getElementById('main' + index))
        let option = {
          title: {
            text: '金额 ($)',
            textStyle: {
              color: '#000'
            },
            left: '100px'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            textStyle: {
              color: '#000'
            },
            data: ['入金量 ($)', '出金量 ($)']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {
                show: true,
                type: ['line', 'bar'],
                icon: {
                  line: 'image:///static/img/downArrow1.png',
                  bar: 'image:///static/img/downArrow2.png'
                }
              }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '入金量 ($)',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '出金量 ($)',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            }
          ]
        }
        myChart.setOption(option)
      },
      changeDate () {
        var index = 2
        let myChart = echarts.init(document.getElementById('main' + index))
        let option = {
          title: {
            text: '金额 ($)',
            textStyle: {
              color: '#000'
            },
            left: '100px'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            textStyle: {
              color: '#000'
            },
            data: ['入金量 ($)', '出金量 ($)']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {
                show: true,
                type: ['line', 'bar'],
                icon: {
                  line: 'image:///static/img/downArrow1.png',
                  bar: 'image:///static/img/downArrow2.png'
                }
              }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '入金量 ($)',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0]
            },
            {
              name: '出金量 ($)',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8]
            }
          ]
        }
        myChart.setOption(option)
      }
    },
    mounted () {
      this.echartsArr.forEach(function (val, index, arr) {
        let myChart = echarts.init(document.getElementById('mai1n' + index))
        let option = {
          color: ['#D0011B', '#B89D60'],
          title: {
            text: '金额 ($)',
            textStyle: {
              color: '#000'
            },
            left: '100px'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            textStyle: {
              color: '#000'
            },
            data: ['入金量 ($)', '出金量 ($)']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {
                show: true,
                type: ['line', 'bar'],
                icon: {
                  line: 'image:///static/img/downArrow1.png',
                  bar: 'image:///static/img/downArrow2.png'
                }
              }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
              name: '时间'
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '入金量 ($)',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 420.0005]
            },
            {
              name: '出金量 ($)',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8]
            }
          ]
        }
        myChart.setOption(option)
      })
    }
  }
</script>

<style lang='scss'>
  #echarts{
    #main0{
      width: 70%;
      height: 550px;
      margin: 0 auto;
      border: 1px solid #c0ccda;
      margin-bottom: 40px;
    }
    #main1{
      width: 70%;
      height: 550px;
      margin: 0 auto;
      border: 1px solid #c0ccda;
      margin-bottom: 40px;
    }
    #main2{
      width: 70%;
      height: 550px;
      margin: 0 auto;
      border: 1px solid #c0ccda;
      margin-bottom: 40px;
    }
  }
</style>
