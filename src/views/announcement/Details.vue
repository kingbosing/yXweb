<template>
    <el-container class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/announcement/index' }">公告</el-breadcrumb-item>
                <el-breadcrumb-item>公告详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-container id="announcement">
                <el-header height="50px">
                    {{listData.Title}}
                </el-header>
                <el-main>
                   <p class="greyBar">
                     <span>发布人：{{listData.CreateName}}</span>
                     <span>发布时间：{{listData.UpdateTime}}</span>
                   </p>
                   <pre>{{listData.Detail}}</pre>
                   <div class="accessories" v-if="FileNum">
                     <p>附件：</p>
                     <div class="file_col" v-for="(k,v) in File" :key="v">
                        <new-icon class-name="file_col_icon"  :icon-name="FileIcon(k.FileName)" />
                        <span class="fileName">{{k.FileName}}</span>
                        <span class="size">{{k.Size|fileSize}}</span>
                        <i class="handle toDownLoad" v-on:click="download(k.SaveUrl,k.FileName)"></i>
                     </div>
                     <div class="file_col" v-for="(k,v) in Img" :key="v">
                        <img class="fileType" v-bind:src="faceUrl(k.SaveUrl,40)" />
                        <span class="fileName">{{k.FileName}}</span>
                        <span class="size">{{k.Size|fileSize}}</span>
                        <i class="handle toBig" v-on:click="getBig(k.SaveUrl)"></i>
                     </div>
                   </div>
                </el-main>
                <el-footer>
                   <p style="text-align:center;margin:0;">
                     <el-button type="warning" @click="jumpFun()" v-if="Visual==128">修 改</el-button>
                     <el-button style="margin-left:100px;" type="" @click="centerDialogVisible_1 = true" v-if="Visual==128">删 除</el-button>
                   </p>
                </el-footer>
            </el-container>
        </el-main>
        <!--弹窗-->
              <el-dialog :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span style="display:block;text-align: center;">是否确定删除？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="deleteFun">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
              </el-dialog>
              <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import * as announcement from '@/api/announcement'
import urlUtil from '@/utils/urlUtil'
import { globalvariable } from '@/utils/globalvariable'
import { getFileIcon } from '@/utils/fileType'
export default {
  components: {

  },
  data() {
    return {
      // 公告ID
      noticeId: '', // 操作ID
      fullscreenLoading: true, // 加载效果状态值
      listData: [],
      File: [], // 文件数据
      Img: [], // 图片数据
      FileNum: true, // 文件是否显示
      centerDialogVisible_1: false,
      Visual: true// 权限
    }
  },
  mounted() {
    this.noticeId = this.$route.query.id
    this.Get_detail()
    this.getuserroletype()
  },
  watch: {

  },
  methods: {
    // 获取身份
    getuserroletype() {
      const that = this
      announcement.getuserroletype(getToken()).then(res => {
        console.log(res.data)
        if (res.data.Successful) {
          this.Visual = res.data.Data
        } else {
          that.$message({
            message: res.data.Message,
            type: 'error'
          })
        }
      })
    },
    // 跳转编辑页
    jumpFun() {
      this.$router.push({ path: '/announcement/NewAnnouncement', query: { editorId: this.noticeId }})
    },
    // 获取详情
    Get_detail() {
      const that = this
      that.listData = []
      return new Promise((resolve, reject) => {
        announcement.Get_detail(getToken(), that.noticeId)
          .then(response => {
            console.log('///')
            console.log(response.data.Data)
            if (response.data.Successful) {
              that.listData = response.data.Data
              that.File = response.data.Data.NoticeFiles
              that.Img = response.data.Data.NoticePhotos
              // FileNum
              const num = that.File.length + that.Img.length
              if (num == 0) {
                that.FileNum = false
              } else {
                that.FileNum = true
              }
              that.fullscreenLoading = false
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 删除
    deleteFun() {
      const that = this
      return new Promise((resolve, reject) => {
        announcement.Remove(getToken(), that.noticeId)
          .then(response => {
            console.log(response.data)
            if (response.data.Successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  that.$router.push({ path: '/announcement/Index' })
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
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          width
        )
      }
    },
    getBig(url) {
      var imgUrl = globalvariable().imgapiurl + url

      this.$alert('<img class="bigImg" src="' + imgUrl + '" />', {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        customClass: 'bigImgBox'
      })
    },
    download(url, name) {
      var Src = globalvariable().bigfileurl + url + encodeURIComponent(name, 'UTF-8')
      window.open(Src)
    },
    fileLength(FileIDs, Images) {
      return Images.length > 0 && FileIDs.length > 0
    },
    FileIcon(name) {
      console.log(name)
      return getFileIcon(name)
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
  .el-header {

    .header-right {
      float: right;
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main{
      height: 100%;
      margin: 0;
     padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            font-size: 16px;
         }
         .el-main{
           padding: 0 30px;
           .greyBar{
             color:#8a8a8a;
             margin-bottom: 50px;
             span{
               margin-right: 20px;
             }
           }
           pre{
             background-color: #fff;
             border: transparent;
             font-family: '微软雅黑';
             font-size: 14px;
             margin-bottom: 40px;
           }
         }

    }
  }

}
.file_col{
    height:50px;
    width:460px;
    margin:5px 0;
    position:relative;
}
.file_col .fileType{
    height:40px;
    width:40px;
    display:inline-block;
    float:left;
    margin-top:5px;

    font-size:38px;
}
.file_col .fileType .iconfont {
    font-size: 40px;
    position:absolute;
}
.file_col .fileName {
    position: absolute;
    top: 5px;
    left: 50px;
    color: #8a8a8a;
}
.file_col .size {
    margin:0;
    padding:0;
    position: absolute;
    top: 30px;
    left: 50px;
    color:#ccc;
}
.file_col .handle {
    height: 20px;
    width: 20px;
    display: inline-block;
    float: right;
    margin-top: 15px;
    cursor:pointer;
}
.file_col .toBig {
    background: url(/images/applyAndapproval_icon.png)0  -666px;
}
.file_col .toDownLoad {
    background: url(/images/applyAndapproval_icon.png)0  -560px;
}
.file_col .toBig:hover {
    background: url(/images/applyAndapproval_icon.png)0  -612px;
}

.file_col .toDownLoad:hover {
    background: url(/images/applyAndapproval_icon.png)0  -503px;
}

</style>

