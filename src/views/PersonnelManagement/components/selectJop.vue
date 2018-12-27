<template>
    <!--弹窗-->
              <el-dialog title="选择职位" :visible.sync="selectJop" width="850px">
                  <el-row>
                     <el-col :span="8">
                         <div class="grid-content bg-purple">
                            <p class="titleLine">可选类别</p>
                            <div class="listBox">
                                <el-tree :data="listData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                            </div>
                         </div>
                     </el-col>
                     <el-col :span="8">
                         <div class="grid-content bg-purple marginS">
                            <p class="titleLine">可选职位</p>
                            <div class="listBox">
                                <el-radio-group v-model="radio" @change="selectedFun()">
                                    <el-radio v-for="item in jopData" :label="item.ID" :key="item.JobName">{{item.JobName}}</el-radio>
                                </el-radio-group>
                            </div>
                         </div>
                     </el-col>
                     <el-col :span="8">
                         <div class="grid-content bg-purple marginS">
                            <p class="titleLine">已选择</p>
                            <div class="listBox">
                               <p v-if="selectData!=''">{{selectData.JobName}}
                                   <i class="el-icon-error" @click="deleteFun"></i>
                               </p>
                            </div>
                         </div>
                     </el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="warning" style="margin-right:30px" @click="submit">确 定</el-button>
                     <el-button @click="selectJop = false">取 消</el-button>
                  </span>
              </el-dialog>
    <!--****************************-->
</template>
<script>
import { getToken } from '@/utils/auth'
import * as personnelManagement from '@/api/personnelManagement'
export default {
  model: {
    prop: 'value',
    event: 'cc'
  },
  props: {
    value: ''
  },
  data() {
    return {
      selectJop: false,
      listData: [],
      defaultProps: {
        children: 'children',
        label: 'CategroyName'
      },
      radio: '',
      jopData: [],
      selectData: ''// 选中的数据
    }
  },
  components: {

  },
  created() {

  },
  mounted() {
    this.Getcategory()
  },
  methods: {
    // 提交
    submit() {
      if (this.selectData != '') {
        // 传父级
        // this.$emit('cc', this.selectData)
        this.selectJop = false
        this.$emit('watchChild', this.selectData)
      }
    },
    // 取消选中
    deleteFun() {
      this.radio = ''
      this.selectData = ''
    },
    // 选中职位
    selectedFun() {
      console.log(this.radio)
      for (var i = 0; i < this.jopData.length; i++) {
        if (this.radio == this.jopData[i].ID) {
          this.selectData = this.jopData[i]
        }
      }
      console.log(this.selectData)
    },
    // 选择类别
    handleNodeClick(data) {
      console.log(data)
      this.jopData = data.Jobs
      this.radio = ''
      this.selectData = ''
    },
    // 获取职位类别
    Getcategory() {
      const that = this
      return new Promise((resolve, reject) => {
        personnelManagement.Getcategory(getToken(), '')
          .then(response => {
            console.log('///')
            console.log(response.data.Data)
            if (response.data.successful) {
              that.listData = response.data.Data
              this.jopData = that.listData[0].Jobs
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 弹窗的显示
    dialogFun() {
      this.selectJop = true
    }
  }
}
</script>

<style lang="scss" scoped>
   .titleLine{
       font-weight: bold;
       text-align: center;
       margin: 0 0 10px 0;
   }
   .listBox{
       width: 100%;
       height:420px;
       border:1px solid #dedede;
       border-radius: 4px;
       padding-top: 10px;
   }
   .marginS{
       padding-left: 20px;
       .listBox{
           padding: 10px;
           p{
               margin: 0;
               i{
                   float: right;
                   color:#8a8a8a;
                   cursor: pointer;
               }
           }
       }
   }
   .el-radio{
       display: block;
        margin:0 0 10px 10px;
   }
   .el-radio+.el-radio{
       margin:0 0 10px 10px;
   }
</style>
