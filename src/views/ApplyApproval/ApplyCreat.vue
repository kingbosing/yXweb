<template>
     <el-container class="temlateMain toApply" id="report"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <!-- <p>我的申请 > 新建申请</p> -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/ApplyApproval/apply' }">我的申请</el-breadcrumb-item>
                <el-breadcrumb-item>新建申请</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main class='content'>

            <el-scrollbar class="onlyY">
                <div v-for="(k,v) in listData" :key="v" class="cell">
                    <p class="title">{{k.Name}}({{k.Templates.length}})</p>
                    <div class="cell_content">
                        <div v-for="(j,v1) in k.Templates" :key="v1" class="Templates_cell" @click="toApply(j.Name,j.Id)">
                            <b class="tem_icon" :style="setPositionOrDec(j.Name,'PositionX')"></b>
                            <span class="name">{{j.Name}}</span><br/><span class="dec">{{setPositionOrDec(j.Name,'dec')}}</span>
                        </div>
                    </div>

                </div>
            </el-scrollbar>

        </el-main>

     </el-container>
</template>

<script>

import { gettype } from '@/api/applyapproval'
import { getToken } from '@/utils/auth'
import './components/ApplyApproval_vue.js'

import emptyIcon from '../../components/emptyIcon'
export default {
  components: { emptyIcon },
  data() {
    return {
      listData: [],
      fullscreenLoading: false
    }
  },
  watch: {

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getList(this)
    },
    toApply(name, id) {
      this.$router.push({ path: '/ApplyApproval/toApply', query: { name: name, id: id }})
    },
    setPositionOrDec(data, type) {
      let PositionX, dec

      if (data == '请假') {
        PositionX = { backgroundPositionX: 0 }
        dec = '适用于员工请假申请'
      } else if (data == '出差') {
        PositionX = { backgroundPositionX: '-277px' }
        dec = '适用于员工出差申请'
      } else if (data == '加班') {
        PositionX = { backgroundPositionX: '-320px' }
        dec = '适用于员工加班申请'
      } else if (data == '补卡') {
        PositionX = { backgroundPositionX: '-368px' }
        dec = '适用于员工考勤补卡'
      } else if (data == '外出') {
        PositionX = { backgroundPositionX: '-230px' }
        dec = '适用于员工外出申请'
      } else if (data == '报销') {
        PositionX = { backgroundPositionX: '-44px' }
        dec = '适用于各种报销申请'
      } else if (data == '付款') {
        PositionX = { backgroundPositionX: '-459px' }
        dec = '适用于付款申请'
      } else if (data == '开票') {
        PositionX = { backgroundPositionX: '-502px' }
        dec = '适用于报销发票申请'
      } else if (data == '合同') {
        PositionX = { backgroundPositionX: '-134px' }
        dec = '适用于通用合同'
      } else if (data == '人员需求') {
        PositionX = { backgroundPositionX: '-550px' }
        dec = '适用于企业招聘申请'
      } else if (data == '员工转正') {
        PositionX = { backgroundPositionX: '-598px' }
        dec = '适用于员工转正申请'
      } else if (data == '员工离职') {
        PositionX = { backgroundPositionX: '-642px' }
        dec = '适用于员工离职申请'
      } else if (data == '物品领用') {
        PositionX = { backgroundPositionX: '-90px' }
        dec = '适用于物品领用申请'
      } else if (data == '采购') {
        PositionX = { backgroundPositionX: '-412px' }
        dec = '适用于采购申请'
      } else if (data == '领料') {
        PositionX = { backgroundPositionX: '-685px' }
        dec = '适用于领料申请'
      } else if (data == '通用' || data == '通用审批') {
        PositionX = { backgroundPositionX: '-180px' }
        dec = '适用于通用审批申请'
      }

      if (type == 'PositionX') {
        return PositionX
      } else {
        return dec
      }
    }
  }
}

var getList = (app) => {
  app.listData = ''
  app.fullscreenLoading = true

  gettype(getToken()).then((res) => {
    const data = res.data.Data
    app.fullscreenLoading = false
    app.listData = data
  })
}
</script>

<style lang="scss" scoped>
.toApply{
    .content{
        overflow: hidden;
        height: 100%;
        padding: 0;

        .cell{
            overflow: hidden;
            padding: 20px 20px 0;
            .title{
                margin: 0;
                font-size: 16px;
                color: #333;
                margin-bottom: 10px;
            }
            .cell_content{
                overflow: hidden;
                .Templates_cell{
                    height: 100px;
                    width: 200px;
                    float: left;
                    border: 1px solid #dedede;
                    border-radius: 4px;
                    margin-right: 20px;
                    // margin-bottom: 20px;
                    padding: 25px 10px;
                    cursor: pointer;
                    .tem_icon{
                        height: 40px;
                        width: 44px;
                        display: block;
                        background: url(/images/newApply-40.png)no-repeat;
                        margin-right: 6px;
                        float: left;
                    }
                    .name{
                        color: #333;
                        font-size: 16px;
                        line-height: 20px;
                    }
                    .dec{
                        font-size: 14px;
                        color: #808080;
                        line-height: 20px;

                    }
                }
            }

        }
    }
}

</style>

