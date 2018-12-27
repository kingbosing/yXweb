<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>创建/加入公司</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-right">
              <el-button type="" size="" v-on:click="jumpIndex()">创建公司</el-button>
              <div class="tools_search">
                <el-popover id="searchStaff" placement="bottom" width="400" trigger="manual" v-model="visible">
                   <div>
                        <div class="headImg">
                            <p>{{companyData.CompanyName}}</p>
                            <p><b>公司ID：</b>{{companyData.CompanyCode}}</p>
                            <img :src="showImg(companyData.CompanyLOGFormatUrl,50,50)">
                        </div>
                        <div class="bodyText">
                           <p>公司信息</p>
                           <p><b>法人代表：</b>{{!companyData.BossName?'(空)':companyData.BossName}}</p>
                           <p><b>公司地址：</b>{{!companyData.Address?'(空)':companyData.Address}}</p>
                           <p><b>公司网址：</b>{{!companyData.Url?'(空)':companyData.Url}}</p>
                        </div>
                        <p style="text-align: center;"><el-button type="warning" plain @click="getFunId(companyData.CompanyCode,3)">申请加入公司</el-button></p>
                   </div>
                   <el-input slot="reference" placeholder="请输入公司ID" suffix-icon="el-icon-search" v-model="inputStaff" @keyup.enter.native="searchStaff"></el-input>
                </el-popover>
              </div>
            </div>
        </el-header>
        <el-main>
            <div class="newColleagueList" v-for="item in listData" :key="item.Id">
                <p>{{item.CreatedTime}}</p>
                <el-card shadow="hover">
                   <el-row>
                       <el-col :span="18">
                           <el-popover  placement="right" width="400" trigger="hover">
                               <div>
                                  <div class="headImg">
                                     <p>{{item.CompanyName}}</p>
                                     <p><b>公司ID：</b>{{item.CompanyCode}}</p>
                                     <img :src="showImg(item.CompanyLogUrl,50,50)">
                                  </div>
                                  <div class="bodyText">
                                      <p>公司信息</p>
                                      <p><b>法人代表：</b>{{!item.LawAgent?'(空)':item.LawAgent}}</p>
                                      <p><b>公司地址：</b>{{!item.CompanyAddress?'(空)':item.CompanyAddress}}</p>
                                      <p><b>公司网址：</b>{{!item.Url?'(空)':item.Url}}</p>
                                  </div>
                               </div>
                               <img :src="showImg(item.CompanyLogUrl,60,60)" slot="reference">
                           </el-popover>
                           <div class="textBox">
                            <span>{{item.CompanyName}}</span>
                            <span>公司ID：<b>{{item.CompanyCode}}</b></span>
                           </div>
                       </el-col>
                       <el-col :span="6">
                           <!--邀请我加入公司-->
                           <el-button @click="getFunId(item.Id,2)" v-if="item.Status=='邀请我加入公司'">拒 绝</el-button>
                           <el-button type="warning" @click="getFunId(item.Id,1)" v-if="item.Status=='邀请我加入公司'">同 意</el-button>
                           <span v-if="item.Status=='邀请我加入公司'">邀请我加入公司</span>
                           <!--等待HR同意-->
                           <span class="prompt" v-if="item.Status=='等待HR同意'">等待HR处理申请</span>
                           <!--等待HR分配职务-->
                           <span class="prompt" v-if="item.Status=='等待HR分配职务'">等待HR分配职位</span>
                           <!--HR已拒绝-->
                           <el-button v-if="item.Status=='HR已拒绝'" @click="JoinCompanyDelJoinrec">删 除</el-button>
                           <span class="delete_prompt" v-if="item.Status=='HR已拒绝'">已被拒绝</span>
                       </el-col>
                   </el-row>
                </el-card>
            </div>
        </el-main>
        <!--弹窗-->
              <el-dialog :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span style="display:block;text-align: center;">是否同意加入该公司？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="JoinCompanyAgreeJoin">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <el-dialog :visible.sync="centerDialogVisible_2" width="30%" center>
                  <span style="display:block;text-align: center;">是否拒绝加入该公司？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_2 = false" style="margin-right:100px" v-on:click="JoinCompanyIgnoreJoin">确 定</el-button>
                     <el-button @click="centerDialogVisible_2 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <el-dialog :visible.sync="centerDialogVisible_3" width="40%" center>
                  <el-input type="textarea" :rows="2" placeholder="需要验证您的身份，请输入请求信息" v-model="textarea" :maxlength="50"></el-input>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_3 = false" style="margin-right:100px" v-on:click="Send_joinCompany">确 定</el-button>
                     <el-button @click="centerDialogVisible_3 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
import touxiang from '@/assets/JoinOrCreate-logo50.png'
import * as home from '@/api/home'

export default {
  components: {

  },
  data() {
    return {
      touxiang: touxiang,
      fullscreenLoading: true, // 加载效果状态值
      listData: [], // 列表数据
      centerDialogVisible_1: false,
      centerDialogVisible_2: false,
      centerDialogVisible_3: false,
      inputStaff: '',
      visible: false,
      funId: '',
      companyData: [],
      textarea: ''
    }
  },
  mounted() {
    this.JoinQueue()
  },
  watch: {

  },
  methods: {
    // 跳转创建公司页
    jumpIndex() {
      this.$router.push({ path: '/home/CreateCompany' })
    },
    // 发送加入申请
    Send_joinCompany() {
      const model = {
        'CompanyCode': this.funId,
        'Remark': this.textarea
      }
      const that = this
      home.Send_joinCompany(getToken(), model).then(res => {
        console.log(res.data)
        if (res.data.successful) {
          that.$message({
            message: '发送成功',
            type: 'success',
            onClose: function() {
              that.JoinQueue()
            }
          })
        } else {
          that.$message({
            message: res.data.Message,
            type: 'warning'
          })
        }
      })
    },
    // 获取公司数据
    Search_Company(textInput) {
      console.log(textInput)
      this.companyData = []
      const that = this
      home.Search_Company(getToken(), textInput).then(res => {
        console.log(res.data)
        if (res.data.successful) {
          that.companyData = res.data.Data
          that.visible = true
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 搜索新公司
    searchStaff() {
      console.log(this.inputStaff)
      if (this.inputStaff) {
        this.Search_Company(this.inputStaff)
        // this.visible = true
      } else {
        this.visible = false
      }
    },
    // 删除
    JoinCompanyDelJoinrec() {
      const that = this
      home.JoinCompanyDelJoinrec(getToken(), that.funId).then(res => {
        console.log(res.data)
        if (res.data.successful) {
          that.$message({
            message: '删除成功',
            type: 'success',
            onClose: function() {
              that.JoinQueue()
            }
          })
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 同意
    JoinCompanyAgreeJoin() {
      console.log(this.funId)
      const that = this
      home.JoinCompanyAgreeJoin(getToken(), that.funId).then(res => {
        console.log(res.data)
        if (res.data.successful) {
          that.$message({
            message: '同意成功',
            type: 'success',
            onClose: function() {
              that.JoinQueue()
            }
          })
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 拒绝
    JoinCompanyIgnoreJoin() {
      console.log(this.funId)
      const that = this
      home.JoinCompanyIgnoreJoin(getToken(), that.funId).then(res => {
        console.log(res.data)
        if (res.data.successful) {
          that.$message({
            message: '拒绝成功',
            type: 'success',
            onClose: function() {
              that.JoinQueue()
            }
          })
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 获取操作ID
    getFunId(ID, type) {
      this.funId = ID
      if (type == 1) {
        this.centerDialogVisible_1 = true
      } else if (type == 2) {
        this.centerDialogVisible_2 = true
      } else if (type == 3) {
        this.centerDialogVisible_3 = true
        this.visible = false
      }
    },
    // 图片显示
    showImg(url, width, height) {
      if (url == '' || url == null) {
        return touxiang
      } else {
        return this.faceUrl(url, width, height)
      }
    },
    // 图片处理
    faceUrl(url, width, height) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          height
        )
      }
    },
    // 获取列表
    JoinQueue() {
      this.fullscreenLoading = true
      this.listData = []
      const that = this
      home.JoinQueue(getToken()).then(res => {
        console.log(res.data)
        if (res.data.successful) {
          that.fullscreenLoading = false
          that.listData = res.data.Data
        }
      })
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
      padding: 0 30px 20px 30px;
              .newColleagueList{
                  p{
                      margin: 20px 0 10px 0;
                      text-align: center;
                      color:#8a8a8a;
                  }
                  .el-card__body{
                      img{
                          width:60px;
                          height:60px;
                          border-radius: 4px;
                          display: inline-block;
                          float: left;
                          margin-right: 20px;
                      }
                      .textBox{
                           display: inline-block;
                           float: left;
                           span{
                               display: block;
                               margin: 10px;
                                   b{
                                    font-weight: normal;
                                    color:#f99740;
                                   }
                               }
                      }
                  }
                  .el-col.el-col-6{
                      padding-top: 10px;
                      span{
                          display: inline-block;
                          margin: 10px 10px 0 0;
                          float: right;
                      }
                      .prompt{
                          color:#f99740;
                      }
                      .delete_prompt{
                           color:red;
                      }
                      .el-button {
                          float:right;
                          margin-right: 10px;
                      }
                      .el-button--text{
                          color:red;
                      }
                  }
              }

  }

}
.headImg{
   height: 90px;
   padding: 20px 10px 0 10px;
   position: relative;
   border-bottom: 1px solid #dedede;
  img{
    height: 50px;
    width:50px;
       float: right;
       position: absolute;
       top:15px;
       right: 10px;
       border-radius: 4px;
  }
  p{
    margin-top: 0;
    margin-bottom: 8px;
    display: inline-block;
    width: 300px;
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
b{
      font-weight: normal;
           color:#8a8a8a;
}
  }
}
.bodyText{
    padding: 15px;
   p{
        color:#323232;
        width: 100%;
        b{
           font-weight: normal;
           color:#8a8a8a;
        }
   }
   }
</style>

