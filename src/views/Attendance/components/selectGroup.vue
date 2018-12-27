<template>
    <el-popover placement="bottom" width="400" trigger="click">
                        <div class="body_cell_content">
                           <el-tree :data="loadNode1 " :show-checkbox="checkbox" ref="Deptree" :props="props1"  :check-strictly="false" node-key="ItemId" :default-expanded-keys="['']"
                             :expand-on-click-node="false"
                             v-on:check-change="currentChange"
                             v-on:node-click="handleNodeClick">
                                <span class="custom-tree-node "  slot-scope="{ node, data }">
                                 <span class='theCell'>
                                   <img v-bind:src="getFace(data.HeadUrl)" alt="" v-if="data.HeadUrl">{{ data.Name }}</span>
                                 </span>
                           </el-tree>
                        </div>
              <div slot="reference" class="chep"><el-input v-model="input" placeholder="请选择用户/部门" readonly></el-input></div>
    </el-popover>
</template>
<script>
import { getToken } from '@/utils/auth'
import { globalvariable } from '@/utils/globalvariable'

export default {
  model: {
    prop: 'value',
    event: 'cc'
  },
  props: {
    value: ''
  },
  components: {

  },
  data() {
    return {
      input: '',
      /** *********选人选部门*********** */
      closed: false,
      loadNode1: [],
      props1: {
        children: 'Childrens'
      },
      getCheckedNodes: [],
      actDep: [],
      people: true,
      checkbox: false
    }
  },
  mounted() {
    this.visible(1)
  },
  watch: {
  },
  methods: {
    /** ******************************* */
    visible(val) {
      if (this.people) {
        this.loadNode1 = JSON.parse(sessionStorage.getItem('EmployeesList'))
      } else {
        this.loadNode1 = JSON.parse(sessionStorage.getItem('departmentsList'))
      }
      if (!this.checkbox) {
        this.actDep = []
      }
      var that = this
    },
    isOk() {
      this.defaultArr = []
      var depArr = []
      var peopleArr = []
      if (this.actDep.length > 0) {
        for (var k = 0; k < this.actDep.length; k++) {
          this.defaultArr.push(this.actDep[k].ItemId)
          if (!this.actDep[k].HeadUrl) {
            depArr.push(this.actDep[k])
          } else {
            peopleArr.push(this.actDep[k])
          }
        }

        if (this.people) {
          this.$emit('act-node', peopleArr)
        } else {
          this.$emit('act-node', depArr)
        }
      }

      this.$refs.Deptree.setCheckedKeys(this.defaultArr)
    },

    getFace(data) {
      function format(data, x, y) {
        var s
        if (data) {
          s = data
            .replace('{0}', x)
            .replace('{1}', y)
            .replace('{2}', 'o')
          return s
        }
      }
      return globalvariable().imgapiurl + format(data, 40, 40)
    },

    currentChange() {
      this.actDep = this.$refs.Deptree.getCheckedNodes()
    },

    handleNodeClick(data) {
      if (!this.checkbox) {
        this.actDep = []
        if (this.people && data.HeadUrl) {
          this.actDep.push(data)
        } else if (!this.people && !data.HeadUrl) {
          this.actDep.push(data)
        }
      }
      console.log(12121)
      console.log(data)
      this.input = data.Name
      this.$emit('cc', data)
    }
  }
}

</script>
<style lang="scss" scoped>

.chep{
      width:220px;
      display: inline-block;
      cursor: pointer;
}
.body_cell_content .theCell:hover{
  background-color: #f8f8f8;
}
.body_cell_content .theCell:hover .el-icon-close{
    display: block;
  }
.body_cell_content .theCell{
  color: rgb(138, 138, 138);
  padding-left: 0px;
}
.body_cell_content .theCell .el-icon-close{
    display: none;
    float: right;
    margin: 20px;
    cursor: pointer;
  }
  .theCell img {
  height: 26px;
  width: 26px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
.el-tree-node__content{
    line-height: 26px;
}
</style>

