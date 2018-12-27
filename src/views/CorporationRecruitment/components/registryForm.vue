<template>
    <el-container  class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <div class="main">
            <div class="cell">
                <p>信息登记表用于审核求职者信息，并与面试邀请一起发送给求职者。选择是否发送：</p>
                <!-- <el-radio v-model="IsSend" label="1">是</el-radio>
                <el-radio v-model="IsSend" label="0">否</el-radio> -->
                <el-switch
                  style="display: block"
                  v-model="IsSend"
                  active-color="#13ce66"
                  inactive-color="#eee"
                  active-text="发送"
                  inactive-text="不发送">
                </el-switch>
            </div>
            <div class="cell">
                <p>请自定义设置本公司所需的登记表信息，如不进行选择，系统默认发送此模板给求职者。</p>
                 <el-checkbox v-model="list.IsApplyJob" :disabled="!IsSend">应聘岗位</el-checkbox>
                 <el-checkbox v-model="list.IsApplyDate" :disabled="!IsSend">应聘时间</el-checkbox>
                 <el-checkbox v-model="list.IsBaseInfo" :disabled="!IsSend">基本信息</el-checkbox>

                 <el-checkbox v-model="list.IsEducation" :disabled="!IsSend">教育经历</el-checkbox>
                 <el-checkbox v-model="list.IsTrain" :disabled="!IsSend">培训经历</el-checkbox>
                 <el-checkbox v-model="list.IsWorks" :disabled="!IsSend">最近三分工作</el-checkbox>

                 <el-checkbox v-model="list.IsFamily" :disabled="!IsSend">家庭成员</el-checkbox>
                 <el-checkbox v-model="list.IsGeneralInfo" :disabled="!IsSend">综合信息</el-checkbox>
                 <el-checkbox v-model="list.IsPlanning" :disabled="!IsSend">职业规划</el-checkbox>

            </div>
            <div class="cell">
                <p>请添加所需求职者填写的其他信息</p>
                 <p v-for="(k,v) in list.Customs" :key="v" class="otherInfo">
                     <el-checkbox  v-model="k.IsSelect" :disabled="!IsSend" >{{k.Title}}</el-checkbox>
                     <span @click="doRemove(k)" style="color:#f99740;float:right;margin-top:10px;cursor: pointer;">删除</span>
                </p>
                <p class="adder">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                     <el-button size='small' @click="adderIt">添加</el-button>
                </p>
            </div>

        </div>

    </el-container>
</template>

<script>
import { get_rsinfo, add_rc, del_rc, update_regist } from '@/api/recruitment'

export default {
  data() {
    return {
      fullscreenLoading: false,
      list: [],
      IsSend: false,
      checked: '1',
      input: ''

    }
  },
  watch: {
    checked(v) {
      if (v == 1) {
        this.IsSend = false
      } else {
        this.IsSend = true
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getRsinfo(this)
    },
    adderIt() {
      if (this.input) {
        add_rc(this.input).then(c => {
          console.log(c.data)
          if (c.data.Code == 0) {
            // this.init()
            this.list.Customs.push({
              Title: this.input,
              IsSelect: false,
              CustomId: c.data.Data
            })
            this.input = ''
          } else {
            this.$message({
              type: 'info',
              message: c.data.Message
            })
          }
        })
      }
    },
    doRemove(k) {
      del_rc(k.CustomId).then(c => {
        if (c.data.Code == 0) {
          // this.init()
          this.list.Customs = this.list.Customs.filter(c => {
            return k.CustomId != c.CustomId
          })
        }
      })
    },
    toSave() {
      console.log(this.list)
      const CustomIds = []
      this.list.Customs.forEach(it => {
        if (it.IsSelect) {
          CustomIds.push(it.CustomId)
        }
      })
      const Data = {
        CustomIds,
        Id: this.list.Id,
        IsSend: this.IsSend,
        IsApplyJob: this.list.IsApplyJob,
        IsApplyDate: this.list.IsApplyDate,
        IsBaseInfo: this.list.IsBaseInfo,
        IsEducation: this.list.IsEducation,
        IsTrain: this.list.IsTrain,
        IsWorks: this.list.IsWorks,
        IsFamily: this.list.IsFamily,
        IsGeneralInfo: this.list.IsGeneralInfo,
        IsPlanning: this.list.IsPlanning
      }
      console.log(this.list)
      console.log(Data)
      updateRegist(this, Data)
    }

  }
}

const getRsinfo = (app) => {
  get_rsinfo().then(c => {
    // console.log(c)
    app.list = c.data.Data
    app.IsSend = c.data.Data.IsSend
  })
}

const updateRegist = (app, data) => {
  update_regist(data).then(c => {
    console.log(c)
    if (c.data.Code == 0) {
      // app.init()
      app.$router.push({ path: '/CorporationRecruitment/components/registryFormPreview' })
    }
  })
}

</script>

<style lang="scss" scoped>
.temlateMain{
    .main{
        height: 100%;
        width: 960px;
        margin:0 auto;
        .cell{
            padding: 20px;
            border-bottom: 1px solid #eee;
            .el-checkbox{
                margin: 15px 190px 0 0;

            }
            .el-checkbox+.el-checkbox {
                margin-left: 0px;
            }
            .otherInfo{
                padding: 0 100px 10px 15px;
                &:hover{
                    background: #eee;
                }
            }
            .adder{
                .el-input{
                    width: 250px;
                    float: left;
                }
                .el-button{
                    margin: 5px 20px;
                }
            }
        }
    }
}
</style>

