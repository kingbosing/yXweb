<template>
   <el-container id="employeeInformation" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
     <el-main :class="{bjImg:isEmpty}">
       <div class="newColleagueBox">
            <div class="newColleagueList" v-for="item in listData" :key="item.XiaoYingCode">
                <p>{{item.Time}}</p>
                <el-card shadow="hover">
                   <el-row>
                       <el-col :span="18">
                           <img :src="showImg(item.FaceUrl)" @click="detailsFun(item)">
                           <div class="textBox">
                            <p v-if="item.JoinType == 0"><b>{{item.Nick}}</b>申请加入</p>
                            <span v-if="item.JoinType == 0"><b>附语：</b>{{!item.Remark?'(空)':item.Remark}}</span>
                            <p v-if="item.JoinType != 0">邀请<b>{{item.Nick}}</b>加入</p>
                            <span v-if="item.JoinType != 0"><b>邀请人：</b>{{item.InviterName}}</span>
                           </div>
                       </el-col>
                       <el-col :span="6">
                           <el-button v-if="item.JoinType == 0&&item.Status==0" @click="operationFun(item.Id, 1)">拒 绝</el-button>
                           <el-button type="success" v-if="item.JoinType == 0&&item.Status==0" @click="agreeFun(item.Id, item.XiaoYingCode)">同 意</el-button>
                           <el-button v-if="item.JoinType == 0&&item.Status==3" @click="operationFun(item.Id, 2)">删 除</el-button>
                           <el-button type="text" v-if="item.JoinType == 0&&item.Status==3">对方已撤销</el-button>
                           <el-button v-if="item.JoinType != 0&&item.Status==1" @click="operationFun(item.Id, 1)">拒 绝</el-button>
                           <el-button type="success" v-if="item.JoinType != 0&&item.Status==1" @click="agreeFun(item.Id, item.XiaoYingCode)">分配职位</el-button>
                       </el-col>
                   </el-row>
                </el-card>
            </div>
       </div>
     </el-main>
     <el-footer>
         <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[5,25,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalCount">
            </el-pagination>
     </el-footer>
     <!--弹窗-->
     <el-dialog :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span style="display:block;text-align: center;">是否确定拒绝？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="RefuseJoin">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
     </el-dialog>
     <el-dialog :visible.sync="centerDialogVisible_2" width="30%" center>
                  <span style="display:block;text-align: center;">是否确定删除？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_2 = false" style="margin-right:100px" v-on:click="DelnewColleague">确 定</el-button>
                     <el-button @click="centerDialogVisible_2 = false">取 消</el-button>
                  </span>
     </el-dialog>
     <el-dialog :visible.sync="centerDialogVisible_3" id="detailsFun" width="240px">
        <div class="headImg">
           <p>{{operationData.Nick}}</p>
           <p>{{!operationData.Singer?'(空)':operationData.Singer}}</p>
           <img :src="showImg(operationData.FaceUrl)">
        </div>
        <div class="bodyText">
            <p>个人信息</p>
            <p><b>小赢号：</b>{{operationData.XiaoYingCode}}</p>
            <p><b>地&emsp;区：</b>{{!operationData.Region?'(空)':operationData.Region}}</p>
        </div>
     </el-dialog>
     <!--**********************************************-->
   </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as personnelManagement from '@/api/personnelManagement'
import { globalvariable } from '@/utils/globalvariable'
import shenfenchaxun from '@/assets/personalCard-touxiang.png'
import urlUtil from '@/utils/urlUtil'
export default {
  components: {
  },
  data() {
    return {
      fullscreenLoading: true, // 加载效果状态值
      shenfenchaxun: shenfenchaxun,
      listData: [], // 列表数据
      totalCount: 0, // 总条数
      index: 1, // 当前页
      size: 5, // 每页数
      isEmpty: true,
      centerDialogVisible_1: false,
      centerDialogVisible_2: false,
      centerDialogVisible_3: false,
      operationId: '', // 操作ID
      operationData: []
    }
  },
  mounted() {
    this.ToNewColleague(1, 5)
  },
  watch: {

  },
  methods: {
    // 点击获取详情介绍
    detailsFun(data) {
      console.log(data)
      this.operationData = data
      this.centerDialogVisible_3 = true
    },
    // 删除
    DelnewColleague() {
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.DelnewColleague(getToken(), that.operationId)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  that.ToNewColleague(1, 5)
                }
              })
              resolve()
            } else {
              that.$message({
                message: response.data.Message,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 拒绝
    RefuseJoin() {
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.RefuseJoin(getToken(), that.operationId)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '拒绝成功',
                type: 'success',
                onClose: function() {
                  that.ToNewColleague(1, 5)
                }
              })
              resolve()
            } else {
              that.$message({
                message: response.data.Message,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 操作函数
    operationFun(id, type) {
      console.log(id, type)
      this.operationId = id
      if (type == 1) {
        this.centerDialogVisible_1 = true
      } else {
        this.centerDialogVisible_2 = true
      }
    },
    // 同意
    agreeFun(Id, XiaoYingCode) {
      console.log(Id, XiaoYingCode)
      this.$router.push({ path: '/PersonnelManagement/staffEditor', query: { queueid: Id, XiaoYingCode: XiaoYingCode }})
    },
    // 图片显示
    showImg(url) {
      if (url == '' || url == null) {
        return shenfenchaxun
      } else {
        return this.faceUrl(url, 60, 60)
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
    // 获取数据列表
    ToNewColleague(index, size) {
      console.log(index, size)
      this.listData = []
      this.fullscreenLoading = true
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.ToNewColleague(getToken(), index, size)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.fullscreenLoading = false
              that.listData = response.data.Data
              if (response.data.Data.length == 0) {
                that.isEmpty = true
              } else {
                that.isEmpty = false
              }
              that.totalCount = response.data.TotalCount
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.size = val
      this.index = 1
      this.ToNewColleague(1, this.size)
    },
    handleCurrentChange(val) {
      // /翻页
      this.index = val
      this.ToNewColleague(this.index, this.size)
    }

  }
}

</script>
<style lang="scss" scoped>
 .temlateMain {
  .el-header {

  }
  .el-main{
      height: 100%;
      margin: 0;
     padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            font-weight: normal;
            font-size: 14px;
         }
         .el-main{
              padding: 0 30px 0 30px;
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
                          border-radius: 50%;
                          display: inline-block;
                          float: left;
                          margin-right: 20px;
                      }
                      .textBox{
                           display: inline-block;
                           float: left;
                           p{
                               margin-top: 10px;
                               font-size: 16px;
                               b{
                                   font-weight: normal;
                                   color:#f99740;
                               }
                           }
                           span{
                                   b{
                                    font-weight: normal;
                                    color:#8a8a8a;
                                   }
                               }
                      }
                  }
                  .el-col.el-col-6{
                      padding-top: 10px;
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
  }

}
.bjImg{
  background: url("/images/norecord.png") no-repeat;
  background-position:center center
}
.headImg{
   height: 94px;
   background: url("/images/bg-newColleagues.png") no-repeat;
   padding: 26px 10px 0 10px;
   position: relative;
  img{
       float: right;
       position: absolute;
       top:15px;
       right: 10px;
       border-radius: 50%;
  }
}
#detailsFun p{
    margin-top: 0;
    color:#fff;
    display: inline-block;
    width: 150px;
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
#detailsFun .bodyText{
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
<style>
#detailsFun .el-dialog__body{
    padding: 0 0 5px 0;
}
</style>

