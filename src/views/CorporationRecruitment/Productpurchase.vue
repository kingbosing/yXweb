<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon"
        v-cloak>
        <el-header height="50px">

            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><span @click="backTo">增值服务</span></el-breadcrumb-item>
                <el-breadcrumb-item><span>商品购买</span></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column width="220px">
                    <template slot-scope="scope">
                        <img src="../../assets/Recruitment/icon_list_money.png">
                    </template>
                </el-table-column>
                <el-table-column label="商品信息">
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
                <el-table-column label="数量" width="350px">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.zip" :min="1" label="描述文字"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="小计" width="350px">
                    <template slot-scope="scope">
                        <span class="color-yello">{{scope.row.city}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="bill_box">
                <el-col>
                    <h3>发票信息:</h3>
                </el-col>
                <el-col>
                    <el-checkbox>我要开发票</el-checkbox>
                </el-col>
                <el-col :span="2"><span class="bill_content">发票类型：普通发票</span></el-col>
                <el-col :span="2"><span class="bill_content">发票抬头：个人</span></el-col>
                <el-col :span="2"><span class="bill_content">发票内容：明细</span></el-col>
                <el-col :span="2"><span class="bill_content">发票金额：￥600.00</span></el-col>
                <el-col :span="2">
                    <el-button type="text" class="bill_btn" @click="dialogFormVisible=true">修改</el-button>
                </el-col>
            </el-row>
            <el-row class="fin_price_box">
                <el-col :span="3" :offset="21">
                    <h3>应付金额：<span class="fin_price">￥60.00</span></h3>
                </el-col>
                <el-col :span="3" :offset="21">
                    <el-button type="warning" @click="ToPurchase">购买</el-button>
                </el-col>
            </el-row>
        </el-main>
        <el-dialog class="billdialog" title="发票信息" :visible.sync="dialogFormVisible" width="32%" :label-position="labelposition">
            <el-form :model="form" class="billform">
                <el-form-item label="发票类型" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="form.name">
                        <el-checkbox label="普通发票"></el-checkbox>
                        <el-checkbox label="增值税发票"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="发票抬头" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="form.name">
                        <el-checkbox label="个人" v-show="!isAdd"></el-checkbox>
                        <el-checkbox label="部门"></el-checkbox>
                    </el-checkbox-group>
                    <span v-show="isAdd" class="dep_tips">我公司依法开具发票，如你购买的商品按税法规定属于不得从增值税销项税额中抵扣的项目（如集体福利或个人消费等），请选择普通发票</span>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-show="isAdd" label="纳税人识别号" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-show="isAdd" label="注册地址" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-show="isAdd" label="注册电话" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-show="isAdd" label="开户银行" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item v-show="isAdd" label="银行账户" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="发票内容" :label-width="formLabelWidth">
                    <span>订单明细</span>
                </el-form-item>
                <el-form-item label="发票金额" :label-width="formLabelWidth">
                    <span class="color-yello">￥2323123</span>
                </el-form-item>
                <el-form-item label="收票地址" :label-width="formLabelWidth" class="addresstitle">
                </el-form-item>
                <el-form-item label="所在地址" :label-width="formLabelWidth">
                    <el-cascader :options="options2" @active-item-change="handleItemChange" :props="props"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" :label-width="formLabelWidth">
                    <el-input v-model="form.name" type="textarea" :rows="4" placeholder="请填写正确的收货地址，以便票据能及时送达"></el-input>
                </el-form-item>
                <el-form-item label="收货人" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="发票须知" :label-width="formLabelWidth">
                    <el-row class="bill_tips">
                        <el-col>1. 依照税局最新开票法规，纸质普通发票和电子普通发票，开具内容均为明细</el-col>
                        <el-col>2. 开票金额为用户实际支付的金额（不含礼品卡与不支持该发票类型的商品实付金额）</el-col>
                        <el-col>3. 电子发票可在确认收货后，在“订单详情页”下载</el-col>
                        <el-col>4. 未随箱寄出的纸质发票会在发货后15-30个工作日单独寄出</el-col>
                        <el-col>5. 增值税专用发票将会在所有包裹发货后15-30个工作日单独寄出</el-col>
                        <el-col>6. 单笔订单只支持开具一种类型的发票</el-col>
                        <el-col>7. 年购订单发票随每期子单寄出</el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

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
      }
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
    ToPurchase() {
      this.$router.push({
        path: '/CorporationRecruitment/PurchaseConfirmation'
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
    .billdialog .el-dialog{
        margin-top: 4vh!important;
    }
.billdialog .el-dialog__body{
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
                    margin-top: 20px;
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
        }
    .el-dialog{
        .el-form {
            .el-form-item {
                min-height: 36px;
                margin-bottom: 12px;
                line-height: 36px;

                .el-input {
                    height: 28px;

                }

                &.addresstitle {
                    color: #1a1a1a;

                    label {
                        &.el-form-item__label {
                            font-weight: 600;
                            color: #1a1a1a;

                        }
                    }

                }

                .dep_tips {
                    line-height: 24px;
                    font-size: 12px;
                    color: #8a8a8a;
                    display: block;
                    margin-bottom: 10px;
                }

                .bill_tips {
                    margin-top: 6px;
                    line-height: 24px;
                    font-size: 12px;
                    display: block;
                    margin-bottom: 10px;
                }
            }
        }
}
    }
</style>
