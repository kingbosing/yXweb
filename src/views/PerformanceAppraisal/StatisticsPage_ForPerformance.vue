<template>
 <el-container class="temlateMain">
        <el-header height="50px">
            <span>员工考核统计</span>
            <el-button class="toPrint" size="medium" v-on:click="toPrint">打印</el-button>
        </el-header>
        <el-main>
           <div>
                <div class="BoxContent scroll">
                    <div class="table" id="mydiv">
                        <table border="1" cellspacing="0" cellpadding="0">
                            <tr>
                                <td colspan="7"><div class="col_1" style="width:100%;height:58px;font-size:24px;background:#ccc;"><b>赢来控股及子公司{{time}}月绩效考核表</b></div></td>
                            </tr>
                            <tr>
                                <td colspan="1" style="width:168px;height:58px" class="col_1"><b>姓名</b></td>
                                <td colspan="1" style="width:268px;height:58px" class="col_2">{{Data.Name}}</td>
                                <td colspan="1" style="width:138px;height:58px" class="col_1"><b>职位</b></td>
                                <td colspan="1" style="width:176px;height:58px" class="col_2">{{Data.Job}}</td>
                                <td colspan="1" style="width:138px;height:58px" class="col_1"><b>部门</b></td>
                                <td colspan="1" style="width:224px;height:58px" class="col_2">{{Data.DepartName}}</td>
                            </tr>
                        </table>

                        <table border="1" cellspacing="0" cellpadding="0">
                            <tr class="row_1">
                                <td rowspan="2" style="width:168px;height:90px" class="col_3"><b>通用考核<br />20分</b></td>
                                <td colspan="1" style="width:268px;height:44px" class="col_1"><b>考核项目</b></td>
                                <td colspan="1" style="width:316px;height:44px" class="col_1"><b>考核指标</b></td>
                                <td colspan="1" style="width:196px;height:44px" class="col_1"><b>直属领导评分</b></td>
                                <td colspan="1" style="width:164px;height:44px" class="col_1"><b>评分结果</b></td>

                            </tr>
                            <tr class="row_1">
                                <td colspan="2" class="col_2">详见“通用考核说明”</td>
                                <td colspan="1" class="col_2"> {{Data.CommonlyScore*5 }}</td>
                                <td colspan="1" class="col_2"> {{Data.CommonlyScore }}</td>
                            </tr>

                            <tr class="row_1">
                                <td rowspan="2" class="col_3"><b>岗位工作考核<br />20分</b></td>
                                <td colspan="1" class="col_1"><b>考核项目</b></td>
                                <td colspan="1" class="col_1"><b>考核指标</b></td>
                                <td colspan="1" class="col_1"><b>直属领导评分</b></td>
                                <td colspan="1" class="col_1"><b>评分结果</b></td>

                            </tr>
                            <tr class="row_1">
                                <td colspan="2" class="col_2">详见“岗位工作考核说明”</td>
                                <td colspan="1" class="col_2">{{Data.JobWorkScore*5}}</td>
                                <td colspan="1" class="col_2">{{Data.JobWorkScore}}</td>
                            </tr>
                        </table>

                        <table border="1" cellspacing="0" cellpadding="0" class="table_three">

                            <tr class="row_2">
                                <td rowspan="14" style="width:168px;height:90px" class="col_3"><b>工作成果考核<br />30分</b></td>
                                <td rowspan="1" style="width:268px;height:44px" class="col_1"><b>考核项目</b></td>
                                <td colspan="1" style="width:110px;height:44px" class="col_1"><b>类别</b></td>
                                <td colspan="1" style="width:204px;height:44px" class="col_1"><b>数量</b></td>
                                <td colspan="1" style="width:88px;height:44px" class="col_1"><b>自评</b></td>
                                <td colspan="1" style="width:108px;height:44px" class="col_1"><b>直属领导评分</b></td>
                                <td colspan="1" style="width:164px;height:44px" class="col_1"><b>评分结果</b></td>

                            </tr>
                            <tr class="row_2" v-for="(k,v) in MonthWorkRes.Recoreds" :key="v" v-if="MonthWorkResLength>0">

                                <td v-bind:rowspan="MonthWorkResLength" style="width:268px;height:44px" class="col_1" v-if="v==0"><b>月工作成果</b><br />详见“工作考核说明”</td>

                                <td colspan="1" class="col_2">{{k.TypeName}}</td>
                                <td colspan="1" class="col_2">{{k.count}}</td>
                                <td colspan="1" class="col_2">{{k.SelfScore}}</td>
                                <td colspan="1" class="col_2">{{k.LeaderScore}}</td>
                                <td v-bind:rowspan="MonthWorkResLength" class="col_2" v-if="v==0"><b>{{MonthWorkRes.MonthScore}}</b></td>
                            </tr>
                            <tr class="row_2" v-if="MonthWorkResLength<=0">
                                <td rowspan="1" style="width:268px;height:44px" class="col_1"><b>月工作成果</b><br />详见“工作考核说明”</td>

                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td rowspan="1" class="col_2">-</td>
                            </tr>

                            <tr class="row_2" v-for="(k,v) in MonthWorkMiss.Recoreds" :key="v" v-if="MonthWorkMissLength>0">
                                <td v-bind:rowspan="MonthWorkMissLength" class="col_1" v-if="v==0"><b>月工作失误</b><br />详见“岗位工作考核说明”</td>
                                <td colspan="1" class="col_2">{{k.TypeName}}</td>
                                <td colspan="1" class="col_2">{{k.count}}</td>
                                <td colspan="1" class="col_2">{{k.SelfScore}}</td>
                                <td colspan="1" class="col_2">{{k.LeaderScore}}</td>
                                <td v-bind:rowspan="MonthWorkMissLength" class="col_2" v-if="v==0"><b>{{MonthWorkMiss.MonthScore}}</b></td>
                            </tr>
                            <tr class="row_2" v-if="MonthWorkMissLength<=0">
                                <td rowspan="1" class="col_1"><b>月工作失误</b><br />详见“岗位工作考核说明”</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td rowspan="1" class="col_2">-</td>
                            </tr>

                            <tr class="row_2" v-for="(k,v) in MonthWorkLoss.Recoreds" :key="v" v-if="MonthWorkLossLength>0">
                                <td v-bind:rowspan="MonthWorkLossLength" class="col_1" v-if="v==0"><b>月损失</b><br />详见“岗位工作考核说明”</td>
                                <td colspan="1" class="col_2">{{k.TypeName}}</td>
                                <td colspan="1" class="col_2">{{k.count}}</td>
                                <td colspan="1" class="col_2">{{k.SelfScore}}</td>
                                <td colspan="1" class="col_2">{{k.LeaderScore}}</td>
                                <td v-bind:rowspan="MonthWorkLossLength" class="col_2" v-if="v==0"><b>{{MonthWorkLoss.MonthScore}}</b></td>
                            </tr>
                            <tr class="row_2"  v-if="MonthWorkLossLength<=0">
                                <td rowspan="1" class="col_1"><b>月损失</b><br />详见“岗位工作考核说明”</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td rowspan="1" class="col_2" >-</td>
                            </tr>
                        </table>

                        <table border="1" cellspacing="0" cellpadding="0" class="table_two">

                            <tr class="row_2">
                                <td v-bind:rowspan="MonthOutputItemLength+2" style="width:168px;" class="col_3"><b>月产值考核<br />30分</b></td>
                                <td rowspan="1" style="width:268px;height:44px" class="col_1"><b>考核项目</b></td>
                                <td colspan="1" style="width:110px;height:44px" class="col_1"><b>类别</b></td>
                                <td colspan="1" style="width:204px;height:44px" class="col_1"><b>数量</b></td>
                                <td colspan="1" style="width:196px;height:44px" class="col_1"><b>直属领导评分</b></td>
                                <td colspan="1" style="width:164px;height:44px" class="col_1"><b>评分结果</b></td>

                            </tr>
                            <tr class="row_2" v-for="(k,v) in MonthOutputItem.Recoreds" :key="v" v-if="MonthOutputItemLength>0">
                                <td v-bind:rowspan="MonthOutputItemLength" style="width:268px;height:44px" class="col_1" v-if="v==0"><b>月产值</b><br />详见“岗位工作考核说明”</td>

                                <td colspan="1" class="col_2">{{k.TypeName}}</td>
                                <td colspan="1" class="col_2">{{k.count}}</td>
                                <td colspan="1" class="col_2">{{k.LeaderScore}}</td>
                                <td v-bind:rowspan="MonthOutputItemLength" class="col_2" v-if="v==0"><b>{{MonthOutputItem.MonthScore}}</b></td>

                            </tr>
                            <tr class="row_2"  v-if="MonthOutputItemLength<=0">
                                <td rowspan="1" style="width:268px;height:44px" class="col_1"><b>月产值</b><br />详见“岗位工作考核说明”</td>

                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td colspan="1" class="col_2">-</td>
                                <td rowspan="1" class="col_2">-</td>

                            </tr>
                        </table>

                        <table border="1" cellspacing="0" cellpadding="0" class="table_three">

                            <tr class="row_2">
                                <td rowspan="5" style="width:168px;" class="col_3"><b>月得分</b></td>
                                <td rowspan="1" style="width:268px;height:44px" class="col_1"><b>通用考核得分</b></td>
                                <td colspan="1" style="width:110px;height:44px" class="col_2">{{MonthScoreRes.CommonlyScore}}</td>
                                <td colspan="1" style="width:204px;height:44px" class="col_1"><b>月均得分</b></td>

                                <td colspan="1" style="width:110px;height:44px" class="col_2">{{MonthScoreRes.MonthAverageScore}}</td>
                                <td colspan="1" class="col_2"  style="width:250px;height:44px" ></td>

                            </tr>
                            <tr class="row_2">
                                <td rowspan="1" class="col_1"><b>岗位工作考核得分</b></td>
                                <td colspan="1" class="col_2">{{MonthScoreRes.JobWorkScore}}</td>
                                <td colspan="1" class="col_1"><b>正负比</b></td>

                                <td colspan="1" class="col_2">{{MonthScoreRes.PNR}}</td>
                                <td colspan="2" class="col_2"></td>

                            </tr>
                            <tr class="row_2">
                                <td rowspan="1" class="col_1"><b>工作成果考核</b></td>
                                <td colspan="1" class="col_2">{{MonthScoreRes.JobResScore}}</td>
                                <td colspan="2" class="col_2"></td>
                                <td colspan="2" class="col_2"></td>
                            </tr>
                            <tr class="row_2">
                                <td rowspan="1" class="col_1"><b>月产值考核得分</b></td>
                                <td colspan="1" class="col_2">{{MonthScoreRes.MonthOutputScore}}</td>
                                <td colspan="2" class="col_2"></td>
                                <td colspan="2" class="col_2"></td>
                            </tr>
                            <tr class="row_2">
                                <td rowspan="1" class="col_1"><b>总计</b></td>
                                <td colspan="1" class="col_2"><b>{{MonthScoreRes.TotalScore}}</b></td>
                                <td colspan="2" class="col_2"></td>
                                <td colspan="2" class="col_2"></td>
                            </tr>
                        </table>

                        <table border="1" cellspacing="0" cellpadding="0">

                            <tr class="row_2">
                                <td rowspan="1" style="width:168px;height:225px" class="col_3"><b>考评项目</b></td>
                                <td rowspan="1" style="width:943px;height:225px" class="col_2">
                                    <div style="height: 100%; width: 100%;text-align: left;padding: 0px 10px 20px;" class="theDeclare">
                                        <h4>考核说明：</h4>
                                        <p>1.本考核得分作为绩效部分薪资计算依据。</p>
                                        <p>2.本考核总分为100分，通用考核20分，岗位工作考核20分，工作成果考核30分，月产值考核30分。</p>
                                        <p>3.普通员工由直属领导及分管领导考核，部门负责人由分管领导考核。</p>
                                        <p>4.员工当月出勤天数不满应出勤天数的50%，则无资格进行绩效考核。(调休、年休假除外)</p>
                                        <p>5.通用部分考核未尽事宜按照公司“员工手册”上相关规定执行。</p>
                                        <p>6.被考核人因故意或重大过失导致未完成工作，给公司造成损失的，按照如下方式进行处罚：（1）损失&lt;3000元的，不予发放当月绩效奖金；（2）3000≦损失&lt;10000元的，连续六个月不予参加绩效考核；（3）10000≦损失&lt;30000元的，连续12个月不予参加绩效考核，并给予通告批评；（4）损失≧30000元的，公司有权直接予以辞退处罚。</p>
                                        <p>7.考核领导小组对考核分值有最终决定权、最终解释权。</p>

                                    </div></td>

                            </tr>

                        </table>

                        <table border="1" cellspacing="0" cellpadding="0" class="table_three">

                            <tr class="row_2">
                                <td rowspan="1" style="width:560px;height:125px" class="col_2"><div style="height: 75%; width: 100%;text-align: left;padding: 10px;">被考核人签名：</div><div style="height: 25%; width: 100%;text-align: right;padding-right:20px">2018年 &nbsp; 月 &nbsp; 日</div></td>
                                <td rowspan="1" style="width:553px;height:125px" class="col_2"><div style="height: 75%; width: 100%;text-align: left;padding: 10px;">直属领导（小组/部门负责人）签名：</div><div style="height: 25%; width: 100%;text-align: right;padding-right:20px">2018年 &nbsp; 月 &nbsp; 日</div></td>

                            </tr>

                        </table>

                        <table border="1" cellspacing="0" cellpadding="0">

                            <tr class="row_2">
                                <td rowspan="1" style="width:1114px;height:225px" class="col_2"><div style="height: 75%; width: 100%;text-align: left;padding: 10px;">分管领导签名（部门/公司负责人）：</div><div style="height: 25%; width: 100%;text-align: right;padding-right:20px">2018年 &nbsp; 月 &nbsp; 日</div></td>
                            </tr>

                        </table>

                    </div>
                </div>
           </div>
        </el-main>
    </el-container>
</template>

<script>
import * as API from '@/api/StatisticsPage'

export default {
  data() {
    return {
      time: '',
      Data: {},
      MonthScoreRes: {}, //

      MonthWorkRes: {}, // 工作成果考核
      MonthWorkResLength: 0,

      MonthWorkMiss: {}, // 月失误
      MonthWorkMissLength: 0,

      MonthWorkLoss: {}, // 月损失
      MonthWorkLossLength: 0,

      MonthOutputItem: {}, // 月产值
      MonthOutputItemLength: 0
    }
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      const id = this.$route.query.ProfileId
      const dt = this.$route.query.dt
      API.GetMonthTotalTable(id, dt).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.Data = res.data.Data
          this.MonthScoreRes = res.data.Data.MonthScoreRes
          this.MonthOutputItem = res.data.Data.MonthOutputItem.MonthOutput
          this.MonthOutputItemLength = res.data.Data.MonthOutputItem.MonthOutput.Recoreds.length
          this.MonthWorkRes = res.data.Data.JobResItem.MonthWorkRes
          this.MonthWorkResLength = res.data.Data.JobResItem.MonthWorkRes.Recoreds.length
          this.MonthWorkMiss = res.data.Data.JobResItem.MonthWorkMiss// 月失误
          this.MonthWorkMissLength = res.data.Data.JobResItem.MonthWorkMiss.Recoreds.length
          this.MonthWorkLoss = res.data.Data.JobResItem.MonthWorkLoss// 月损失
          this.MonthWorkLossLength = res.data.Data.JobResItem.MonthWorkLoss.Recoreds.length
        }
      })
    },
    toPrint() {
      var mywindow = window.open('', 'mydiv', 'height=800,width=1300')
      mywindow.document.write('<html><head><title>mydiv</title>')
      mywindow.document.write('<style>table {text-align: center;border-collapse: collapse;border: 0px solid #000;border-width: 1px;}</style>')
      mywindow.document.write('</head><body><div>')
      mywindow.document.write(document.getElementById('mydiv').innerHTML)
      mywindow.document.write('</div></body></html>')

      mywindow.print()
      //  mywindow.close();

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.temlateMain {
  height: 100%;
  .el-header {
    .tab_btn {
      padding: 0 10px;
      display: inline-block;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
    }
    .tab_btn.active {
      border-bottom: 2px solid #f99740;
    }
    .header-right {
      float: right;
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main {
    height: 100%;
    padding: 0;
  }
}
.headerdate {
    float: right;
}
.title {
  line-height: 76px;
  padding-left: 15px;
  span:first-child {
    font-size: 18px;
    color: #8a8a8a;
  }
}
.navTitle {
            height: 60px;
            border-bottom: 1px solid #ccc;
            font-size: 18px;
            padding: 0 20px;
        }

            .navTitle a {
                color: #333;
                font-weight: bold;
                line-height: 60px;
                text-decoration: none;
            }

        #StatisticsPage_forMonth {
            background: #fff;
            line-height: 60px;
        }

            #StatisticsPage_forMonth .getMonth {
                float: right;
                font-size: 18px;
            }

        .BoxContent_time {
            height: 76px;
            font-size: 16px;
            line-height: 76px;
            color: #333;
            padding-left: 20px;
        }

            .BoxContent_time span {
                color: #8a8a8a;
            }

            .BoxContent_time b {
                color: #333;
                margin-right: 72px;
                font-weight: normal;
            }

        .BoxContent {
            width: 100%;
        }

        .el-table tr {
            line-height: 0;
        }

        .el-table .cell {
            line-height: 36px;
            text-align: center;
            white-space: nowrap;
        }

        .el-table th {
            background: #f8f8f8;
            border-bottom: none;
        }

        .el-pagination {
            position: absolute;
            bottom: 10px;
            right: 100px;
            padding: 0;
        }

        .el-pagination__total {
            float: right;
            background: #f99740;
            margin: 0;
            color: #fff;
            padding: 0 5px;
        }

        .el-select {
            line-height: 40px;
            float: right;
            margin: 20px;
        }

        .toPrint {
            float: right;
            margin: 6px 0;
        }

        .table {
            width: 1132px;
            margin: 50px auto;
        }

            .table table {
                border-collapse: collapse;
                border: 0px solid #fff;
                border-width: 2px;

            }

            .table tr td {
                text-align: center;
                padding: 1px;
            }

                .table tr td b {
                    font-size: 18px;
                }

                .table tr td.col_1 {
                    font-size: 18px;
                    line-height: 30px;
                    background: #f5f5f5;
                }

                .table tr td.col_2 {
                    font-size: 18px;
                    line-height: 40px;
                    background: #fafafa;
                }

                .table tr td.col_3 {
                    background: #f9B640;
                    color: #fff;
                    font-size: 18px;
                    line-height: 30px;
                }

                    .table tr td .col_3 > b {
                        margin-top: 20px;
                        display: inline-block;
                    }

        .row_1 .col_1, .row_1 .col_2 {
            height: 44px;
            line-height: 44px;
        }

        .table_two{
            margin-top: 5px;
        }

        .table_three{
            margin-top: 10px;
        }
        .theDeclare{
            padding-bottom:20px;
        }
        .theDeclare > p {
            font-size: 14px;
            line-height: 25px;
        }

</style>
