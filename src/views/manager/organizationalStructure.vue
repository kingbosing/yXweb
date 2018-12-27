<template>
    <el-container id="organizationalStructure" class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon" v-cloak>
         <el-header height="50px">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
          <el-container>
              <el-header height="50px">
                  单元
              </el-header>
              <el-main>
                  <!--<el-tree :data="listData" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick" :props="defaultProps">
                    <span class="custom-tree-node" slot-scope="{ node, data }" style="width:100%;line-height:28px;">
                      <span>{{ node.label }}</span>
                      <span style="float:right;margin-right:20px;dispaly:inline-block;width:93px;">
                          <span  @click="() => AddFun(1)"><new-icon class="file_col_icon"  :icon-name="'#icon-tianjia'"/></span>
                          <span v-if="node.disabled!=''" @click="() => centerDialogVisible_1=true"><new-icon class="file_col_icon"  :icon-name="'#icon-shanchu1'"/></span>
                          <span  @click="() => AddFun(2)" v-if="node.disabled!=''"><new-icon class="file_col_icon"  :icon-name="'#icon-zhongmingming16px'"/></span>
                      </span>
                    </span>
                  </el-tree>-->
                  <tree-grid :columns="columns" @removeBtn="removeBtn" @AddFun="AddFun" :tree-structure="true" :data-source="listData" :defaultExpandAll="defaultExpandAll"  treeType="unnormal"></tree-grid>
              </el-main>
          </el-container>
        </el-main>
        <!--弹窗-->
           <!--添加弹窗-->
              <el-dialog :visible.sync="centerDialogVisible_2" width="50%" center>
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                       <el-form-item label="上级单元" prop="upperUnit">
                         <span class="btnA" @click="MangeShow=true">{{ruleForm.upperUnit}}</span>
                       </el-form-item>
                       <el-form-item label="单元名称" prop="unitName">
                         <el-input v-model="ruleForm.unitName" placeholder="请输入单元名称" :maxlength="20"></el-input>
                       </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" style="margin-right:100px" v-on:click="submitForm('ruleForm')">确 定</el-button>
                     <el-button @click="centerDialogVisible_2 = false">取 消</el-button>
                  </span>
              </el-dialog>
           <!--删除弹窗-->
              <el-dialog :visible.sync="centerDialogVisible_1" width="30%" center>
                  <span style="display:block;text-align: center;">是否确定删除该单元？</span>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" @click="centerDialogVisible_1 = false" style="margin-right:100px" v-on:click="remove()">确 定</el-button>
                     <el-button @click="centerDialogVisible_1 = false">取 消</el-button>
                  </span>
              </el-dialog>
           <!--宣部门弹窗-->
           <get-depeople :visible.sync="MangeShow" :actlist="MangeAct_List" title="选择部门" :people="false" :checkbox="false" v-on:act-node="MangeActNode">
         </get-depeople>
        <!--****************************-->
    </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
import store from '@/store'
import TreeGrid from './component/treegrid'
import * as manager from '@/api/manager'
import getDepeople from '../../components/dialogDep/src/component'
import { globalvariable } from '@/utils/globalvariable'
import urlUtil from '@/utils/urlUtil'
export default {
  components: {
    getDepeople,
    TreeGrid
  },
  data() {
    return {
      id: 1000,
      fullscreenLoading: true, // 加载效果状态值
      listData: [], // 列表数据
      centerDialogVisible_1: false,
      centerDialogVisible_2: false,
      defaultProps: {
        children: 'Childrens',
        label: 'Name',
        disabled: 'ItemId'
      },
      ruleForm: {
        upperUnit: '',
        unitName: '',
        ParentID: '',
        DepartmentId: '',
        Ranks: 0
      },
      rules: {
        unitName: [
          { required: true, message: '请输入单元名称', trigger: 'blur' }
        ]
      },
      MangeShow: false,
      MangeAct_List: [], // 默认选中id集合
      MangeList: [], // 选中列表
      operationData: [], // 选中数据
      typeNum: 1, // 1添加2编辑
      model: {}, // 上传数据
      columns: [
        {
          text: '科目编号',
          dataIndex: 'Name'
        }
      ],
      dataSource: [],
      defaultExpandAll: true // 是否折叠树
    }
  },
  mounted() {
    // 获取架构数据
    this.initial()
  },
  watch: {

  },
  methods: {
    // 获取架构数据
    initial() {
      console.log('121212')
      this.fullscreenLoading = true
      setTimeout(() => {
        if (this.$store.state.user.departmentData.length == 0) {
          this.initial()
        } else {
          this.listData = JSON.parse(this.$store.state.user.departmentData)
          this.fullscreenLoading = false
          // this.listData.forEach(item => {
          //   item.ChildList = item.Childrens
          // })
        }
      }, 1000)
    },
    // 选部门弹窗
    MangeActNode(data) {
      console.log(data)
      if (this.typeNum == 1) {
        this.ruleForm.upperUnit = data[0].Name
        this.ruleForm.ParentID = data[0].DeptId
        this.ruleForm.Ranks = data[0].NodeLevel
        this.ruleForm.DepartmentId = data[0].ItemId
      } else if (this.typeNum == 2) {
        this.ruleForm.upperUnit = data[0].Name
        this.ruleForm.ParentID = data[0].ItemId
        this.ruleForm.Ranks = data[0].NodeLevel + 1
        // this.ruleForm.DepartmentId = data[0].ItemId
      }
      // this.operationData = data[0]
      console.log(this.ruleForm)
    },
    // 确定添加或编辑
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.typeNum == 1) {
            this.model = {
              'ParentID': this.ruleForm.DepartmentId,
              'Title': this.ruleForm.unitName,
              'Ranks': this.ruleForm.Ranks + 1
            }
            this.AddDepartment()
          } else if (this.typeNum == 2) {
            this.model = {
              'ParentId': this.ruleForm.ParentID,
              'DepartmentId': this.ruleForm.DepartmentId,
              'Title': this.ruleForm.unitName,
              'Ranks': this.ruleForm.Ranks
            }
            this.EditDepartment()
          }
          console.log(this.model)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 添加
    AddDepartment() {
      const that = this
      return new Promise((resolve, reject) => {
        manager.AddDepartment(getToken(), that.model)
          .then(response => {
            console.log(response.data)
            that.centerDialogVisible_2 = false
            if (response.data.successful) {
              that.$message({
                message: '添加成功',
                type: 'success',
                onClose: function() {
                  // 公司部门及员工树
                  store.dispatch('GetCompanyAllTree').then(() => {
                    that.initial()
                  })
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
    // 编辑
    EditDepartment() {
      const that = this
      return new Promise((resolve, reject) => {
        manager.EditDepartment(getToken(), that.model)
          .then(response => {
            console.log(response.data)
            that.centerDialogVisible_2 = false
            if (response.data.successful) {
              that.$message({
                message: '编辑成功',
                type: 'success',
                onClose: function() {
                  // 公司部门及员工树
                  store.dispatch('GetCompanyAllTree').then(() => {
                    that.initial()
                  })
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
    // 添加或编辑 // 1添加2编辑
    AddFun(data, num) {
      console.log(data, num)
      this.centerDialogVisible_2 = true
      this.typeNum = num
      this.handleNodeClick(data)
    },
    // 删除
    remove() {
      console.log(this.operationData.ItemId)
      const that = this
      return new Promise((resolve, reject) => {
        manager.DelDepartment(getToken(), that.operationData.ItemId)
          .then(response => {
            console.log(response.data)
            if (response.data.successful) {
              that.$message({
                message: '删除成功',
                type: 'success',
                onClose: function() {
                  // 公司部门及员工树
                  store.dispatch('GetCompanyAllTree').then(() => {
                    that.initial()
                  })
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
      // this.centerDialogVisible_1 = true
    },
    // 删除弹窗触发
    removeBtn(data) {
      console.log(data)
      this.operationData = data
      this.centerDialogVisible_1 = true
    },
    // 获取点击数据
    handleNodeClick(data) {
      console.log(data)
      this.operationData = data
      this.ruleForm.upperUnit = ''
      this.ruleForm.unitName = ''
      if (this.typeNum == 1) {
        this.ruleForm.upperUnit = this.operationData.Name
        this.ruleForm.ParentID = this.operationData.DeptId
        this.ruleForm.DepartmentId = this.operationData.ItemId
        this.ruleForm.Ranks = this.operationData.NodeLevel
      } else if (this.typeNum == 2) {
        this.ruleForm.upperUnit = this.operationData.DeptName
        this.ruleForm.unitName = this.operationData.Name
        this.ruleForm.ParentID = this.operationData.DeptId
        this.ruleForm.DepartmentId = this.operationData.ItemId
        this.ruleForm.Ranks = this.operationData.NodeLevel
      }
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
            border-bottom: none;
            font-size: 16px;
            background-color: #f8f8f8;
         }
         .el-main{
             .companyName{
                 height:28px;
                 padding-left: 10px;
                 line-height: 28px;
                 color:#606266;
                 cursor: pointer;
                 .file_col_icon{
                     float: right;
                     margin-top: 6px;
                     margin-right: 83px;
                 }
             }
             .companyName:hover{
                  .file_col_icon{
                      display: inline-block;
                  }
             }
             .el-tree-node__content:hover{
                .file_col_icon{
                    display: inline-block;
                }
             }
.file_col_icon{
    font-size: 16px;
    color:#8a8a8a;
    margin-left: 15px;
     display: none;
}
         }

    }
  }

}
.btnA{
    height: 40px;padding:0 15px;border:1px solid #dcdfe6;width:100%;display: inline-block;border-radius: 4px;
    color:#606266;
    cursor: pointer;
}
</style>
<style>
#organizationalStructure .el-dialog__wrapper.getPeopleOrDep{
  z-index: 3003!important;
}
#organizationalStructure .el-dialog__wrapper{
   z-index: 3002!important;
}
</style>

