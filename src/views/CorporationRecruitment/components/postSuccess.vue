<template>
    <el-container  class="temlateMain" v-cloak   element-loading-spinner="loadIcon">
        <el-header height='50px'>
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/CorporationRecruitment/JobPostListting',query:{actId:''} }">发布职位</el-breadcrumb-item>
                <el-breadcrumb-item>发布成功</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <div class='postSuccess'>
            <div>

                <h5>恭喜您，职位发布成功！</h5>
                <p style="font-size:12px;color:#8a8a8a;text-align: center;">您可以进入职位发布查看最新职位状态。</p>
                <p>
                    <el-button size="small" @click="goList">返回列表</el-button>
                    <el-button size="small" @click="toPost" type="warning">继续发布</el-button>
                    <!-- <button type="button" class="btn-sm btnBrightcolor goOnPost" style="font-weight:normal;line-height:20px;font-size:12px;">继续发布</button> -->
                </p>
            </div>
        </div>
        </el-main>
    </el-container>

</template>

<script>
export default {
  methods: {
    goList() {
      this.$router.push({ path: '/CorporationRecruitment/JobPostListting' })
    },
    toPost() {
      this.$router.push({ path: '/CorporationRecruitment/toPost' })
    }

  }
}
</script>

<style lang="scss" scoped>
.temlateMain{
    .el-main{
        height: 100%;
        position: relative;
    }
    .postSuccess{
        height: 400px;
        width: 240px;
        background: url(/images/postsuccess.png)no-repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-position-x: 30px;
        >div{
            text-align: center;
            margin-top: 150px;
            h5{
                font-size: 14px;
            }
        }
    }
}
</style>

