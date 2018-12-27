<template>
    <el-container  class="temlateMain" v-cloak v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/CorporationRecruitment/RecruitmEntenterprise',query:{actId:'3'} }">信息登记表</el-breadcrumb-item>
                <el-breadcrumb-item>阅览</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
           <div class="main">
                <div class="mainContent" v-if="list.IsSend">
                    <div id="ApplyJob" class="sCell" v-if="list.IsApplyJob">
                        <span class="td-title" style="width:96px;">应聘岗位：</span>
                        <span style="width:194px;">产品经理</span>
                    </div>
                    <div id="ApplyDate" class="sCell" v-if="list.IsApplyDate">
                        <span class="td-title" style="width:100px;">应聘日期：</span>
                        <span style="width:200px;">2017-7-3</span>
                    </div>

                    <div id="BaseInfo" v-if="list.IsBaseInfo">
                        <div class="DivTitle">
                            <div class="divLeft">基本信息</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <table>
                            <tr>
                                <td class="td-title" style="width:100px;">姓名</td>
                                <td style="width:200px;">小胖纸</td>
                                <td class="td-title" style="width:100px;">手机</td>
                                <td style="width:200px;">12345678901</td>
                                <td class="td-title" style="width:100px;">邮箱</td>
                                <td style="width:200px;">1212131445@qq.com</td>
                            </tr>
                            <tr>
                                <td class="td-title">性别</td>
                                <td>女</td>
                                <td class="td-title">出生日期</td>
                                <td>2000-6-19</td>
                                <td class="td-title">政治面貌</td>
                                <td>党员</td>
                            </tr>
                            <tr>
                                <td class="td-title">年龄</td>
                                <td>24</td>
                                <td class="td-title">民族</td>
                                <td>汉</td>
                                <td class="td-title">体重</td>
                                <td>50kg</td>
                            </tr>
                            <tr>
                                <td class="td-title">籍贯</td>
                                <td>温州</td>
                                <td class="td-title">婚姻状况</td>
                                <td>已婚</td>
                                <td class="td-title">学历</td>
                                <td>本科</td>
                            </tr>
                            <tr>
                                <td class="td-title">工作经验</td>
                                <td>2年</td>
                                <td class="td-title"></td>
                                <td></td>
                                <td class="td-title"></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="td-title">户口所在地</td>
                                <td colspan="5"><span style="width:785px;">浙江省温州市鹿城区车站大道东游大厦2501室</span></td>
                            </tr>
                            <tr>
                                <td class="td-title">有无疾病史</td>
                                <td colspan="5">无</td>
                            </tr>
                            <tr>
                                <td class="td-title">联系地址</td>
                                <td colspan="5">浙江省温州市鹿城区车站大道东游大厦2501室</td>
                            </tr>
                            <tr>
                                <td class="td-title">身份证号</td>
                                <td colspan="5">331021199209273043</td>
                            </tr>
                            <tr>
                                <td class="td-title">技能证书</td>
                                <td colspan="5">无</td>
                            </tr>
                            <tr>
                                <td class="td-title">职称类别</td>
                                <td colspan="5">无</td>
                            </tr>
                        </table>
                    </div>
                    <div id="Education" v-if="list.IsEducation">
                        <div class="DivTitle">
                            <div class="divLeft">教育经历</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <table>
                            <tr>
                                <td class="td-title" style="width:180px;">起止日期</td>
                                <td class="td-title" style="width:180px;">学校名称</td>
                                <td class="td-title" style="width:180px;">专业</td>
                                <td class="td-title" style="width:180px;">全日制/自考</td>
                                <td class="td-title" style="width:180px;">获得证书</td>
                            </tr>
                            <tr>
                                <td>2016/09-2017/09</td>
                                <td>浙江理工大学</td>
                                <td>通信管理工程</td>
                                <td>全日制</td>
                                <td>学位证</td>
                            </tr>
                            <tr>
                                <td>2016/09-2017/09</td>
                                <td>浙江理工大学</td>
                                <td>通信管理工程</td>
                                <td>全日制</td>
                                <td>学位证</td>
                            </tr>
                        </table>
                    </div>
                    <div id="Train"  v-if="list.IsTrain">
                        <div class="DivTitle">
                            <div class="divLeft">培训经历</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <table>
                            <tr>
                                <td class="td-title" style="width:180px;">起止日期</td>
                                <td class="td-title" style="width:180px;">培训机构</td>
                                <td class="td-title" style="width:270px;">培训内容</td>
                                <td class="td-title" style="width:270px;">文件证明</td>
                            </tr>
                            <tr>
                                <td>2016/09-2017/09</td>
                                <td>达内</td>
                                <td>产品专员</td>
                                <td>无</td>
                            </tr>
                            <tr>
                                <td>2016/09-2017/09</td>
                                <td>达内</td>
                                <td>产品专员</td>
                                <td>无</td>
                            </tr>
                        </table>
                    </div>
                    <div id="Works" v-if="list.IsWorks">
                        <div class="DivTitle">
                            <div class="divLeft">最近三份工作</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <table>
                            <tr>
                                <td class="td-title" style="width:180px;">起止日期</td>
                                <td class="td-title" style="width:180px;">企业名称</td>
                                <td class="td-title" style="width:180px;">职位</td>
                                <td class="td-title" style="width:180px;">离职原因</td>
                                <td class="td-title" style="width:180px;">直系上司联系方式</td>
                            </tr>
                            <tr>
                                <td>2016/09-2017/09</td>
                                <td>达内</td>
                                <td>产品专员</td>
                                <td>薪资要求不符</td>
                                <td>无</td>
                            </tr>
                            <tr>
                                <td>2016/09-2017/09</td>
                                <td>达内</td>
                                <td>产品专员</td>
                                <td>薪资要求不符</td>
                                <td>无</td>
                            </tr>
                        </table>
                    </div>
                    <div id="Family" v-if="list.IsFamily">
                        <div class="DivTitle">
                            <div class="divLeft">家庭成员</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <table>
                            <tr>
                                <td class="td-title" style="width:135px;">与本人关系</td>
                                <td class="td-title" style="width:135px;">姓名</td>
                                <td class="td-title" style="width:135px;">年龄</td>
                                <td class="td-title" style="width:180px;">工作单位</td>
                                <td class="td-title" style="width:180px;">职位</td>
                                <td class="td-title" style="width:135px;">联系方式</td>
                            </tr>
                            <tr>
                                <td>父子</td>
                                <td>齐吉吉</td>
                                <td>48</td>
                                <td>自营</td>
                                <td>老板</td>
                                <td>13888888888</td>
                            </tr>
                            <tr>
                                <td>父子</td>
                                <td>齐吉吉</td>
                                <td>48</td>
                                <td>自营</td>
                                <td>老板</td>
                                <td>13888888888</td>
                            </tr>
                        </table>
                    </div>
                    <div id="GeneralInfo" v-if="list.IsGeneralInfo">
                        <div class="DivTitle">
                            <div class="divLeft">综合信息</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <table>
                            <tr>
                                <td class="td-title">档案所在地</td>
                                <td colspan="5"><span style="width:785px;">浙江省温州市鹿城区车站大道东游大厦2501室</span></td>
                            </tr>
                            <tr>
                                <td class="td-title" style="width:100px;">档案管理形式</td>
                                <td style="width:200px;">委托代理机构管理</td>
                                <td class="td-title" style="width:130px;">是否缴纳社保</td>
                                <td style="width:170px;">是</td>
                                <td class="td-title" style="width:130px;">社保缴纳形式</td>
                                <td style="width:170px;">在原单位管理</td>
                            </tr>
                            <tr>
                                <td class="td-title">目前状态</td>
                                <td>离职状态</td>
                                <td class="td-title">预期到岗时间</td>
                                <td>2000-6-19</td>
                                <td class="td-title">期望工资</td>
                                <td>9k</td>
                            </tr>
                            <tr>
                                <td class="td-title">原岗位工资</td>
                                <td>7k</td>
                                <td class="td-title">是否接受岗位调剂</td>
                                <td>是</td>
                                <td class="td-title">在本公司有无熟人</td>
                                <td>有</td>
                            </tr>
                            <tr>
                                <td class="td-title">员工姓名</td>
                                <td>小岳岳</td>
                                <td class="td-title">与本人关系</td>
                                <td>姐弟</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div id="Planning" v-if="list.IsPlanning">
                        <div class="DivTitle">
                            <div class="divLeft">职业规划</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <p class="color-8a">浙江省温州市鹿城区车站大道东游大厦25i1室浙江省温州市鹿城区车站大道东游大厦25i1室浙江省温州市鹿城区车站大道东游大厦25i1室浙江省温州市鹿城区车站大道东游大厦25i1室浙江省温州市鹿城区车站大道东游大厦25i1室</p>
                    </div>
                        <div id="Planning" v-for="(k,v) in list.Customs" :key="v" v-if="k.IsSelect">
                        <div class="DivTitle">
                            <div class="divLeft">{{k.Title}}</div>
                            <div class="divRight"><hr /></div>
                        </div>
                        <p class="color-8a">浙江省温州市鹿城区车站大道东游大厦25i1室</p>
                    </div>
                </div>
                <div class="mainContent noList" v-else></div>

            </div>
        </el-main>
    </el-container>

</template>

<script>
import { get_rsinfo } from '@/api/recruitment'

export default {
  data() {
    return {
      fullscreenLoading: false,
      list: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getRsinfo(this)
    }
  }
}

const getRsinfo = (app) => {
  app.fullscreenLoading = true
  get_rsinfo().then(c => {
    // console.log(c)
    app.fullscreenLoading = false

    app.list = c.data.Data
    // app.IsSend = c.data.Data.IsSend
  })
}
</script>

<style lang="scss" scoped>
.temlateMain{
        height: 100%;
        .el-main{
            height: 100%;
        }
    .main{
        height: 100%;
        width: 960px;
        margin:0 auto;
        .mainContent{
            padding:20px 0 40px;
            &.noList{
                height: 100%;
                background: url(/images/registryForm-previewNo-bg.png) no-repeat center;
            }
            .sCell{
                line-height: 40px;
                .td-title{
                    margin-right: 10px;
                    color: #8a8a8a;
                }
            }
            .DivTitle{
                margin: 10px 0;
                overflow: hidden;
                .divLeft{
                    width: 100px;
                    float: left;
                    // background-color: #fff;
                }
                .divRight{
                    width: 800px;
                    float: left;
                    hr{
                        border: 0;
                        border-top: 1px solid #eee;
                    }
                }
            }
            table{
                tr{
                    height: 36px;
                    line-height: 36px;
                    color: #333;
                }
                .td-title {
                    color: #8a8a8a;
                }
            }
        }
    }
}
</style>

