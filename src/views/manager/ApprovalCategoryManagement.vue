<template>
     <el-container class="temlateMain" id="report"  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <span :class="{tab_btn:true,active:taskAct=='1'}" @click="setTaskAct('1')">审批类型</span>
            <span :class="{tab_btn:true,active:taskAct=='2'}" @click="setTaskAct('2')">模板库</span>
            <div class="header-right" v-if="taskAct=='1'">
                <el-button type="warning" size="small" @click="addApprovalType=true">新建审批类型</el-button>
            </div>
        </el-header>
        <el-main class='content'>
            <el-container v-if="taskAct=='1'">
                <el-aside width="350px">
                  <div :class="{cell:true,act:tactId==k.Id}" v-for='(k,v) in listData' :key="v" @click="actId(k.Id,k.Name)">
                    {{k.Name}}
                    <span @click.stop="deleteType(k.Id)">
                      <new-icon class-name="col_icon"  icon-name="#icon-quxiao" />
                    </span>
                    <span  @click.stop="renameType(k.Id)">
                      <new-icon class-name="col_icon"  icon-name="#icon-zhongmingming16px" />
                    </span>
                  </div>
                </el-aside>
                <el-main class="tableMain">
                  <div>

                    <div class="cell" v-for='(k,v) in actListData' :key="v" >
                      <div class="left">
                        <div class="title"><b :class="getIcon(k.Name)"></b>{{k.Name}}</div>
                        <div class="type">所属类型：{{tactName}}</div>
                        <div>状态：
                          <el-button size="small" type="success" v-if="k.Enable">已启用</el-button>
                          <el-button size="small" type="danger"  v-else>停用</el-button>
                        </div>
                      </div>
                      <div class="right">
                        <b class="select-ico" @click="todotype(k.Id,k.Enable)"></b>
                        <b class="forbidden-ico" v-if="k.Enable" @click.stop="changeTemType(k.Id,k.TypeId,false)"></b>
                        <b class="use-ico" v-else  @click.stop="changeTemType(k.Id,k.TypeId,true)"></b>
                        <b class="delete-ico" @click="deleteTemType(k.Id)"></b>
                      </div>
                    </div>
                    <div class="cell toAddTemplate" @click="toAdd"></div>
                  </div>
                </el-main>
            </el-container>
             <el-container v-if="taskAct=='2'">
                <el-main class="tableMain">
               <div>
                  <div class="cell" v-for='(k,v) in Alltemplates' :key="v" >
                      <div class="left">
                        <div class="title"><b :class="getIcon(k.Name)"></b>{{k.Name}}</div>
                        <div class="type">所属类型：{{k.TypeName||'模板库'}}</div>
                        <div>状态：
                          <el-button size="small" type="success" v-if="k.Enable">已启用</el-button>
                          <el-button size="small" type="danger"  v-else>停用</el-button>
                        </div>
                      </div>
                      <div class="right">
                        <b class="select-ico" @click="todotype(k.Id,k.Enable)"></b>
                        <b></b>
                        <b class="forbidden-ico" v-if="k.Enable" @click.stop="changeTemType(k.Id,k.TypeId,false)"></b>
                        <b class="use-ico" v-else  @click.stop="changeTemType(k.Id,k.TypeId,true)"></b>
                        <!-- <b class="delete-ico" @click="deleteTemType(k.Id)"></b> -->
                      </div>
                    </div>
               </div>
                </el-main>
             </el-container>
        </el-main>

        <el-dialog
          title="新建审批类型"
          :visible.sync="addApprovalType"
          width="500px">
         <p><span style="width:50px;float:left;line-height: 36px;">名称：</span><el-input type="text" v-model="addTypeName" style="width:400px"></el-input></p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addApprovalType = false">取 消</el-button>
            <el-button type="warning" @click="doAddType">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="重命名"
          :visible.sync="renameApprovalType"
          width="500px">
         <p><span style="width:50px;float:left;line-height: 36px;">名称：</span><el-input type="text" v-model="renameTypeName" style="width:400px"></el-input></p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="renameApprovalType = false">取 消</el-button>
            <el-button type="warning" @click="doRenameType">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="添加模板"
          :visible.sync="saveTemplate"
          width="500px">
          <el-checkbox-group v-model="saveId">
            <el-checkbox :label="k.Id" :disabled="!(k.TypeId==''||k.TypeId==null)" v-for="(k,v) in Alltemplates" :key="v">

             <b :class="getIcon(k.Name)"></b><span> {{k.Name}}-{{k.TypeName||'模板库'}}</span>
            </el-checkbox>
          </el-checkbox-group>

          <span slot="footer" class="dialog-footer">
            <el-button @click="saveTemplate = false">取 消</el-button>
            <el-button type="primary" @click="doSaveTemplate">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="选择所属审批类型"
          :visible.sync="setType"
          width="300px">
           <el-radio-group v-model="setTypetypeid">
             <p v-for="(k,v) in listData" :key="v"><el-radio :label="k.Id" >{{k.Name}}</el-radio></p>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setType = false">取 消</el-button>
            <el-button type="primary" @click="dosetType">确 定</el-button>
          </span>
        </el-dialog>

     </el-container>
</template>

<script>

import { gettype } from '@/api/applyapproval'
import { addtemplate, gettemplate, deletetemplate, addApprovalType, deleteApprovalType, renameApprovalType, modifytemplate } from '@/api/manager'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      taskAct: '1',
      fullscreenLoading: false,
      listData: '',
      tactId: '',
      tactName: '',
      actListData: [],
      alllistData: [],
      theName: {
        '请假': 'Leave',
        '加班': 'Over',
        '外出': 'Out',
        '通用': 'General',
        '补卡': 'Reissue',
        '出差': 'BusinessTrip',
        '开票': 'Bill',
        '人员需求': 'EmpNeed',
        '员工转正': 'EmpPositive',
        '员工离职': 'EmpLeave',
        '报销': 'ReimBursed',
        '付款': 'Payment',
        '物品领用': 'MaterialRequisition',
        '采购': 'Purchase',
        '合同': 'ConTract'
      },
      addApprovalType: false, // 新建审批类型
      addTypeName: '',

      renameApprovalType: false, // 重命名审批类型
      renameTypeName: '',
      renameTypeId: '',

      saveTemplate: false, // 保存模板
      saveId: [],

      setType: false, // 选择所属审批类型
      setTypetypeid: '',
      setTypeId: '',
      ifEnable: '',

      Alltemplates: []
    }
  },
  mounted() {
    this.initial()
  },
  watch: {
    tactId(news) {
      const list = this.listData.filter(item => {
        return item.Id == this.tactId
      })
      this.actListData = list[0].Templates
    }
  },
  methods: {
    // 判断是否初始化
    initial() {
      this.addApprovalType = false
      this.renameApprovalType = false
      this.saveTemplate = false
      this.setType = false
      gettypeList(this)
      togetAlltemplate(this)
    },
    setTaskAct(num) {
      this.taskAct = num
    },
    actId(id, name) {
      this.tactId = id
      this.tactName = name
    },
    getIcon(name) {
      return this.theName[name]
    },
    doAddType() {
      if (this.addTypeName) {
        toAddApprovalType(this, this.addTypeName)
      }
    },
    deleteType(id) {
      const getData = this.listData.filter(ele => {
        return ele.Id == id
      })

      const Templateslength = getData[0].Templates.length
      if (Templateslength == 0) {
        this.$confirm('此操作将永久删除该审批类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          toDeleteApprovalType(this, id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$confirm('该审批类型下有审批模板，不可删除！', '', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    renameType(id) {
      this.renameTypeName = ''
      this.renameApprovalType = true
      this.renameTypeId = id
    },
    doRenameType() {
      if (this.renameTypeName) {
        toRenameApprovalType(this, this.renameTypeId, this.renameTypeName)
      }
    },
    changeTemType(Id, TypeId, type) {
      tochangeTemType(this, Id, TypeId, type)
    },
    deleteTemType(id) {
      this.$confirm('删除之后，该模板将被停用，是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        todeletetemplate(this, id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toAdd() {
      this.saveId = []
      this.saveTemplate = true
    },
    doSaveTemplate() {
      console.log(this.saveId)
      toaddtemplate(this, this.tactId, (this.saveId).toString())
    },
    todotype(Id, Enable) {
      this.setType = true
      this.setTypeId = Id
      this.ifEnable = Enable

      this.setTypetypeid = ''
    },
    dosetType() {
      console.log(
        this.setTypetypeid,
        this.setTypeId
      )
      tochangeTemType(this, this.setTypeId, this.setTypetypeid, this.ifEnable)
    }

  }
}

var gettypeList = (app) => {
  app.listData = ''
  app.fullscreenLoading = true

  gettype(getToken()).then((res) => {
    const data = res.data.Data
    // console.log(data)
    app.fullscreenLoading = false
    if (!app.tactId) {
      app.tactId = data[0].Id
      app.tactName = data[0].Name
    } else {
      const list = data.filter(item => {
        return item.Id == app.tactId
      })
      app.actListData = list[0].Templates
    }
    app.listData = data
  })
}

var toAddApprovalType = (app, name) => {
  addApprovalType(getToken(), name).then(res => {
    const data = res.data
    if (data.successful) {
      app.initial()
      app.addApprovalType = false
    }
  })
}

var toDeleteApprovalType = (app, id) => {
  deleteApprovalType(getToken(), id).then(res => {
    const data = res.data
    // console.log(data)
    if (data.successful) {
      app.initial()
    }
  })
}

var toRenameApprovalType = (app, id, name) => {
  renameApprovalType(getToken(), id, name).then(res => {
    const data = res.data
    // console.log(data)
    if (data.successful) {
      app.initial()
      app.renameApprovalType = false
    }
  })
}

var tochangeTemType = (app, id, typeid, enable) => {
  modifytemplate(getToken(), id, typeid, enable).then(res => {
    const data = res.data
    if (data.successful) {
      app.initial()
      app.setType = false
    }
  })
}

var todeletetemplate = (app, id) => {
  deletetemplate(getToken(), id).then(res => {
    const data = res.data
    if (data.successful) {
      app.initial()
    }
  })
}

var togetAlltemplate = (app, typeId) => {
  gettemplate(getToken()).then(res => {
    const data = res.data
    // console.log(data)
    if (data.successful) {
      app.Alltemplates = data.Data
    }
  })
}
var toaddtemplate = (app, typeId, ids) => {
  addtemplate(getToken(), typeId, ids).then(res => {
    const data = res.data
    if (data.successful) {
      app.saveTemplate = false
      app.initial()
    }
  })
}
</script>

<style lang="scss" scoped>
.temlateMain {
  .el-container,
  .el-main {
    height: 100%;
  }
  .el-header {
    .tab_btn {
      padding: 0 10px;
      display: inline-block;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
    }
    .tab_btn.active {
      border-bottom: 2px solid #f99740;
    }
    .header-right {
      float: right;
    }
  }
  .el-main {
    padding: 0;
    .el-aside {
      border-right: 1px solid #dedede;
      .cell{
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        &:nth-child(even){
          background: #f8f8f8;
        }

        cursor: pointer;
        .col_icon{
          font-size: 16px;
          color: #dedede;
          margin: 20px 10px 0;
          float: right;
          display: none;
          &:hover{
            color: #f99740
          }
          }
        &.act{
          background-color: #FEF4EB;
          color: #f99740;
        }
        &:hover{
          background-color: #FEF4EB;
          color: #f99740;
          .col_icon{
            display: block;
          }
        }
      }
    }
    .tableMain {
      >div{
        padding: 20px 20px 0;
      }
     .cell{
      height: 180px;
      width: 280px;
      margin-right: 20px;
      margin-bottom: 20px;
      border: 1px solid #dedede;
      border-radius: 4px;
      float: left;
      cursor: pointer;
      &:hover{
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      }
      .left{
        width: 210px;
        height: 100%;
        float: left;
        padding:16px 0 0 20px;
        font-size: 14px;

        .title{
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          b{
            height: 50px;
            width: 50px;
            display: block;
            float: left;
            margin-right: 10px;
          }
        }
        .type{
          margin: 20px 0;
        }

      }
      .right{
        width: 60px;
        height: 100%;
        float: right;
        border-left: 1px solid #dedede;
        b{
          height: 16px;
          width: 16px;
          display: block;
          margin: 20px 20px 40px;
        }
        .select-ico {
          background: url(/images/sprite.png) no-repeat 0px -287px;
        }
        .forbidden-ico {
          background: url(/images/sprite.png) no-repeat -60px -287px;
        }
        .delete-ico {
          background: url(/images/sprite.png) no-repeat -20px -287px;
        }
        .use-ico{
          background: url(/images/sprite.png) no-repeat -40px -287px;

        }
      }
      &.toAddTemplate{
        background: url(/images/AddApprovalType.png) no-repeat center
      }
     }
    }
  }
}
 .Leave {
            background: url(/images/applyList_codeIcon.png)7px 0 no-repeat;
        }

        .ReimBursed {
            background: url(/images/applyList_codeIcon.png)-41px 0 no-repeat;
        }

        .MaterialRequisition {
            background: url(/images/applyList_codeIcon.png)-90px 0 no-repeat;
        }

        .ConTract {
            background: url(/images/applyList_codeIcon.png)-134px 0 no-repeat;
        }

        .General {
            background: url(/images/applyList_codeIcon.png)-183px 0 no-repeat;
        }

        .Out {
            background: url(/images/applyList_codeIcon.png)-225px 0 no-repeat;
        }

        .BusinessTrip {
            background: url(/images/applyList_codeIcon.png)-271px 0 no-repeat;
        }

        .Over {
            background: url(/images/applyList_codeIcon.png)-315px 0 no-repeat;
        }

        .Reissue {
            background: url(/images/applyList_codeIcon.png)-362px 0 no-repeat;
        }

        .Purchase {
            background: url(/images/applyList_codeIcon.png)-409px 0 no-repeat;
        }

        .Payment {
            background: url(/images/applyList_codeIcon.png)-456px 0 no-repeat;
        }

        .Bill {
            background: url(/images/applyList_codeIcon.png)-501px 0 no-repeat;
        }

        .EmpNeed {
            background: url(/images/applyList_codeIcon.png)-548px 0 no-repeat;
        }

        .EmpPositive {
            background: url(/images/applyList_codeIcon.png)-595px 0 no-repeat;
        }

        .EmpLeave {
            background: url(/images/applyList_codeIcon.png)-643px 0 no-repeat;
        }

        .MaterialRequisition {
            background: url(/images/applyList_codeIcon.png)-685px 0 no-repeat;
        }

.el-checkbox-group{
  .el-checkbox{
    width: 150px;
    line-height: 50px;
    margin-left: 45px;
    b{
      height: 50px;
      width: 50px;
      display: block;
      float: left;
    }

  }
}
.el-radio-group{
  p{
    line-height: 48px;
  }
}
.el-dialog__body{
  padding: 30px 20px 0;
}
</style>

