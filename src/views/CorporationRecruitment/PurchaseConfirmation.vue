<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
        v-cloak>
        <el-header height="50px">

            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><span @click="backTo">增值服务</span></el-breadcrumb-item>
                <el-breadcrumb-item><span>商品购买</span></el-breadcrumb-item>
                <el-breadcrumb-item><span>确认订单</span></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column width="220px">
                    <template slot-scope="scope">
                        <img src="../../assets/Recruitment/icon_list_money.png">
                    </template>
                </el-table-column>
                <el-table-column label="商品信息" width="580px">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col>
                                <h4>{{scope.row.name}}</h4>
                            </el-col>
                            <el-col>
                                <span class="goodsInfo">包含内容：求职沟通200份/发布职位200个/简历下载200份/简历查看200发/线上沟通400人</span>
                            </el-col>
                            <el-col>
                                <span class="goodsInfo">{{scope.row.province}}</span>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="province" label="单价" width="300px">
                </el-table-column>
                <el-table-column prop="province" label="数量" width="350px">
                </el-table-column>
                <el-table-column label="小计" width="350px">
                    <template slot-scope="scope">
                        <span class="color-yello">{{scope.row.city}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="bill_box">
                <el-col><span class="bill_content">下单时间：普通发票</span></el-col>
                <el-col><span class="bill_content">订单编号：个人</span></el-col>
                <el-col><span class="bill_content">发票内容：明细</span></el-col>
                <el-col><span class="bill_content">发票金额：￥600.00</span></el-col>
            </el-row>
            <el-row class="bill_box">
                <el-col>
                    <h4>发票信息:</h4>
                </el-col>

                <el-col><span class="bill_content">发票类型：普通发票</span></el-col>
                <el-col><span class="bill_content">发票抬头：个人</span></el-col>
                <el-col><span class="bill_content">纳税人识别号：34324234324234234234234</span></el-col>
                <el-col><span class="bill_content">发票内容：明细</span></el-col>
                <el-col><span class="bill_content">发票金额：￥600.00</span></el-col>
                <el-col><span class="bill_content">详细地址：撒大苏打卢萨卡到拉萨扩大撒赖了</span></el-col>
            </el-row>

            <el-row class="PayWay_box">
                <el-col><span class="payTitle">支付方式</span></el-col>
                <el-col>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox class="ABC" label="中国农业银行">
                            <span class="img"><span class="content">中国农业银行</span></span>
                        </el-checkbox>
                        <el-checkbox class="ICBC" label="中国工商银行">
                            <span class="img"><span class="content">中国工商银行</span></span>
                        </el-checkbox>
                        <el-checkbox class="CCB" label="中国建设银行">
                            <span class="img"><span class="content">中国建设银行</span></span>
                        </el-checkbox>
                        <el-checkbox class="PSBC" label="中国邮政储蓄银行">
                            <span class="img"><span class="content">中国邮政储蓄银行</span></span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox class="AliPay" label="支付宝">
                            <span class="img"><span class="content">支付宝</span></span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox class="WeChatPay" label="微信">
                            <span class="img"><span class="content">微信</span></span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>

            <el-row class="fin_price_box">
                <el-col :span="3" :offset="10">
                    <el-button type="warning">下单购买</el-button>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      labelposition: 'left',
      isAdd: false,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 2
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      checkList: ''
    }
  },
  methods: {
    backTo() {
      this.$router.push({
        path: '/CorporationRecruitment/Value-addedService'
      })
    },
    ToDetail(id) {
      this.$router.push({
        path: '/CorporationRecruitment/RePayOrderDetail'
      })
    },
    handleItemChange(val) {
    //   console.log('active item:', val)
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
          this.options2[0].cities = [{
            label: '南京'
          }]
        } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
          this.options2[1].cities = [{
            label: '杭州'
          }]
        }
      }, 300)
    }
  }
}
</script>
<style>
    .el-table th {
        background: #f8f8f8;
    }

    .addresstitle .el-form-item__label {
        font-weight: 600;
        color: #1a1a1a;

    }

    .billform .el-form-item .el-input__inner {
        height: 28px;
        line-height: 28px;
    }

    .billform .el-form-item__label {
        padding: 0 24px 0 0;
    }

    .billdialog .el-dialog {
        margin-top: 4vh !important;
    }

    .billdialog .el-dialog__body {
        max-height: 808px;
        overflow-y: scroll;
    }

    /* .color-f99740 {
        color: #f99740;
    } */
</style>

<style lang="scss" scoped>
    .el-container {
        .el-main {
            padding: 24px;

            .el-table {
                border: 1px solid #f8f8f8;

                .el-table th {
                    background: #f8f8f8;
                }

                tr {
                    td {
                        img {
                            margin-left: 3em;
                        }

                        .goodsInfo {
                            display: block;
                            word-break: break-word;
                            padding-bottom: 20px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            width: 30em;
                        }

                    }
                }
            }

            .bill_box {
                border-top: none;
                border: 1px solid #f8f8f8;
                padding: 20px;

                .el-checkbox {
                    margin-top: 14px;

                    &.is-checked {
                        color: #f99740;
                    }
                }

                .bill_content {
                    display: block;
                    padding: 10px 0;
                    color: #8a8a8a;
                }

                .bill_btn {
                    margin-top: 20px;
                    margin-left: 20px;
                    color: #f99740;
                }
            }

            .fin_price_box {
                .fin_price {
                    color: #f99740;
                    font-size: 24px;
                    margin-left: 14px;
                }

                .el-button {
                    background: #f99740;
                    font-size: 18px;
                    width: 180px;
                    height: 46px;
                }
            }

            .PayWay_box {
                border-top: none;
                border: 1px solid #f8f8f8;
                margin-bottom: 48px;
                .el-col{
                    border-bottom: 1px solid #f8f8f8;
                }
                .payTitle {
                    padding: 10px 24px;
                    display: block;
                    background: #f8f8f8;
                    font-weight: 600;
                }

                .ABC,
                .ICBC,
                .CCB,
                .PSBC,
                .AliPay,
                .WeChatPay {
                    width: 200px;
                    margin: 35px 24px;

                    .img {
                        background: url(/img/logo_bank34_34.0ac20eaa.png) no-repeat;
                        width: 32px;
                        height: 32px;
                        display: inline-block;
                        line-height: 32px;
                        margin-left: 14px;
                    }

                    .content {
                        margin-left: 44px;
                    }
                }

                .ICBC {
                    .img {
                        background-position-x: -34px;
                    }
                }

                .CCB {
                    .img {
                        background-position-x: -68px;
                    }
                }

                .PSBC {
                    .img {
                        background-position-x: -102px;
                    }
                }

                .AliPay {
                    margin: 14px 24px;

                    .img {
                        background-position-x: -136px;
                    }
                }

                .WeChatPay {
                    margin: 14px 24px;

                    .img {
                        background-position-x: -171px;
                    }
                }
            }
        }

    }
</style>
