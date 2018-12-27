<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
        v-cloak>
        <el-header height="50px">

            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><span>增值服务</span></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-container>
                <el-main>
                    <el-row>
                        <el-col> <span class="title">套餐分类</span></el-col>
                        <el-col>
                            <el-card shadow="hover">
                                <el-row>
                                    <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="2">
                                        <img src="../../assets/Recruitment/icon_list_car.png">
                                    </el-col>
                                    <el-col :xs="14" :sm="14" :md="14" :lg="18" :xl="20">
                                        <el-row class="content_box">
                                            <el-col>
                                                <h4>专业版</h4>
                                            </el-col>
                                            <el-col>
                                                <span>包含内容：求职沟通200份/发布职位200个/简历下载200份/简历查看200发/线上沟通400人</span>
                                            </el-col>
                                            <el-col>
                                                <span class="tips">有效期：3个月</span> <span class="icon">/</span><span
                                                    class="tips">有效期：3个月</span>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="2">
                                        <el-row class="price_box">
                                            <el-col>
                                                <span class="price">￥60.00</span>
                                            </el-col>
                                            <el-col>
                                                <el-button type="warning">购买</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col> <span class="title smalltitle">商品分类</span></el-col>
                        <el-col>
                            <el-card shadow="hover">
                                <el-row>
                                    <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="2">
                                        <img src="../../assets/Recruitment/icon_list_car.png">
                                    </el-col>
                                    <el-col :xs="14" :sm="14" :md="14" :lg="18" :xl="20">
                                        <el-row class="content_box">
                                            <el-col>
                                                <h4>专业版</h4>
                                            </el-col>
                                            <el-col>
                                                <span>包含内容：求职沟通200份/发布职位200个/简历下载200份/简历查看200发/线上沟通400人</span>
                                            </el-col>
                                            <el-col>
                                                <span class="tips">有效期：3个月</span> <span class="icon">/</span><span
                                                    class="tips">有效期：3个月</span>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="2">
                                        <el-row class="price_box">
                                            <el-col>
                                                <span class="price">￥60.00</span>
                                            </el-col>
                                            <el-col>
                                                <el-button type="warning" @click="ToProductpurchase">购买</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
                <el-aside style="dispaly:block">
                    <el-row class="com_card">
                        <el-col>
                            <h3>杭州奇迹科技有限公司</h3>
                        </el-col>
                        <el-col>
                            <span>版本：专业版</span> <span class="Renewbtn" @click="ToRePay">续费</span>
                        </el-col>
                        <el-col>
                            <span>版本剩余时间：125天</span>
                        </el-col>
                        <el-col>
                            <span class="Orderbtn" @click="ToOrderList">订单列表</span>
                        </el-col>
                    </el-row>
                    <el-row class="sev_card">
                        <el-col>
                            <el-row>
                                <el-col>
                                    <span class="sev_title">版本剩余（至9月12日）</span>
                                </el-col>
                                <el-col>
                                    <span>求职者待沟通：125个</span>
                                </el-col>
                                <el-col>
                                    <span>发布职位：125天</span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-aside>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
import * as CorporationRecruitment from '@/api/CorporationRecruitment'
export default {
  data() {
    return {
      fullscreenLoading: false
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    // 获取详情
    getDetails() {
      const that = this
      CorporationRecruitment.getmeallist().then(res => {
        console.log(res.data)
        /* if (res.data.Successful) {
          // that.GetJobWorkTypeslistData = res.data.Data

        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
          that.fullscreenLoading = false
        }*/
      })
    },
    ToRePay() {
      this.$router.push({ path: '/CorporationRecruitment/VersionPay' })
    },
    ToOrderList() {
      this.$router.push({ path: '/CorporationRecruitment/RePayOrderList' })
    },
    ToProductpurchase() {
      this.$router.push({ path: '/CorporationRecruitment/Productpurchase' })
    }
  }
}
</script>
<style lang="scss" scoped>
    .el-container {
        .el-main {
            padding: 24px;
            .el-container {
                .el-aside {
                    font-size: 1.14em;
                    background: #f8f8f8;
                    padding: 1.5em;

                    .com_card {
                        border-bottom: 1px solid #e6e6e6;
                        padding: 0.8em;

                        .el-col {
                            margin-bottom: 1.3em;

                            h3 {
                                margin-block-start: 0;
                                margin-block-end: 0;
                            }

                            span {
                                color: #8a8a8a;

                                &.Renewbtn {
                                    color: #f99740;
                                    margin-left: 1.3em;
                                    cursor: pointer;
                                }

                                &.Orderbtn {
                                    color: #f99740;
                                    font-weight: 600;
                                    cursor: pointer;
                                }
                            }
                        }
                    }

                    .sev_card {
                        padding: 0.8em;

                        .el-col {
                            margin: 20px 0;

                            .el-row {
                                .el-col {
                                    margin: 10px 0;

                                    .sev_title {
                                        color: #8a8a8a;
                                    }
                                }
                            }
                        }
                    }
                }

                .el-main {
                    padding: 0;

                    .el-row {
                        .el-col {
                            .title {
                                display: block;
                                padding-bottom: 30px;
                                color: #8a8a8a;
                                font-size: 1.1em;

                                &.smalltitle {
                                    margin-top: 20px;
                                }
                            }

                            .el-card {
                                    margin-bottom: 30px;
                                    margin-right: 24px;

                                .el-card__body {
                                    padding: 1em;

                                    .el-row {
                                        .el-col {
                                            img {
                                                margin: 1em 2em;
                                            }

                                            .content_box {
                                                .el-col {
                                                    h4 {
                                                        margin-block-end: 1em;
                                                        margin-block-start: 1em;
                                                    }

                                                    span {
                                                        color: #8a8a8a;
                                                        margin-bottom: 1em;
                                                        display: block;

                                                        &.tips {
                                                            width: 8em;
                                                            float: left;

                                                        }

                                                        &.icon {
                                                            width: 1.5em;
                                                            float: left;

                                                        }
                                                    }
                                                }
                                            }

                                            .price_box {
                                                .price {
                                                    display: block;
                                                    margin: 1.5em 1em;
                                                    font-size: 1.2em;
                                                    color: #f99740;
                                                    font-weight: 600;
                                                    letter-spacing: 2px;
                                                }

                                                .el-button {
                                                    margin: 0 auto;
                                                    display: block;
                                                    padding: 7px 30px;
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }

    }
</style>
