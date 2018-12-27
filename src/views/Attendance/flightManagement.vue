<template>
<el-container class="temlateMain">
        <el-header height="50px">
            <span>班次管理</span>
            <div class="search">
                <el-button  type="warning" @click="add">新建</el-button>
            </div>
            <div class="search">
                <el-input
                    placeholder="请输入班次名称"
                    suffix-icon="el-icon-search"
                    v-model="searchStr"
                    @blur="toSearch">
                </el-input>
            </div>
        </el-header>
        <el-main>
            <table>
                <tr>
                    <th>班次名称</th>
                    <th>考勤时间</th>
                    <th>使用中的考勤组</th>
                    <th>最后操作时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item, key) in list" :key="key">
                    <td>{{item.Name}}</td>
                    <td>{{item.RuleTimeStr}}</td>
                    <td>{{setclass(item.GroupNameList)}}</td>
                    <td>{{item.UpdateTime}}</td>
                    <td>
                        <span @click="edit(item.RuleId)">编辑</span>
                        <span @click="copy(item)">复制</span>
                        <span @click="deletelist(item)">删除</span>
                    </td>
                </tr>
            </table>
        </el-main>
    </el-container>
</template>

<script>
import * as API from '@/api/flightManagement'
import clip from '@/utils/clipboard'
export default {
  data() {
    return {
      searchStr: '',
      list: []
    }
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      API.GetAtdRuleList(this.searchStr).then(res => {
        console.log(res)
        if (res.data.Successful) {
          this.list = res.data.Data
        }
      })
    },
    toSearch() {
      this.change()
    },
    add() {
      this.$router.push({
        path: '/Attendance/addflightManagement',
        query: {
        }
      })
    },
    edit(id) {
      this.$router.push({
        path: '/Attendance/addflightManagement',
        query: {
          RuleId: id
        }
      })
    },
    copy(data) {
      console.log(data)
      const team = data.GroupNameList.length > 0 ? data.GroupNameList.join(',') : '无'
      const content = '班次名称：' + data.Name + ',考勤时间：' + data.RuleTimeStr + ',考勤班组：' + team + ',操作时间：' + data.UpdateTime
      clip(content, event)
    },
    deletelist(data) {
      if (data.GroupNameList.length < 1) {
        API.DeleteAtdRule(data.RuleId).then(res => {
          console.log(res)
          if (res.data.Successful) {
            this.change()
          }
        })
      } else {
        this.$alert('班次有使用的考勤组时无法删除', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    setclass(arr) {
      if (arr.length < 1) {
        return '无'
      } else if (arr.length > 3) {
        return arr.slice(0, 3).join(',') + '...'
      } else {
        return arr.join(',')
      }
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
