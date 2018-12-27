<template>
<el-container class="temlateMain">
        <el-header height="50px">
            <span>排班管理</span>
            <div class="search">
                <el-button  type="warning" @click="add">新建</el-button>
            </div>
            <div class="search">
                <el-input
                    placeholder="请输入排班名称"
                    suffix-icon="el-icon-search"
                    v-model="searchStr"
                    @blur="toSearch">
                </el-input>
            </div>
        </el-header>
        <el-main>
           <table>
                <tr>
                    <th>考勤组</th>
                    <th>考勤组成员</th>
                    <th>包含班次</th>
                    <th>最后操作时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item, key) in list" :key="key">
                    <td>{{item.GroupName}}</td>
                    <td>{{setclass(item.DeptList)}}</td>
                    <td>{{setclass(item.AtdRuleList)}}</td>
                    <td>{{item.ModifiedTime}}</td>
                    <td>
                        <span @click="editscheduling(item.AtdSchedulingId)">编辑</span>
                        <span @click="detailcheduling(item.AtdSchedulingId)">排班明细</span>
                        <span @click="deletescheduling(item.AtdSchedulingId)">删除</span>
                    </td>
                </tr>
            </table>
        </el-main>
        <el-footer  height="50px">
                     <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="pageIndex"
                            :page-sizes="[20,30, 40, 50]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount">
                    </el-pagination>
                </el-footer>
    </el-container>
</template>

<script>
import * as API from '@/api/workforcemanagement'
export default {
  data() {
    return {
      searchStr: '',
      pageIndex: 1,
      pageSize: 20,
      totalCount: 1,
      list: []
    }
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      API.GetAtdSchedulingList(this.pageIndex, this.pageSize, this.searchStr).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.totalCount = res.data.Data.TotalCount
          this.list = res.data.Data.AtdSchedulingList
        }
      })
    },
    toSearch() {
      this.change()
    },
    add() {
      this.$router.push({
        path: '/Attendance/NewAttendance',
        query: {
        }
      })
    },
    editscheduling(id) {
      this.$router.push({
        path: '/Attendance/NewAttendance',
        query: {
          id: id
        }
      })
    },
    detailcheduling(id) {
      this.$router.push({
        path: '/Attendance/batchscheduling',
        query: {
          id: id
        }
      })
    },
    deletescheduling(id) {
      this.$confirm('删除后考规则将在次日生效，是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.DeleteAtdScheduling(id).then(res => {
          console.log(res)
          if (res.data.Successful) {
            this.change()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setclass(arr) {
      if (arr.length < 1) {
        return '无'
      } else if (arr.length > 3) {
        return arr.slice(0, 3).join(',') + '...'
      } else {
        return arr.join(',')
      }
    },
    handleSizeChange(val) {
      // /更改显示条数
      this.pageSize = val
      this.index = 1

      this.change()
    },
    handleCurrentChange(val) {
      // /翻页
      this.pageIndex = val
      this.change()
    }

  }
}
</script>

<style scoped lang="scss">
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
             font-weight: normal;
             font-size: 16px;
             span{
               margin-right: 10px;
               cursor: pointer;
             }
            .active{
                color: #e6a23c
            }
          }

       }
   }
    table {
       width: 100%;
       text-align: center;
       tr {
           line-height: 60px;
       }
       td:last-child {
           width: 360px;
           span {
               float: left;
               width: 70px;
               margin-left: 38px;
               line-height: 30px;
               border-radius: 4px;
               color: #fff;
               background: #e6a23c;
               text-align: center;
               cursor: pointer;
           }
       }
   }

}
.search {
    float: right;
    margin-right: 15px;
}
</style>
