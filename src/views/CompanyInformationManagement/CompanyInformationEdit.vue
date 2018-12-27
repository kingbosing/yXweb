<template>
    <el-container class="temlateMain">
        <el-header height="50px">
            <span>公司信息>编辑</span>
            <span @click="save" class="editbut">保存</span>
        </el-header>
        <el-main>
            <el-form ref="form" :model="data" label-width="90px" :rules="rules">
                <div class="head">
                    <input type="file" @change="gethead"  id="headfile">
                    <label v-if="data.LOGFormatUrl == ''" for="headfile"></label>
                    <img class="headimg" :src="headpicture" alt="">
                    <div class="headhover">
                        <img class="close" @click="deletehead" src="../../assets/finance/failurelcon.png" alt="">
                    </div>
                    <div v-if="logosuccessful" class="logo-successful"></div>
                    <span>小赢号：dfdf</span>
                </div>
                <div class="Company-box">
                    <p class="headtitle">公司基本信息</p>
                    <el-form-item label="公司名称:"  prop="Name">
                        <el-input v-model="data.Name"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="电话:" >
                                <el-input v-model="data.MastPhones"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <div class="null-box"></div>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="备用电话:" >
                                <el-input v-model="data.ReservePhones"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="公司传真:" >
                                <el-input v-model="data.Fax"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <div class="null-box"></div>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="公司邮箱:" prop="Email">
                                <el-input v-model="data.Email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="公司网站:">
                        <el-input v-model="data.Url"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址:">
                        <el-input v-model="data.Address"></el-input>
                    </el-form-item>
                    <el-form-item label="法人代表:">
                        <el-input v-model="data.LawAgent"></el-input>
                    </el-form-item>
                    <el-form-item label="股东:">
                        <el-input v-model="data.Stockholders"></el-input>
                    </el-form-item>
                    <div class="certificate-box">
                        <span>资历证书</span>
                        <div class="cate-box">
                            <div class="cate" v-if="upsrc.length !== [] || upsrc.length !== 0 && upsrc.length !== []" v-for="(item ,key) in upsrc" :key="key">
                                <div class="close-box">
                                    <span>{{item.FileName}}</span>
                                    <img class="close" @click="deletecata(key)" src="../../assets/finance/failurelcon.png" alt="">
                                </div>
                                <img :src="item.url" alt="">
                                <div v-if="item.state" class="successful"></div>
                            </div>
                            <input type="file" @change="getFile"  id="file" >
                            <label v-if="upsrc.length < 5" class="file-label" for="file"></label>
                        </div>
                    </div>
                    <p class="headtitle">公司介绍</p>
                    <ul class="introduction-box">
                        <li>
                            <span class="introduction-title">公司简介</span>
                            <span class="introduction-edit" @click="compile(companyprofile)">编辑</span>
                            <textarea v-model="companyprofile.DescContent" class="introduction-text" cols="" style="height:121px;width:100%;" readonly="readonly"></textarea>
                        </li>
                        <li>
                            <span class="introduction-title">管理团队</span>
                            <span class="introduction-edit" @click="compile(team)">编辑</span>
                            <textarea rows="" v-model="team.DescContent" class="introduction-text" cols="" style="height:121px;width:100%;" readonly="readonly"></textarea>
                        </li>
                        <li>
                            <span class="introduction-title">业务介绍</span>
                            <span class="introduction-edit" @click="compile(business)">编辑</span>
                            <textarea rows="" v-model="business.DescContent" class="introduction-text" cols="" style="height:121px;width:100%;" readonly="readonly"></textarea>
                        </li>
                        <li v-if="modules.length > 0" v-for="(item,key) in modules" :key="key">
                            <span class="introduction-title">{{item.Title}}</span>
                            <span class="introduction-edit" @click="deleteintroduction(key)">删除</span>
                            <span class="introduction-edit" @click="compile(item,key)">编辑</span>
                            <textarea rows="" v-model="item.DescContent" class="introduction-text" cols="" style="height:121px;width:100%;" readonly="readonly"></textarea>
                        </li>
                    </ul>
                    <p>
                         <span class="addintroduction" @click="addmodule">添加新模块</span>
                    </p>
                </div>
           </el-form>
        </el-main>
        <div class="edit-box" v-if="cup">
            <div>
                <p>{{edittext}}</p>
                <span class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                <span v-if="editstate == 1">{{name}}</span>
                <input v-if="editstate == 2" type="text" v-model="name">
                <div>
                    <span class="name float-left">文字内容：</span>
                    <textarea  v-model="content" id="editInfomationText" style="height:178px;width:380px;" maxlength="300"></textarea>
                </div>
                <div class="button-box">
                    <button class="confurm" @click="confurm(name,content)">确定</button>
                    <button @click="cancel" class="cancel">取消</button>
               </div>
            </div>

        </div>
    </el-container>
</template>

<script>
import * as API from '@/api/CompanyInformationEdit'
import { globalvariable } from '@/utils/globalvariable'
import addimg from '@/assets/finance/addimg.png'
import { getStringFormat } from '@/utils/StringFormat'
export default {
  data() {
    return {
      rules: {
        Name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        Email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      cate: {},
      upsrc: [],
      data: {
        Code: '',
        ParentCode: '',
        LOGFormatUrl: '',
        Name: '',
        Stockholders: '',
        LawAgent: '',
        MastPhones: '',
        ReservePhones: '',
        Url: '',
        Address: '',
        Province: '',
        City: '',
        County: '',
        Email: '',
        Fax: '',
        Descriptions: [],
        Certificates: []
      },
      cup: false,
      urlhead: '',
      headpicture: '',
      logosuccessful: false,
      companyprofile: {
        Title: '公司简介',
        DescContent: '',
        ID: ''
      },
      team: {
        Title: '管理团队',
        DescContent: '',
        ID: ''
      },
      business: {
        Title: '业务介绍',
        DescContent: '',
        ID: ''
      },
      content: '',
      name: '',
      modules: [],
      editstate: 1,
      edittext: '编辑',
      introduceid: '',
      index: undefined
    }
  },
  methods: {
    change() {
      this.urlhead = globalvariable().imgapiurl // 图片显示域名
      this.data.Code = this.$route.query.code // 获取code
      const that = this
      API.getCompanyInformation(that.data.Code).then(res => { // 获取公司信息
        console.log(res)
        if (res.data.successful) {
          var data = res.data.Data
          if (data.LOGFormatUrl == null || data.LOGFormatUrl == '') {
            that.headpicture = addimg // logo图片
          } else {
            that.headpicture = getStringFormat(that.urlhead + data.LOGFormatUrl, [100, 100, 'm']) // 有上传logo 显示上传的
            that.data.LOGFormatUrl = getStringFormat(data.LOGFormatUrl, [100, 100, 'm']) // 赋值给要上传的logo的url
          }
          if (data.Certificates.length > 0) {
            for (let i = 0; i < data.Certificates.length; i++) { // 显示资格证
              that.upsrc.push({
                state: true, // 图片上传的状态  已上传
                FileName: '', // 图片名字 返回值是没有的 这里传空了
                url: globalvariable().imgapiurl + data.Certificates[i].RawUrl // 返回的地址 显示
              })
              that.data.Certificates.push(data.Certificates[i].ID) // 向要传的数据中传入返回的id 上传只传图片返回的id
            }
          }
          var arr = data.Descriptions // 下面的循环判断 公司介绍的显示 并赋值
          if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].Title == '公司简介') {
                that.companyprofile.DescContent = arr[i].DescContent
                that.data.Descriptions.push(arr[i].ID)
                that.companyprofile.ID = arr[i].ID
              } else if (arr[i].Title == '管理团队') {
                that.team.DescContent = arr[i].DescContent
                that.data.Descriptions.push(arr[i].ID)
                that.team.ID = arr[i].ID
              } else if (arr[i].Title == '业务介绍') {
                that.business.DescContent = arr[i].DescContent
                that.data.Descriptions.push(arr[i].ID)
                that.business.ID = arr[i].ID
              } else { // 如果有添加的模块显示这个
                that.modules.push({
                  Title: arr[i].Title,
                  ID: arr[i].ID,
                  DescContent: arr[i].DescContent
                })
              }
            }
          }
          that.data.Name = data.Name
          that.data.MastPhones = data.MastPhones
          that.data.ReservePhones = data.ReservePhones
          that.data.Url = data.Url
          that.data.Address = data.Address
          that.data.Fax = data.Fax
          that.data.Email = data.Email
          that.data.LawAgent = data.LawAgent
          that.data.Stockholders = data.Stockholders
        }
      })
    },
    save() { // 保存按钮
      if (this.modules.length > 0) {
        for (let i = 0; i < this.modules.length; i++) {
          this.data.Descriptions.push(this.modules[i].ID)
        }
      }
      console.log(this.data)
      API.modifyCompany(this.data).then(res => {
        console.log(res)
        if (res.data.successful) {
          this.$router.push({
            path: '/CompanyInformationManagement'
          })
        }
      })
    },
    gethead(e) { // 上传logo
      const _this = this
      var files = e.target.files[0]
      var Category = 'IMAGE'
      _this.cate.FileName = files.name
      _this.cate.Size = files.size
      if (!e || !window.FileReader) return // 看支持不支持FileReader
      const reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.headpicture = this.result
        const str = this.result
        _this.cate.Data = str.substring(str.indexOf(',') + 1)
        console.log(_this.cate)
        API.FileUpload(_this.cate.Data, _this.cate.FileName, Category, _this.cate.Size).then(res => {
          console.log(res)
          if (res.data.successful) {
            _this.data.LOGFormatUrl = res.data.Data.RowUrl
            _this.logosuccessful = true
            console.log(_this.data.LOGFormatUrl)
          }
        })
      }
      e.target.value = '' // 防止重复上传同一个图片不触发onloadend  这里是为了删除后可重新添加同一张  上传判断时不能用value是否存在了
    },
    deletehead() { // 删除logo
      this.headpicture = ''
      this.data.LOGFormatUrl = ''
      this.logosuccessful = false
      this.headpicture = addimg
    },
    getFile(e) { // 上传资格证图片
      const _this = this
      var files = e.target.files[0]
      var Category = 'IMAGE'
      _this.cate.FileName = files.name
      _this.cate.Size = files.size
      if (!e || !window.FileReader) return // 看支持不支持FileReader
      const reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        const str = this.result
        const obj = {}
        obj.FileName = files.name
        obj.state = false
        obj.url = this.result
        _this.upsrc.push(obj) // 显示图片的数组
        _this.cate.Data = str.substring(str.indexOf(',') + 1)
        API.FileUpload(_this.cate.Data, _this.cate.FileName, Category, _this.cate.Size).then(res => {
          console.log(res)
          if (res.data.successful) {
            _this.upsrc[_this.upsrc.length - 1].state = true // 上传成功后显示 对号
            _this.data.Certificates.push(res.data.Data.ID)
          }
        })
      }
      e.target.value = '' // 防止重复上传同一个图片不触发onloadend  这里是为了删除后可重新添加同一张  上传判断时不能用value是否存在了
    },

    deletecata(index) { // 删除证书图片
      console.log(index)
      this.upsrc.splice(index, 1)
      this.data.Certificates.splice(index, 1)
      console.log(this.data)
      console.log(this.upsrc)
    },
    compile(obj, key) { // 编辑键
      console.log(key)
      console.log(obj)
      this.cup = true
      this.index = key
      this.name = obj.Title
      this.content = obj.DescContent
      if (key !== undefined) {
        this.introduceid = obj.ID
      }
    },
    deleteintroduction(n) { // 删除添加模块
      console.log(n)
      this.modules.splice(n, 1)
    },
    confurm(title, content) { // 编辑框 确定
      console.log(title, content)
      if (title == '公司简介') {
        this.companyprofile.Title = title
        this.companyprofile.DescContent = content
        if (this.companyprofile.ID == '') { // 判断是否创建过次介绍   没创建过发送添加请求 并把id 赋给变量
          this.addDescription(title, content)
        } else { // 否则修改这个id 的介绍  发送请求
          this.modifyDescription(this.companyprofile.ID, title, content)
        }
      } else if (title == '管理团队') {
        this.team.Title = title
        this.team.DescContent = content
        if (this.team.ID == '') {
          this.addDescription(title, content)
        } else {
          this.modifyDescription(this.team.ID, title, content)
        }
      } else if (title == '业务介绍') {
        this.business.Title = title
        this.business.DescContent = content
        if (this.business.ID == '') {
          this.addDescription(title, content)
        } else {
          this.modifyDescription(this.business.ID, title, content)
        }
      } else {
        if (this.introduceid == '') {
          this.addDescription(title, content)
        } else {
          this.modifyDescription(this.introduceid, title, content)
        }
      }
      this.editstate = 1
      this.edittext = '编辑'
      this.name = ''
    },
    cancel() { // 编辑弹窗取消键
      this.cup = false
      this.editstate = 1
      this.edittext = '编辑'
      this.name = ''
    },
    addDescription(Title, Content) { // 添加请求
      const that = this
      API.addDescription(Title, Content).then(res => {
        console.log(res)
        if (res.data.successful) {
          that.cup = false
          if (Title == '公司简介') {
            that.companyprofile.ID = res.data.Data
            that.data.Descriptions.push(res.data.Data)
          } else if (Title == '管理团队') {
            that.team.ID = res.data.Data
            that.data.Descriptions.push(res.data.Data)
          } else if (Title == '业务介绍') {
            that.business.ID = res.data.Data
            that.data.Descriptions.push(res.data.Data)
          } else {
            that.modules.push({
              Title: Title,
              ID: res.data.Data,
              DescContent: Content
            })
          }
        }
      })
    },
    modifyDescription(ID, Title, Content) { // 修改请求
      console.log(Content)
      const that = this
      API.modifyDescription(ID, Title, Content).then(res => {
        console.log(res)
        if (res.data.successful) {
          that.cup = false
          if (that.index !== undefined) {
            that.modules.splice(that.index, 1, {
              Title: Title,
              ID: ID,
              DescContent: Content
            })
          }
          that.introduceid = ''
        }
      })
    },
    addmodule() {
      this.cup = true
      this.editstate = 2
      this.edittext = '添加新模块'
      this.content = ''
      console.log(this.modules)
    }

  },
  mounted() {
    this.change()
  }

}
</script>

<style lang="scss" scoped>
body ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
}
.temlateMain {
        .el-header span{
            font-size: 16px;
            color:#333;
            font-weight: bold;
        }
    .el-main{
        height: 100%;
        padding: 0 50px 0 0;
       }
    }
.head {
    position: relative;
    float: left;
    width: 17%;
    padding: 30px 50px 0 0;
    text-align: right;
    input {
        display: none;
    }
    label {
        position: absolute;
        width: 90px;
        height: 90px;
    }
    .headimg {
        width: 90px;
        height: 90px;
        border: solid 1px #ccc;
        border-radius: 4px;
    }
    .headimg:hover+.headhover{
        height: 30px;
        transition: all .5s;
        -moz-transition: all .5s; /* Firefox 4 */
        -webkit-transition: all .5s; /* Safari 和 Chrome */
        -o-transition: all .5s; /* Opera */
    }
    .headhover:hover {
        height: 30px;
        transition: all .5s;
        -moz-transition: all .5s; /* Firefox 4 */
        -webkit-transition: all .5s; /* Safari 和 Chrome */
        -o-transition: all .5s; /* Opera */
    }
    span {
        display: block;
        padding: 10px 4px 0 0;
        color: #8a8a8a;
    }
    .logo-successful {
        position: absolute;
        top: 100px;
        height: 17px;
        right: 53px;
        width: 90px;
        background: url(../../assets/finance/successful.png) no-repeat scroll right;
    }
    .headhover {
        position: absolute;
        top: 30px;
        right: 50px;
        width: 90px;
        height: 0;
        background: rgba(0,0,0,0.5);
        overflow: hidden;
        img {
            float: right;
            width: 27px;
            height: 27px;
            cursor: pointer;
    }

    }

}
.Company-box {
    float: right;
    width: 82%;
}
.headtitle {
    font-size: 16px;
}
.null-box {
    width: 10px;
    height: 10px;
}
.certificate-box>span {
    float: left;
    width: 80px;
}
.cate-box {
    float: left;
    width: calc(100% - 80px);
    margin-bottom: 100px;
}
.cate {
    float: left;
    position: relative;
    width: 161px;
    height: 103px;
    margin: 16px;
    background: url(../../assets/finance/bg.png) no-repeat;
    border: 1px solid #dedede;
    text-align: center;
    img {
       width: 80px;
       height: 101px;
    }
}
#file {
        display: none;
}
.file-label {
    float: left;
    width: 161px;
    height: 103px;
    margin: 16px;
    background: url(../../assets/finance/add_img.png) no-repeat ;
    background-size: 100% 100%;
}
.close-box {
    position: absolute;
    width: 100%;
    height: 0;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    span {
        float: left;
        width: 66%;
        line-height: 27px;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
    }
    img {
        float: right;
        width: 27px;
        height: 27px;
        cursor: pointer;
    }
}
.cate:hover .close-box{
    height: 30px;
    transition: all .5s;
    -moz-transition: all .5s; /* Firefox 4 */
    -webkit-transition: all .5s; /* Safari 和 Chrome */
    -o-transition: all .5s; /* Opera */
}
.successful {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: url(../../assets/finance/success.png) no-repeat scroll right;
}
.introduction-box {
    li {
        margin-top: 40px;
    }
}
.introduction-title {
     color: #8a8a8a;
}
.introduction-edit{
    float: right;
    color: #f99740;
    margin: 0 5px;
}
.introduction-text {
    margin-top: 10px;
    padding: 10px;
    color: #323232;
    font-size: 14px;
    border: 1px solid #dedede;
    border-radius: 4px;
    resize: none;
}
.addintroduction {
    float: right;
    line-height: 50px;
    color: #f99740;
    margin: 0 5px;
}
.edit-box {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    &>div {
        width: 500px;
        margin: 300px auto 0;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        &>div {
            margin-top: 20px;
        }
    }
    p {
        margin-top: 0;
        background: #efefef;
        line-height: 40px;
        padding-left: 20px;
        border-bottom: 1px solid #dedede;
        font-size: 16px;
    }
}
.name {
    margin-left: 20px;
    color: #8a8a8a;
}
.float-left {
    float: left;
}
#editInfomationText {
    padding: 10px;
    color: #323232;
    font-size: 14px;
    border: 1px solid #dedede;
    border-radius: 4px;
    resize: none;
}
.button-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;
    margin: 0;
    button {
        width: 70px;
        height: 30px;
        border-radius: 4px;
        border: solid 1px #ddd;
        background: #fff
    }
    button:first-child{
        color: #fff;
        background: #fba150;
    }
}
.editbut {
    float: right;
    width: 72px;
    height: 30px;
    margin: 10px;
    color: #fff !important;
    background: #f99740;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    font-weight: 400 !important;
    font-size: 14px !important;
    cursor: pointer;
}
</style>
