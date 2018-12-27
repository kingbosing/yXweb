<template>
    <el-container id="operationLogIndex" class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="loadIcon" v-cloak>
        <el-header height="50px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>操作日志</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
           <el-container>
               <el-header  height="60px" style="padding-top:15px;">
                       <el-form :model="form" :rules="rules" ref="ruleForm" label-width="60px" label-position="demo-ruleForm">
                            <el-row class="col" style="border-bottom: transparent;">
                                <div>
                                    <el-col :span="6">
                                        <el-form-item label="修改项:" prop="name">
                                            <el-select v-model="form.name" placeholder="请选择修改项" v-on:change="selChange()">
                                                <el-option label="难易度" value="难易度"></el-option>
                                                <el-option label="工作项类别" value="工作项类别"></el-option>
                                                <el-option label="岗位工作类别" value="岗位工作类别"></el-option>
                                                <el-option label="工作内容" value="工作内容"></el-option>
                                                <el-option label="新建任务" value="新建任务"></el-option>
                                                <el-option label="编辑任务" value="编辑任务"></el-option>
                                                <el-option label="审核任务" value="审核任务"></el-option>
                                                <el-option label="进度调整" value="进度调整"></el-option>
                                                <el-option label="添加事件" value="添加事件"></el-option>
                                                <el-option label="事件状态" value="事件状态"></el-option>
                                                <el-option label="参与任务" value="参与任务"></el-option>
                                                <el-option label="客户管理" value="客户管理"></el-option>
                                                <el-option label="客户跟进" value="客户跟进"></el-option>
                                                <el-option label="科目管理" value="科目管理"></el-option>
                                                <el-option label="科目参数设置" value="科目参数设置"></el-option>
                                                <el-option label="财务期初设置" value="财务期初设置"></el-option>
                                                <el-option label="登记会计凭证" value="登记会计凭证"></el-option>
                                                <el-option label="会计凭证管理" value="会计凭证管理"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="ID:" prop="describe">
                                            <el-input v-model="form.describe" v-on:keyup.native="DelK()" placeholder="请输入ID"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="操作员:" prop="state">
                                            <el-input v-model="form.state" v-on:keyup.native="DelE()" placeholder="请输入操作员"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">

                                    </el-col>
                                </div>
                            </el-row>
                        </el-form>
              </el-header>
              <el-main>
               <el-table :data="listData" height="100%"  style="width: 100%">
                <el-table-column prop="No" label="日志编号"></el-table-column>
                <el-table-column prop="EditItem" label="修改项"></el-table-column>
                <el-table-column prop="ID" label="ID"></el-table-column>
                <el-table-column prop="EditTime" label="修改时间"></el-table-column>
                <el-table-column prop="Man" label="修改人"></el-table-column>
                <el-table-column prop="Expansion" label="扩展字段"></el-table-column>
                <el-table-column prop="Module" label="所属模块"></el-table-column>
              </el-table>
              </el-main>
           </el-container>
        </el-main>
        <el-footer  height="50px">
                    <el-pagination v-on:size-change="handleSizeChange"
                                   v-on:current-change="handleCurrentChange"
                                   :current-page="index"
                                   :page-sizes="[25,50, 100, 150]"
                                   :page-size="size"
                                   layout="sizes, prev, pager, next,jumper,total"
                                   :total="totalCount">
                    </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
import { GetoPerationLog } from '@/api/manager'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      listData: [], // 列表数据
      fullscreenLoading: true, // 加载效果状态值
      totalCount: 0, // 总条数

      index: 1, // 当前页
      size: 25, // 每页数
      editItem: '',
      id: '',
      man: '',
      // 弹窗表
      dialogFormVisible: false,
      operation: false,
      formLabelWidth: '100',
      form: {
        name: '',
        describe: '',
        state: ''
      },
      rules: {

      }
    }
  },
  mounted() {
    GetList(this.size, 1, '', '', '', this)
  },
  methods: {
    handleSizeChange(val) {
      // /更改显示条数
      // console.log(`每页 ${val} 条`);
      this.size = val
      this.index = 1
      GetList(this.size, this.index, this.editItem, this.id, this.man, this)
    },

    handleCurrentChange(val) {
      // /翻页
      // console.log(`当前页: ${val}`);

      this.index = val
      GetList(this.size, this.index, this.editItem, this.id, this.man, this)
    },
    refresh: function() {
      // 刷新
      // GetList(this.size, 1, this.editItem, this.id, this.man);
    },
    DelK: function() {
      this.form.describe = (this.form.describe).trim()
      if (this.form.describe != '') {
        this.id = this.form.describe
        GetList(this.size, 1, this.editItem, this.id, this.man, this)
      }
    },
    DelE: function() {
      this.form.state = (this.form.state).trim()
      if (this.form.state != '') {
        this.man = this.form.state
        GetList(this.size, 1, this.editItem, this.id, this.man, this)
      }
    },
    selChange: function() {
      this.editItem = this.form.name
      GetList(this.size, 1, this.editItem, this.id, this.man, this)
    }

  }
}

// 列表数据
function GetList(size, index, editItem, id, man, that) {
  console.log(size, index, editItem, id, man)
  that.listData = []
  that.fullscreenLoading = true
  return new Promise((resolve, reject) => {
    GetoPerationLog(getToken(), size, index, editItem, id, man)
      .then(response => {
        console.log('///')
        console.log(response.data.Data)
        if (response.data.Successful) {
          that.fullscreenLoading = false
          that.listData = response.data.Data.Records
          that.totalCount = response.data.Data.TotalCount
          resolve()
        }
      })
      .catch(error => {
        reject(error)
      })
  })
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
            //padding: 20px;
         }
    }
  }

}
</style>
<style>
 #operationLogIndex .el-form-item.el-form-item--medium{
      margin-bottom: 0;
  }
  #operationLogIndex .el-table .cell{
           text-align: center;
      }
    #operationLogIndex  .el-table th{
          background-color: #f8f8f8;
          font-weight: normal;
          color:#333;
      }
      #operationLogIndex  .el-table tr{
          cursor: pointer;
      }
      #operationLogIndex label{
          font-weight: normal;
      }
</style>

