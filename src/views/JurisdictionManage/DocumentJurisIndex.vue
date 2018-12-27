<template>
    <el-container class="temlateMain">
        <el-header height="50px">
            <span>权限管理</span>
        </el-header>
        <div class="content-box">
            <div>
                <span>部门</span>
                <el-tree class="people" :highlight-current="true" :default-expand-all="true" :data="data" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false"></el-tree>
            </div>
            <div class="position">
                <span>姓名</span>
                <span class="positionhead">职位</span>
                <div class="people">
                    <table >
                        <tr v-for="(item,key) in list" :key="key" @click="jurisdiction(item.RoleType,item.ProfileId,item.DepartmentId,key)" :class="{'pitchon':clicked== key}">
                            <td class="firsttd">{{item.name}}</td>
                            <td>{{item.JobName}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div>
                <span>权限</span>
                <button v-if="savebutton" @click="save" class="save">保存</button>
                <div class="people">
                     <el-tree
                     ref="tree"
                    :data="data1"
                    :empty-text= "''"
                    show-checkbox
                    :props="defaultProps1"
                    :default-expand-all="true"
                    :check-strictly="true"
                    node-key="Id"
                    :default-checked-keys="keylist">
                    </el-tree>
                </div>
            </div>
        </div>

    </el-container>
</template>

<script>
import * as API from '@/api/JurisdictionManage'
export default {
  data() {
    return {
      data: [], // 部门树形数据
      data1: [], // 权限树形数据
      defaultProps: { // 部门对应插件设置
        label: 'Name',
        children: 'Childrens'
      },
      defaultProps1: { // 权限对应插件设置
        label: 'Name',
        children: 'FuncList'
      },
      list: [], // 员工数组
      keylist: [], // 获取到返回的已选中的权限集合
      staffId: '', // 员工id
      sectionId: '', // 部门id
      clicked: null,
      selfRoleType: null, // 自己的权限数
      savebutton: false
    }
  },
  methods: {
    change() {
      this.data = JSON.parse(sessionStorage.getItem('departmentsList'))
      console.log(sessionStorage.getItem('MyProfileId'))
      var id = sessionStorage.getItem('MyProfileId')
      API.detail(id).then(res => {
        console.log(res)
        if (res.data.successful) {
          this.selfRoleType = res.data.Data.Role
          console.log(this.selfRoleType)
        }
      })
    },
    handleNodeClick(val) { // 获取部门员工
      const that = this
      that.savebutton = false
      that.data1 = []
      that.clicked = null
      var id = val.ItemId
      API.employee4PC(id).then(res => {
        console.log(res)
        var data = res.data.Data
        that.list = []
        for (let i = 0; i < data.length; i++) {
          that.list.push({
            name: data[i].EmployeeName,
            JobName: data[i].Jobs[0].JobName,
            ProfileId: data[i].ProfileId,
            DepartmentId: data[i].DepartmentId,
            RoleType: data[i].RoleType
          })
        }
        console.log(that.list)
      })
    },
    jurisdiction(RoleType, ProfileId, DepartmentId, key) { // 获取员工权限
      // 判断权限
      if (this.selfRoleType > RoleType) {
        this.clicked = key
        this.data1 = []
        this.keylist = []
        this.staffId = ProfileId
        this.sectionId = DepartmentId
        console.log(ProfileId, DepartmentId)
        const that = this
        API.getfunc2(ProfileId, DepartmentId).then(res => {
          console.log(res)
          if (res.data.successful) {
            var arr = res.data.Data
            for (let i = 0; i < arr.length; i++) {
              arr[i].Id = arr[i].ID
              if (arr[i].Enable == true) {
                that.keylist.push(arr[i].Id)
              }
              if (arr[i].FuncList.length > 0) {
                for (let j = 0; j < arr[i].FuncList.length; j++) {
                  if (arr[i].FuncList[j].Enable == true) {
                    that.keylist.push(arr[i].FuncList[j].Id)
                  }
                }
              }
            }
            that.data1 = arr
            that.savebutton = true
          }
        })
      } else {
        this.$message({
          message: '你当前没有权限这样做'
        })
      }
    },

    save() { // 保存更改权限
      console.log(this.$refs.tree.getCheckedKeys())
      var FunctionModuleIds = this.$refs.tree.getCheckedKeys()
      var ProfileId = this.staffId
      var DepartmentId = this.sectionId
      API.attachFuncsToEmpolyee(ProfileId, DepartmentId, FunctionModuleIds).then(res => {
        console.log(res)
        if (res.data.successful) {
          this.$message({
            message: '成功更改权限',
            type: 'success'
          })
        } else {
          this.$message({
            message: '更改失败'
          })
        }
      })
    }

  },
  mounted() {
    this.change()
  }

}
</script>

<style lang="scss">
    .content-box{
        .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
            color: #f99740;
            background: #FEF4EC;
        }
        .el-tree-node__content{
            height: 36px
            ;
        }
}

</style>

<style scoped lang="scss">
    .content-box{
        display: flex;
        height: 84vh;
        overflow: hidden;
        &>div {
            position: relative;
            flex: 1;
            padding-top: 36px;
            border-right: solid #dedede 1px;
            &>span {
                position:absolute;
                top: 0;
                padding: 10px 20px;
            }
        }
        .position {
            table {
                width: 100%;
            }
            tr {
                cursor: pointer;
            }
            td {
                padding: 10px 20px;
            }
            .firsttd {
                width: 45%;
            }
        }

        .positionhead {
            padding: 10px 0 ;
            left: calc(15px + 45%);
        }
    }
    .people {
            height: 79.5vh;
            overflow: auto;
    }
    .save {
        position: absolute;
        right: 30px;
        top: 5px;
        width: 80px;
        line-height: 30px;
        background: #fff;
        border-radius: 4px;
        border: #ccc 1px solid;
        z-index: 2;
        cursor: pointer;
    }
    .pitchon {
        color: #f99740;
        background: #FEF4EC;
    }
</style>

