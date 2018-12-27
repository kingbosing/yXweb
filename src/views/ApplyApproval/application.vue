<template>
     <el-container class="temlateMain apply" id="report"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <span :class="{tab_btn:true}" >申请凭证</span>

             <div class="header-right">
                <b class="replace right" v-on:click="replace()"></b>
                <div class="tools_search">
                    <el-input
                    placeholder="请输入申请人/编号"

                    v-model="input"
                    @keyup.enter.native="searchFor">
                     <b slot="append" class="el-icon-search" @click="searchFor"></b>
                    </el-input>
                </div>
               <el-button type="warning" size="small" @click="toDownload">导 出</el-button>
            </div>
        </el-header>
        <el-main class='content'>
             <el-container class="applyContent ">
                <el-main>
                    <el-scrollbar class="onlyY">
                            <div v-show="totalCount>0&&listType==0" class="apl_content_list">
                                <el-row style="background: #f8f8f8;">
                                    <el-col :span="4"><div class="grid-content bg-purple">类型</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">申请人</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">编号</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">通过时间</div></el-col>
                                    <!-- <div :span="4"><div class="grid-content bg-purple-light">状态</div></div> -->
                                    <el-col :span="8"><div class="grid-content bg-purple abstract">摘要</div></el-col>
                                </el-row>
                                <el-row class="col" v-for="(k,v) in listData" :key="v">
                                    <div v-on:click="toContent(k.ApplyId)">
                                        <el-col :span="4"><div class="grid-content bg-purple"><b class='type_icon' v-bind:class="k.ApprovalTypeName|setClass"></b>{{k.ApprovalTypeName}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple">{{k.CreaterName}}</div></el-col>

                                        <el-col :span="4"><div class="grid-content bg-purple">{{k.SerialNumber}}</div></el-col>
                                        <el-col :span="4"><div class="grid-content bg-purple ">{{k.PassingTime}}</div></el-col>
                                        <el-col :span="8"><div class="grid-content bg-purple">{{k.ApplyContent|toTrunString}}</div></el-col>
                                    </div>
                                </el-row>
                            </div>

                            <div v-show="totalCount>0&&listType==1" class="apl_content_box" >
                               <div class="apl_col box-card" v-for="(k,v) in listData"  v-on:click="toContent(k.ApplyId)"  :key="v">
                                   <div class="title">
                                        <b class="icon" v-bind:class="k.ApprovalTypeName|setClass"></b>{{k.ApprovalTypeName}}
                                    </div>
                                    <div class="main">
                                        <p>申请人：{{k.CreaterName}}</p>
                                        <p>编号：{{k.SerialNumber}}</p>
                                        <div v-html="showList(k.ApplyContent)"></div>
                                        <p>通过时间：{{k.PassingTime}}</p>
                                    </div>

                               </div>

                            </div>
                            <empty-icon v-if="totalCount==0" title="暂无数据！" :size="250" :top='150'></empty-icon>

                    </el-scrollbar>
                </el-main>
                <el-footer  height="60px">
                     <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[25,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalCount">
                    </el-pagination>
                </el-footer>
            </el-container>
        </el-main>

     </el-container>
</template>

<script>

import { myExcute, set_myListType } from '@/api/applyapproval'
import { getToken } from '@/utils/auth'
import './components/ApplyApproval_vue.js'
import { globalvariable } from '@/utils/globalvariable'
import emptyIcon from '../../components/emptyIcon'

export default {
  components: { emptyIcon },
  data() {
    return {
      applyAct: 1,
      fullscreenLoading: false,
      getDateMou: '',
      showDetail: false, // 明细
      showItems: false, // 选择流量项目
      input: '', // 搜索内容
      listData: '', // 列表数据
      listType: 1, // 列表or块

      index: 1,
      size: 25,
      totalCount: 0
    }
  },
  watch: {
    applyAct() {
      this.input = ''
      getRecordV1(this, this.index, this.size, this.input)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getRecordV1(this, this.index, this.size, this.input)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 5]
        } else {
          return [0, 0]
        }
      }
    },
    getNavigation() {
      return this.$store.state.financeReport.navigation
    },
    setData(data) {
      if (data.length) {
        var newList = []
        data.forEach(function(v, i) {
          newList.push(v)
          newList.push(v)
        })
        return newList
      }
    },
    searchFor() {
      getRecordV1(this, this.index, this.size, this.input)
    },
    replace() {
      var newStats = this.listType ? '0' : '1'

      set_myListType(getToken(), newStats, 3).then((res) => {
        const data = res.data
        // console.log(data)
        if (data.Successful) {
          this.listType = !this.listType
        }
      })
    },

    handleSizeChange(val) {
      this.size = val
      getRecordV1(this, this.index, this.size, this.input)
    },
    handleCurrentChange(val) {
      this.index = val
      getRecordV1(this, this.index, this.size, this.input)
    },
    toContent: function(data) {
    //   console.log(data)
      this.$router.push({ path: '/ApplyApproval/ApplicationContent', query: { ApplyID: data }})
    },
    setClass(data) {
      if (data == '合同') {
        return 'type_icon_ConTract'
      } else if (data == '请假') {
        return 'type_icon_Leave'
      } else if (data == '报销') {
        return 'type_icon_ReimBursed'
      } else if (data == '物品领用') {
        return 'type_icon_MaterialRequisition'
      } else if (data == '通用审批' || data == '通用') {
        return 'type_icon_General'
      } else if (data == '外出') {
        return 'type_icon_Out'
      } else if (data == '出差') {
        return 'type_icon_BusinessTrip'
      } else if (data == '加班') {
        return 'type_icon_Overtime'
      } else if (data == '补卡') {
        return 'type_icon_reissue'
      } else if (data == '采购') {
        return 'type_icon_Buyer'
      } else if (data == '付款') {
        return 'type_icon_payment'
      } else if (data == '开票') {
        return 'type_icon_billing'
      } else if (data == '人员需求') {
        return 'type_icon_personnelRequirement'
      } else if (data == '员工转正') {
        return 'type_icon_regularization'
      } else if (data == '员工离职') {
        return 'type_icon_leaveOffice'
      } else if (data == '领料') {
        return 'type_icon_Picking'
      }
    },
    toDownload() {
      window.open(globalvariable().apiurl + 'api/Apply/export_apply?Token=' + getToken() + ' &type=' + 5 + '&searchText=' + (this.input || ''))
    }
  }
}

var getRecordV1 = (app, index, size, search) => {
  app.listData = ''
  app.fullscreenLoading = true

  myExcute(getToken(), app.index, app.size, search).then((res) => {
    const data = res.data.Data
    // console.log(data)

    app.fullscreenLoading = false
    app.listData = data.Records
    app.totalCount = data.TotalCount
    app.listType = data.ShowType
  })
}
</script>

<style lang="scss" scoped>
.temlateMain {
  .el-container,
  .el-main {
    height: 100%;
  }
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
      .replace{
          background: url(/images/applyAndapproval_icon.png) -145px -305px;
        float: left;
        height: 30px;
        width: 30px;
        display: block;
        margin-top: 10px;
        margin-right: 20px;
        cursor: pointer;

      }
      .tools_search{
        float: left;
        margin-right: 20px;
      }
    }
  }
  .el-main {
    padding: 0;
    .el-header {
      border-bottom: none;
      // padding: 0;
      height: 70px;
      line-height: 70px;
      .getDate {
        padding: 0;
        margin: 0;
      }
    }
    .tableMain {
      height: 100%;
      padding:0 20px;
    }
  }
}
.el-dialog__body{
  padding: 30px 20px 0;
}

.grid-content {
    height: 60px;
    line-height: 60px;
    padding: 0 0 0 24px;
}
.col {
    border-bottom: 1px solid #dedede;
    cursor: pointer;
}

.color-yello {
    color: #f99740;
}
.color-green {
    color: #42Da93;
}
.color-red {
    color: red;
}

.type_icon {
    height: 24px;
    width: 22px;
    /*background: #ccc;*/
    display: inline-block;
    float: left;
    margin-top: 20px;
    margin-right: 10px;
}

.apl_content_list .type_icon_Leave {
    background: url(/images/applyList_icon.png)0 0 no-repeat;
}

.apl_content_list .type_icon_ReimBursed {
    background: url(/images/applyList_icon.png)-24px 0 no-repeat;
}

.apl_content_list .type_icon_MaterialRequisition {
    background: url(/images/applyList_icon.png)-48px 0 no-repeat;
}

.apl_content_list .type_icon_ConTract {
    background: url(/images/applyList_icon.png)-72px 0 no-repeat;
}

.apl_content_list .type_icon_General {
    background: url(/images/applyList_icon.png)-96px 0 no-repeat;
}

.apl_content_list .type_icon_Out {
    background: url(/images/applyList_icon.png)-120px 0 no-repeat;
}

.apl_content_list .type_icon_BusinessTrip {
    background: url(/images/applyList_icon.png)-144px 0 no-repeat;
}

.apl_content_list .type_icon_Overtime {
    background: url(/images/applyList_icon.png)-168px 0 no-repeat;
}

.apl_content_list .type_icon_reissue {
    background: url(/images/applyList_icon.png)-192px 0 no-repeat;
}

.apl_content_list .type_icon_Buyer {
    background: url(/images/applyList_icon.png)-216px 0 no-repeat;
}

.apl_content_list .type_icon_payment {
    background: url(/images/applyList_icon.png)-240px 0 no-repeat;
}

.apl_content_list .type_icon_billing {
    background: url(/images/applyList_icon.png)-264px 0 no-repeat;
}

.apl_content_list .type_icon_personnelRequirement {
    background: url(/images/applyList_icon.png)-288px 0 no-repeat;
}

.apl_content_list .type_icon_regularization {
    background: url(/images/applyList_icon.png)-312px 0 no-repeat;
}

.apl_content_list .type_icon_leaveOffice {
    background: url(/images/applyList_icon.png)-336px 0 no-repeat;
}

.apl_content_list .type_icon_Picking {
    background: url(/images/applyList_icon.png)-360px 0 no-repeat;
}
.apl_content_list {
    overflow:hidden;
}
.apl_content_list .el-row:nth-child(1) .el-col {
    background: #f8f8f8;
    z-index: 99;
}
.apl_content_list .el-row:nth-child(1) {
    position: absolute;
    background: #fff;
    width: 100%;
    z-index: 999;
}
.apl_content_list .el-row:nth-child(2) {
    margin-top:60px;
}
.apl_content_list .abstract {
        padding-left: 30px;
    }
.numberless {
    height: 550px;
    width: 430px;
    margin: 90px auto 0;
}

.numberless > p {
    font-size: 24px;
    margin-top: 20px;
    color: #b6b6b6;
    margin-left: 128px;
}

.grid-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.apl_content_box {
    padding: 20px 30px 0;
}

.apl_col {
    height: 270px;
    width: 360px;
    border-radius: 4px;
    border: 1px solid #dedede;
    float: left;
    margin: 20px;
    padding: 0 24px;
    font-size: 16px;
    cursor: pointer;
}

.apl_col:hover {
    /*background: #efefef;
                box-shadow: 4px 4px #dedede;*/
}

.apl_col .title {
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
    font-size: 18px;
}

.apl_col .title .type {
    float: right;
    font-size: 16px;
}

.apl_col .title .icon {
    height: 43px;
    width: 43px;
    display: inline-block;
    float: left;
    margin-right: 10px;
    /*background:  url(/images/applyList_codeIcon.png)0 0 no-repeat;*/
}

.apl_content_box .type_icon_Leave {
    background: url(/images/applyList_codeIcon.png)0 0 no-repeat;
}

.apl_content_box .type_icon_ReimBursed {
    background: url(/images/applyList_codeIcon.png)-45px 0 no-repeat;
}

.apl_content_box .type_icon_MaterialRequisition {
    background: url(/images/applyList_codeIcon.png)-90px 0 no-repeat;
}

.apl_content_box .type_icon_ConTract {
    background: url(/images/applyList_codeIcon.png)-135px 0 no-repeat;
}

.apl_content_box .type_icon_General {
    background: url(/images/applyList_codeIcon.png)-183px 0 no-repeat;
}

.apl_content_box .type_icon_Out {
    background: url(/images/applyList_codeIcon.png)-225px 0 no-repeat;
}

.apl_content_box .type_icon_BusinessTrip {
    background: url(/images/applyList_codeIcon.png)-275px 0 no-repeat;
}

.apl_content_box .type_icon_Overtime {
    background: url(/images/applyList_codeIcon.png)-315px 0 no-repeat;
}

.apl_content_box .type_icon_reissue {
    background: url(/images/applyList_codeIcon.png)-369px 0 no-repeat;
}

        .apl_content_box .type_icon_Buyer {
            background: url(/images/applyList_codeIcon.png)-412px 0 no-repeat;
        }

        .apl_content_box .type_icon_payment {
            background: url(/images/applyList_codeIcon.png)-460px 0 no-repeat;
        }

        .apl_content_box .type_icon_billing {
            background: url(/images/applyList_codeIcon.png)-505px 0 no-repeat;
        }

        .apl_content_box .type_icon_personnelRequirement {
            background: url(/images/applyList_codeIcon.png)-550px 0 no-repeat;
        }

        .apl_content_box .type_icon_regularization {
            background: url(/images/applyList_codeIcon.png)-595px 0 no-repeat;
        }

        .apl_content_box .type_icon_leaveOffice {
            background: url(/images/applyList_codeIcon.png)-643px 0 no-repeat;
        }

        .apl_content_box .type_icon_Picking {
            background: url(/images/applyList_codeIcon.png)-675px 0 no-repeat;
        }
.apl_col .main {
    color: #333;
}

.apl_col .main p {
    margin: 6px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.file_col{
    height:50px;
    width:460px;
    margin:5px 0;
    position:relative;
}
.file_col .fileType{
    height:40px;
    width:40px;
    display:inline-block;
    float:left;
    margin-top:5px;

    font-size:38px;
}
.file_col .fileType .iconfont {
    font-size: 40px;
    position:absolute;
}
.file_col .fileName {
    position: absolute;
    top: 5px;
    left: 50px;
    color: #8a8a8a;
}
.file_col .size {
    margin:0;
    padding:0;
    position: absolute;
    top: 30px;
    left: 50px;
    color:#ccc;
}
.file_col .handle {
    height: 20px;
    width: 20px;
    display: inline-block;
    float: right;
    margin-top: 15px;

    cursor:pointer;
}
.file_col .toBig {
    background: url(/images/applyAndapproval_icon.png)0 -666px;
}
.file_col .toDownLoad {
    background: url(/images/applyAndapproval_icon.png)0 -560px;
}
.file_col .toBig:hover {
    background: url(/images/applyAndapproval_icon.png)0 -612px;
}

.file_col .toDownLoad:hover {
    background: url(/images/applyAndapproval_icon.png)0 -503px;
}

.color-8a{
    color:#8a8a8a;
}
.color-32 {
    color: #323232;
}

.el-button--primary:focus, .el-button--primary:hover {
    background: #f99740;
    border: none;
    color: #fff;
}
.btn-new {
    padding: 10px 19px;
}
.btn-sure {
    background: #f99740;
    border: none;
}
.btn-sure:hover {
    background: #f99740;
    border: none;
    color:#fff;
}
.actAudio {
    /*animation-name: runAudio;
    animation-duration: 1s;
    transition-timing-function: cubic-bezier(1,1,1,1);
    animation-iteration-count: infinite;*/

}
@keyframes runAudio {
    0%,100% {
        background-position-X: 0;
    }
    25% {
        background-position-X: -22px;
    }
    50% {
        background-position-X: -45px;
    }
    75% {
        background-position-X: -22px;
    }
}
</style>

