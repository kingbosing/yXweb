<template>
    <el-container class="temlateMain">
        <el-main>
          <div class="mainBox">
              <el-row>
                 <el-col :span="20">
                   <div class="grid-content grid_border">
                      <i></i>
                      <h3>第一步：完善公司组织架构</h3>
                      <p>完善组织架构让您的线上公司与线下公司完全匹配，更方便与管理。</p>
                   </div>
                 </el-col>
                 <el-col :span="4">
                   <el-button plain @click="jumpIndex(1)">立即完善</el-button>
                 </el-col>
              </el-row>
              <el-row>
                 <el-col :span="20">
                   <div class="grid-content grid_border">
                      <i></i>
                      <h3>第二步：添加员工</h3>
                      <p>让员工通过手机号注册小赢计划，您就可以通过搜索或者app的扫一扫，快速添加您的员工加入公司了。</p>
                   </div>
                 </el-col>
                 <el-col :span="4">
                   <el-button plain @click="jumpIndex(2)">立即完善</el-button>
                 </el-col>
              </el-row>
              <el-row>
                 <el-col :span="20">
                   <div class="grid-content grid_border">
                      <i></i>
                      <h3>第三步：配置管理员</h3>
                      <p>权限的逐级下方，添加更多的管理员来帮你管理公司吧。</p>
                   </div>
                 </el-col>
                 <el-col :span="4">
                   <el-button plain @click="jumpIndex(3)">立即完善</el-button>
                 </el-col>
              </el-row>
              <el-row>
                 <el-col :span="20">
                   <div class="grid-content grid_border">
                      <i></i>
                      <h3>第四步：分配员工权限</h3>
                      <p>在工作中，不同职能员工的工作内容及权限都是有限的，快来给员工设置吧。</p>
                   </div>
                 </el-col>
                 <el-col :span="4">
                   <el-button plain @click="jumpIndex(4)">立即完善</el-button>
                 </el-col>
              </el-row>
              <el-row>
                 <el-col :span="20">
                   <div class="grid-content grid_border">
                      <i></i>
                      <h3>第五步：管理审批类型</h3>
                      <p>我们暂时提供5种申请的类型，供您使用，您可对其启用、停用、自定义分类。</p>
                   </div>
                 </el-col>
                 <el-col :span="4">
                   <el-button plain @click="jumpIndex(5)">立即完善</el-button>
                 </el-col>
              </el-row>
              <el-row>
                 <el-col :span="20">
                   <div class="grid-content grid_border">
                      <i></i>
                      <h3>第六步：完善企业信息</h3>
                      <p>完善您的企业信息，多渠道分享给别人，让更多的人知晓您的公司。</p>
                   </div>
                 </el-col>
                 <el-col :span="4">
                   <el-button plain @click="jumpIndex(6)">立即完善</el-button>
                 </el-col>
              </el-row>
              <el-row>
                 <el-col :span="20">
                   <div class="grid-content">
                      <i></i>
                      <h3>第七步：管理会议室</h3>
                      <p>管理您公司的会议室，让您公司会议的管理更加有条理，会议文件、记录更方便保存、追溯。</p>
                   </div>
                 </el-col>
                 <el-col :span="4">
                   <el-button plain @click="jumpIndex(7)">立即完善</el-button>
                 </el-col>
              </el-row>
          </div>
        </el-main>
    </el-container>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {
  },
  watch: {

  },
  methods: {
    // 点击跳转页面
    jumpIndex(type) {
      if (type == 1) {
        this.$router.push({ path: '/manager/organizationalStructure' })
      } else if (type == 2) {
        this.$router.push({ path: '/PersonnelManagement/index' })
      } else if (type == 3) {
        this.$router.push({ path: '/manager/Administrator' })
      } else if (type == 4) {
        this.$router.push({ path: '/JurisdictionManage/DocumentJurisIndex' })
      } else if (type == 5) {
        this.$router.push({ path: '/manager/ApprovalCategoryManagement' })
      } else if (type == 6) {
        this.$router.push({ path: '/CompanyInformationManagement' })
      } else if (type == 7) {
        this.$router.push({ path: '/meeting/MeetingRoomManagement' })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
  .el-header {

    .header-right {
      float: right;
      .el-button.el-button--medium{
          float: left;
          margin: 7px 10px 0 0;
      }
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main{
      height: 100%;
      padding: 60px 30px 30px 30px;
      .mainBox{
          margin: 0 auto;
          padding: 0 10px;
          h3{
            margin-top:0;
            font-weight: normal;
            font-size: 18px;
            position: absolute;
            top:-3px;
          }
          p{
            color:#8a8a8a;
            margin-bottom: 30px;
            margin-top: 33px;
          }
          .el-button.el-button--default{
              float:right;
              margin-top: 15px;
          }
          .grid-content{
            padding-left:15px;
            height: 84px;
          }
          .grid_border{
                border-left:1px solid #dedede;
          }
          .el-row{
            position: relative;
          }
          i{
            display: inline-block;
            width:14px;
            height:14px;
            background: url("/images/yuanquan.png") no-repeat;
            position: absolute;
            float:left;
            left:-7px;
          }
      }
  }

}
</style>

