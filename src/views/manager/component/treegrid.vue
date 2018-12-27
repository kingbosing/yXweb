<template>
  <div class="treegrid">
    <!--<i v-show="treeStructure" :class="toggleAllflag?'isDefaultExpandAll_T':'isDefaultExpandAll_F'" v-on:click="handleChangeExpandStatus"></i>-->
    <el-table :data="data"  :show-header='false' :max-height="defaultmaxheight" style="width: 100%" :row-style="showTr"  stripe :show-summary="showSummary" :summary-method="getSummaries"><!--:show-summary="showSummary"-->
      <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" header-align="center">
        <!-- <el-table-column v-if="column.hasOwnProperty('Childrens')" v-for="(c_column,v) in column.Childrens" :key="v"
            :label="c_column.text">
              <template  slot-scope="scope">
                   <span :style="scope.row._parent?'color:#8a8a8a':'color:#333'" v-if="IsEditor(c_column.isEdit)"><el-input v-model="scope.row[c_column.dataIndex]"  @blur="SaveEarly(scope.row[column.dataIndex],c_column.typevalue)"></el-input></span>
                <span v-else :style="scope.row._parent?'color:#8a8a8a':'color:#333'">{{scope.row[c_column.dataIndex]}}</span>
             </template>
          </el-table-column> -->

          <template slot-scope="scope">
            <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in  scope.row._level" class="ms-tree-space"
              :key="levelIndex"></span>
            <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index, scope.row)" @click="toggle( scope.$index)">
              <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
              <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
            </button>
            <span v-else-if="index===0" class="ms-tree-space"></span>
              <!-- <span :style="scope.row._parent?'color:#8a8a8a':'color:#333'" v-if="IsEditor(column.isEdit)"><el-input v-model="scope.row[column.dataIndex]" @blur="SaveEarly(scope.row.ID,scope.row[column.dataIndex],column.typevalue)"></el-input></span> -->
                <span  :style="scope.row._parent?'color:#8a8a8a':'color:#333'">{{scope.row[column.dataIndex]}}</span>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template  slot-scope="scope">
          <!-- <el-button type="text" v-show="scope.row.SubjectLevel < defaultMaxLevel" @click="handleAdd(scope.row.Id)"><i class="el-icon-create el-icon--left" ></i>新增</el-button>
          <el-button type="text" v-show=" scope.row.SubjectLevel !=1" v-if="scope.row.Statuskey" @click="handleChangeStatus(scope.row.Id,false)"><i class="el-icon-disable el-icon--left"></i>禁用</el-button>
           <el-button type="text" v-show=" scope.row.SubjectLevel !=1" v-else  @click="handleChangeStatus(scope.row.Id,true)"><i class="el-icon-undisable el-icon--left"></i>启用</el-button>
          <el-button type="text" @click="handleEdit(scope.row)" v-show=" scope.row.SubjectLevel !=1"> <i class="el-icon-edit el-icon--left"></i>编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.Id)" v-show=" scope.row.SubjectLevel !=1"><i class="el-icon-delete el-icon--left"></i>删除</el-button>-->
          <span @click="AddBtn(scope.row,1)"><new-icon class="file_col_icon"  :icon-name="'#icon-tianjia'"/></span>
          <span @click="DeleteBtn(scope.row)"><new-icon v-if="scope.row.ItemId!=''" class="file_col_icon"  :icon-name="'#icon-shanchu1'"/></span>
          <span @click="AddBtn(scope.row,2)"><new-icon v-if="scope.row.ItemId!=''" class="file_col_icon"  :icon-name="'#icon-zhongmingming16px'"/></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import DataTransfer from '@/utils/dataTranslate.js'
//  import Vue from 'vue'
export default {
  // name: 'tree-grid',
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    EditorStructure: {// 是否可编辑
      type: Boolean,
      default: function() {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: function() {
        return ''
      }
    },
    // 这个是是否展示操作列
    treeType: {
      type: String,
      default: function() {
        return 'normal'
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    showSummary: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    defaultMaxLevel: {
      type: Number,
      default: function() {
        return 4
      }
    },
    defaultmaxheight: {
      type: Number,
      default: function() {
        return 738
      }
    }
  },
  data() {
    return {
      flag: false,
      toggleAllflag: this.defaultExpandAll
    }
  },
  computed: {
    // 格式化数据源
    data: function() {
      const me = this
      if (me.treeStructure) {
        const data = DataTransfer.treeToArrayforChildrens(
          me.dataSource,
          null,
          null,
          me.defaultExpandAll
        )
        console.log(data, 1233)
        return data
      }
      return me.dataSource
    }
  },
  methods: {
    /** ************************************ */
    // 添加
    AddBtn(row, num) {
      this.$emit('AddFun', row, num)
    },
    // 删除
    DeleteBtn(row) {
      console.log(row)
      this.$emit('removeBtn', row)
    },
    // 编辑
    /** ************************************ */
    IsEditor(flag) {
      // console.log(this.EditorStructure && flag)
      return this.EditorStructure && flag
    },
    SaveEarly(id, val, title) {
      // console.log(id,val,title)
      const Early = {
        ID: id,
        Type: title,
        Value: val
      }
      this.$emit('Child_MethodSaveEarly', Early)
    },
    // 显示行
    showTr: function(row, index) {
      const show = row.row._parent ? row.row._parent._expanded && row.row._parent._show : true
      row.row._show = show
      return show ? '' : 'display:none;'
    },
    // chi(i) {
    //   let a = 0
    //   console.log(a++)
    //   return i
    // },
    // 展开下级
    toggle: function(trIndex) {
      const me = this
      const record = me.data[trIndex]
      record._expanded = !record._expanded
      // this.showTr(record, trIndex)
    },
    // 展开全部
    toggleAll: function() {
      this.data.forEach(element => {
        element._expanded = !element._expanded
      })
      this.toggleAllflag = !this.toggleAllflag
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      const me = this
      if (me.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      const me = this
      if (
        me.treeStructure &&
          index === 0 &&
          record.Childrens &&
          record.Childrens.length > 0
      ) {
        return true
      }
      return false
    },
    handleDelete(id) { // 删除
      this.$emit('Child_MethodDelete', id)
    },
    handleAdd(id) { // 新增
      // console.log(id)
      this.$emit('Child_MethodAdd', id)
    },
    handleEdit(row) { // 编辑
      this.$emit('Child_MethodEdit', row)
    },
    handleChangeStatus(id, type) { // 启用停用
      const model = {
        pid: id,
        type
      }
      this.$emit('Child_MethodChangeStatus', model)
    },
    getSummaries(param) {
      console.log(param)
      // this.$emit('Child_getSummaries', param)
      const { columns, data } = param
      const sums = []
      const labelArr = ['SubjectCode', 'SubjectName', 'InitialDebitBalance', 'InitialCreditBalance', 'PeriodDebitMoney', 'PeriodCreditMoney', 'TerminalDebitMoney', 'TerminalCreditMoney']
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index === 1) {
          sums[index] = ''
          return
        }
        // console.log(labelArr[index])
        const values = data.map(item => Number(item[labelArr[index]]))
        // console.log(values)
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          // sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    handleChangeExpandStatus() {
      this.toggleAll()
    }
  }
}
</script>
<style scoped>
.file_col_icon{
    font-size: 16px;
    color:#8a8a8a;
    margin-left: 15px;
     display: none;
}
.el-table td, .el-table th.is-leaf{
  border:none
}
.isDefaultExpandAll_T{
     width: 20px;
    background: url(/img/sprite.8b0a4f58.png) 0px -185px no-repeat;
    height: 20px;
    z-index: 999;
    display: block;
    position: absolute;
}
.isDefaultExpandAll_F{
    width: 20px;
    background: url(/img/sprite.8b0a4f58.png) -30px -185px no-repeat;
    height: 20px;
    z-index: 999;
    display: block;
    position: absolute;
}
.el-icon--left{
 width: 16px;
    height: 16px;
     vertical-align: text-top;
}
.el-icon-create {
    background: url(/img/sprite.8b0a4f58.png) 0px -255px no-repeat;
}
.el-icon-disable{
    background: url(/img/sprite.8b0a4f58.png) -26px -256px no-repeat;
}
.el-icon-undisable{
    background: url(/img/sprite.8b0a4f58.png) -52px -256px no-repeat;
}
.el-icon-edit{
    background: url(/img/sprite.8b0a4f58.png) -159px 0px no-repeat;
}
.el-icon-edit::before,.el-icon-delete::before{
  content: ""
}
.el-icon-delete{
   background: url(/img/sprite.8b0a4f58.png) -79px 0px no-repeat;
}
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: "Glyphicons Halflings";
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 10px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: "";
  }

  .treegrid .el-table td, .el-table th {
    line-height: 22px;
  }

  .el-table {
    color: #333333;
  }

  button.is-outlined {
    border: 0;
    background: #fff;
    color: #8a8a8a;
    padding: 0;
    padding-right: 6px;
  }

  .el-table--enable-row-hover .el-table__body tr:hover button.is-outlined,
  button.is-outlined:hover {
    background-color: #f5f7fa;
  }

  .cell .el-button {
    color: #8a8a8a;
  }

  .cell .el-button:hover {
    color: #f99740;
  }

  .cell .el-button:hover .el-icon-create{
    background: url(/img/sprite.8b0a4f58.png) 0px -281px no-repeat;
  }
  .cell .el-button:hover .el-icon-disable{
    background: url(/img/sprite.8b0a4f58.png) -26px -282px no-repeat;
}
.cell .el-button:hover .el-icon-undisable{
    background: url(/img/sprite.8b0a4f58.png) -52px -282px no-repeat;
}
.cell .el-button:hover .el-icon-edit{
    background: url(/img/sprite.8b0a4f58.png) -159px -26px no-repeat;
}
.cell .el-button:hover .el-icon-delete{
   background: url(/img/sprite.8b0a4f58.png) -79px -26px no-repeat;
}
</style>
<style>
.treegrid .el-table td, .el-table th.is-leaf{
  border:none
}
.treegrid tr:hover .file_col_icon{
   display: inline-block;
}
</style>

