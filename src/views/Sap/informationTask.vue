<template>
    <el-container class="temlateMain">
          <el-header height='50px'>任务管理</el-header>
          <el-main>
                <el-row :gutter="20" class="header">
                    <el-col :span="9">
                        <div class="cell">
                             <div class="title">我的任务 <span class="right">总数<b>200</b></span></div>
                             <div class="content">
                                  <el-col :span="6">
                                      <p>50</p>
                                      <span>未开始</span>
                                  </el-col>
                                  <el-col :span="6">
                                      <p>50</p>
                                      <span>进行中</span>
                                  </el-col>
                                  <el-col :span="6">
                                      <p>50</p>
                                      <span>待审核</span>
                                  </el-col>
                                  <el-col :span="6">
                                      <p>50</p>
                                      <span>已结束</span>
                                  </el-col>

                             </div>

                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="cell">
                            <div class="title">我的事件 <span class="right">总数<b>200</b></span></div>
                            <div class="content">
                                <el-col :span="12">
                                    <p>50</p>
                                    <span>未开始</span>
                                </el-col>
                                <el-col :span="12">
                                    <p>50</p>
                                    <span>进行中</span>
                                </el-col>
                            </div>

                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="cell">
                            <div class="title">
                                 管理员窗口
                                <span class="right">
                                      总数
                                      <b>200</b>
                                      <el-button size="small">立即前往</el-button>
                                </span>
                            </div>
                            <div class="content">
                                <el-col :span="6">
                                       <p>50</p>
                                    <span>未开始</span>
                                </el-col>
                                <el-col :span="6">
                                       <p>50</p>
                                    <span>进行中</span>
                                </el-col>
                                <el-col :span="6">
                                       <p>50</p>
                                    <span>待审核</span>
                                </el-col>
                                <el-col :span="6">
                                       <p>50</p>
                                    <span>已结束</span>
                                </el-col>

                            </div>

                        </div>
                    </el-col>
                </el-row>
              <el-row :gutter="20" class="top">
                    <el-col :span="8">
                        <div class="cell">
                            <div class="title">上月新创建的任务数量</div>
                            <div class="time">2018/10/01-2018/11/01</div>
                            <div class="chart">
                                <v-chart :options="worlkTime" style="height:230px"/>
                            </div>
                            <div class="footer">新创建的全部任务比同年8月份上升8% </div>

                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="cell">
                               <div class="title">上月逾期的任务数量</div>
                            <div class="time">2018/10/01-2018/11/01</div>
                            <div class="chart">
                                <v-chart :options="worlkTime" style="height:230px"/>
                            </div>
                            <div class="footer">新创建的全部任务比同年8月份上升8% </div>

                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="cell">
                            <div class="title">上月审核的任务数量</div>
                            <div class="time">2018/10/01-2018/11/01</div>
                            <div class="chart">
                                <v-chart :options="worlkTime" style="height:230px"/>
                            </div>
                            <div class="footer">新创建的全部任务比同年8月份上升8% </div>
                        </div>
                    </el-col>
              </el-row>
               <el-row :gutter="20" class="mid">

                    <el-col :span="24">
                        <div class="cell">
                             <div class="title">员工流动分析</div>
                                <v-chart :options="outer" style="height:380px;width:100%"/>

                        </div>
                    </el-col>
              </el-row>
               <el-row :gutter="20" class="bottom">
                    <el-col :span="24"><div class="cell">
                             <div class="title">当前在职员工分析</div>
                                <v-chart :options="outer1" style="height:400px;width:100%"/>

                        </div></el-col>

              </el-row>

          </el-main>
    </el-container>
</template>

<script>
// import PicChart from '/components/PicChart'
import echarts from 'echarts'

export default {

  data() {
    return {
      worlkTime: {
        title: {
          text: '200人',
          subtext: '总计',

          x: '100px',
          y: '80px',
          show: false
        },
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        color: ['rgba(255,153,21,0.8)', 'rgba(255,153,21,0.45)'],
        legend: {
          orient: 'vertical',
          x: '280px',
          y: '75px',
          itemGap: 30,
          data: [
            { name: '男', number: '120' },
            { name: '女', number: '60' }
          ],
          // formatter: '{name} : {number} ({value}%)'

          formatter: function(name, number) {
            return name + ' ' + 20 + number
          }

        },

        calculable: true,
        series: [
          {
            name: '男女占比',
            type: 'pie',

            radius: ['40%', '75%'],

            center: ['125px', '100px'],
            avoidLabelOverlap: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'center',
                  formatter: '总数：200'
                },
                labelLine: {
                  show: false
                }
              }
              // emphasis: {
              //   // show: true,
              //   formatter: '{b} : {c} ({d}%)',
              //   textStyle: {
              //     fontSize: '30',
              //     fontWeight: 'bold'
              //   }
              // }
            },

            data: [
              { value: 320, name: '男', itemStyle: {
                normal: {
                // 颜色渐变
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1,
                    color: '#ffb759'
                  }, {
                    offset: 0,
                    color: '#fddd9e'
                  }])
                }
              }},
              { value: 240, name: '女', itemStyle: {
                normal: {
                // 颜色渐变
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1,
                    color: '#f00'
                  }, {
                    offset: 0,
                    color: '#fff'
                  }])
                }
              }}

            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      },
      outer: {
        title: {

        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false,
          data: ['最高气温', '蒸发量']
        },

        calculable: true,
        grid: {
          left: '20px',
          right: '20px',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: { show: false },
            axisTick: {
              // show: false,
              alignWithLabel: true
            },
            // boundaryGap: true,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: { show: false },

            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [

          {
            name: '蒸发量',
            type: 'bar',
            barWidth: '20px',
            data: [2.0, 4.9, 7.0, 23.2, 8, 6.4, 3.3],

            itemStyle: {
              normal: {
                // 颜色渐变
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 1,
                  color: '#ffb759'
                }, {
                  offset: 0,
                  color: '#fddd9e'
                }])
              }
            }

          }
        ]

      },
      outer1: {
        title: {

        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // show: true,
          show: false,

          data: ['最高气温', '蒸发量'],
          formatter: '{name}  {c}'
        },

        calculable: false,
        grid: {
          left: '20px',
          right: '20px',
          bottom: '20px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: { show: false },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#8a8a8a'
              }
            },
            axisTick: {
              // show: false,
              alignWithLabel: true
            },
            boundaryGap: true,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: { show: false },

            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#8a8a8a'
              },
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10, 13, 12, 3, 10, 3],
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#ffb759'
                }, {
                  offset: 1,
                  color: '#fddd9e'
                }])
              }
            }

          }

        ]

      }

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.temlateMain{

    .el-main{
        background: #f8f8f8;
        height: 100%;
        .cell{
            border-radius: 4px;
            background: #fff;
            overflow: hidden;
            // border:1px solid #dedede;
            height: 100%;
            .title{
                padding: 20px;
                font-size: 16px;
                font-weight: bold;
                color: #1a1a1a;
                .right{
                    float: right;
                    color: #8a8a8a;
                    font-size: 14px;
                    b{
                        font-weight: normal;
                        color: #f99740;
                        font-size: 22px;
                        margin-left: 10px;
                    }
                    .el-button{
                      margin-left: 20px;
                    }
                }
            }
        }
        .chart{
            height: 200px;
        }
        .header{
            .cell{
                height: 180px;
            }
            margin-bottom: 20px;
            .content{
                .el-col{
                    text-align: center;
                    p{
                        font-size: 36px;
                        font-weight: bold;
                        color: #333;
                        margin: 15px 0;
                    }
                    span{
                        color: #8a8a8a;
                        font-size: 14px;
                    }
                }
            }

        }
        .top{
            .cell{
                height: 300px;
                .title{
                    padding:20px 20px 5px;
                }
                .time{
                    color: #8a8a8a;
                    padding:0 20px 10px;
                }
                .footer{
                  text-align: right;
                  padding: 0 20px;
                  color: #f99740;
                }
            }
            margin-bottom: 20px;
        }
        .mid{
            .cell{
                height: 450px;
            }
            .mid_top{
                height: 140px;
                margin-bottom: 20px;
                p{
                    text-align: center;
                    font-size: 16px;
                    color: #8a8a8a;
                    padding: 32px 0 2px;
                    margin: 0;
                    b{
                        font-size: 26px;
                        color: #1a1a1a;
                        font-weight: normal;
                    }
                }
            }
            .mid_footer{
                height: 290px;

            }
            margin-bottom: 20px;

        }
        .bottom{
            .cell{
                height: 450px;
            }
            // margin-bottom: 40px;

        }
    }
}
</style>

