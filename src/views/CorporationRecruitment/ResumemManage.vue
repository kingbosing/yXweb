<template>
    <el-container  class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
            简历管理
        </el-header>
        <el-main>
            <el-container>
                <el-header height='50px'>
                    <router-link to="/CorporationRecruitment/ResumemManage/" exact>新投递</router-link>
                    <router-link to="/CorporationRecruitment/ResumemManage/interest">感兴趣</router-link>
                    <router-link to="/CorporationRecruitment/ResumemManage/interview">待面试</router-link>
                    <router-link to="/CorporationRecruitment/ResumemManage/hire">待录用</router-link>
                    <router-link to="/CorporationRecruitment/ResumemManage/induction">待入职</router-link>
                    <router-link to="/CorporationRecruitment/ResumemManage/library">简历库</router-link>
                </el-header>
                <el-main>
                     <router-view></router-view>
                </el-main>

            </el-container>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.temlateMain{
    .el-main,.el-container{
        padding: 0;
        height: 100%;
    }
    .el-container{
        .el-header{
            background: #f7f7f7;
            >a{
                font-size: 14px;
                padding: 3px 10px;
                color: #323232;
                cursor: pointer;
                font-weight: normal;
                &.hover{
                    color: #f99740;
                }
            }
            .router-link-active{
                background: #f99740;
                border-radius: 4px;
                color: #fff;
                 &.hover{
                    color: #fff;
                }
            }
        }
    }
}
</style>

