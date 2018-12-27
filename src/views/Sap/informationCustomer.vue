<template>
    <el-container class="temlateMain">
          <el-header height='50px'>客户管理</el-header>
          <el-main>
              <el-row :gutter="20" class="top">
                    <el-col :span="11">
                        <div class="cell">
                            <div class="title">我的本月简报</div>
                            <img src="@/assets/info/infoCustomer_left.png" alt="">
                            <div class="content">
                                <div class="cel">
                                    <p>新建客户</p>
                                    <span>50<sup>人</sup></span>
                                </div>
                                 <div class="cel">
                                    <p>负责客户</p>
                                    <span>50<sup>人</sup></span>
                                </div>
                                 <div class="cel">
                                    <p>可见客户</p>
                                    <span>50<sup>人</sup></span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="13">
                        <div class="cell">
                            <div class="title">我的本月跟进</div>
                            <img src="@/assets/info/infoCustomer_right.png" alt="">

                             <div class="content">
                                <div class=" cel cel_1">
                                    <p>会议沟通</p>
                                    <span>50<sup>人</sup></span>
                                </div>
                                 <div class="cel cel_1">
                                    <p>网上沟通</p>
                                    <span>50<sup>人</sup></span>
                                </div>
                                 <div class="cel cel_1">
                                    <p>外勤拜访</p>
                                    <span>50<sup>人</sup></span>
                                </div>
                                 <div class="cel cel_1">
                                    <p>其他</p>
                                    <span>50<sup>人</sup></span>
                                </div>
                            </div>
                        </div>
                    </el-col>

              </el-row>
               <el-row :gutter="20" class="mid">
                    <el-col :span="24">
                        <div class="cell">
                             <div class="title">当前在职员工分析</div>
                                <v-chart :options="outer1" style="height:400px;width:100%"/>
                        </div>
                    </el-col>
              </el-row>
               <el-row :gutter="20" class="bottom">
                    <el-col :span="24">
                        <div class="cell">
                             <div class="title">当前在职员工分析</div>
                                <v-chart :options="outer2" style="height:400px;width:100%"/>
                        </div>
                    </el-col>

              </el-row>

          </el-main>
    </el-container>
</template>

<script>
// import PicChart from '/components/PicChart'
import echarts from 'echarts'

export default {

  data() {
    var xAxisData = []
    var data1 = []
    var data2 = []
    var data3 = []
    var data4 = []

    for (var i = 0; i < 30; i++) {
      xAxisData.push('Class' + i)
      data1.push((Math.random() * 2).toFixed(2))
      data2.push(Math.random().toFixed(2))
      data3.push((Math.random() * 5).toFixed(2))
      data4.push((Math.random() + 0.3).toFixed(2))
    }

    return {

      outer1: {
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
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
            boundaryGap: [0, 0],
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
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

      },
      outer2: {
        title: {

        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['bar', 'bar2', 'bar3', 'bar4'],
          align: 'right',
          left: 10
        },
        color: ['#fdb73d', '#fecc77', '#fee2b1', '#fff1d8'],
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,

            boundaryGap: [0, 0],
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'bar',
            type: 'bar',
            stack: 'one',
            barWidth: '30%',
            // itemStyle: itemStyle,
            data: data1
          },
          {
            name: 'bar2',
            type: 'bar',
            stack: 'one',
            barWidth: '30%',
            // itemStyle: itemStyle,
            data: data2
          },
          {
            name: 'bar3',
            type: 'bar',
            stack: 'one',
            barWidth: '30%',
            // itemStyle: itemStyle,
            data: data3
          },
          {
            name: 'bar4',
            type: 'bar',
            stack: 'one',
            barWidth: '30%',
            // itemStyle: itemStyle,
            data: data4
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
            // border:1px solid #dedede;
            height: 100%;
            .title{
                padding: 20px;
                font-size: 16px;
                font-weight: bold;
                color: #1a1a1a;
            }
        }
        .chart{
            height: 200px;
        }
        .top{
            .cell{
                height: 180px;
                position: relative;
                overflow: hidden;
                img{
                    position: absolute;
                    z-index: 22;
                    right: -20px;
                }
                .title{
                    color: #fff;
                }
                // background: #f99740;
                background: -webkit-linear-gradient(left, #ffc36e, #ffb359 ); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(right, #ffc36e,  #ffb359 ); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(right , #ffc36e, #ffb359); /* Firefox 3.6 - 15 */
                background: linear-gradient(to right , #ffc36e, #ffb359); /* 标准的语法 */
                .content{
                    margin-top: 20px;
                    height: 60px;
                    .cel{
                        width: 25%;
                        &.cel_1{
                            width: 20%;
                        }
                        color: #fff;
                        text-align: center;
                        float: left;
                        p{
                            margin: 0;
                            font-size: 16px;
                            margin-bottom: 10px;
                        }
                        span{
                            font-size: 36px;
                            sup{
                                font-size: 16px;
                            }
                        }
                    }
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

