<template>
    <el-container  class="temlateMain" v-loading.fullscreen.lock="fullscreenLoading" v-cloak   element-loading-spinner="loadIcon">
        <el-header height='50px'>
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item  :to="{ path: '/CorporationRecruitment/JobPostListting',query:{actId:''} }">发布职位</el-breadcrumb-item>
                <el-breadcrumb-item>预览</el-breadcrumb-item>
            </el-breadcrumb>

            <div style="float:right">
                <el-input v-model="key" placeholder="请输入岗位名称" suffix-icon="el-icon-search" @keyup.13.native="searchit()"></el-input>
            </div>
        </el-header>
        <el-main>
             <el-container>
                <el-main class="table">
                    <div class="kong" v-if="totalAmount==0">
                        <img src="/images/kong.png" alt="">
                        <p>暂无数据</p>
                    </div>
                    <div v-else >
                        <template>
                            <el-table
                                ref="multipleTable"
                                :data="list"
                                tooltip-effect="dark"
                                style="width: 100%"
                                height='100%'
                               >
                                <el-table-column
                                 min-width="3">
                                </el-table-column>

                                <el-table-column
                                label="岗位"
                                prop="JobName"
                                 min-width="26">
                                </el-table-column>

                                <el-table-column
                                prop="DepName"
                                label="部门"
                                 min-width="18">
                                </el-table-column>

                                 <el-table-column
                                prop="CreateTime"
                                label="发布时间"
                                 min-width="18">
                                </el-table-column>

                                <el-table-column
                                prop="Address"
                                label="工作地址"
                                 min-width='16'
                                show-overflow-tooltip>  </el-table-column>

                                 <el-table-column
                                label="职位状态"
                                 min-width="14">
                                <template slot-scope="scope">
                                    <span>{{theStatus[scope.row.Status]}}</span>
                                </template>
                                 </el-table-column>

                                <el-table-column
                                label="操作"
                                 min-width="25">
                                <template slot-scope="scope">

                                    <i class="lookIt opt" @click.stop="toLook(scope.row.Id)"></i>

                                    <i class="refreshThat opt" v-if="scope.row.Status==0" @click.stop="toRefresh"></i>
                                    <i class="releaseThat opt"  v-else @click.stop="toPush(scope.row)"></i>

                                    <i class="editorThat opt" @click.stop="toEdit(scope.row.Id)"></i>

                                    <i class="stopThat opt"  v-if="scope.row.Status==0"  @click.stop="toStop(scope.row)"></i>
                                    <i class="removeThat opt"  v-else @click.stop="toRemove(scope.row)"></i>
                                </template>

                                </el-table-column>
                            </el-table>
                        </template>

                    </div>

                </el-main>
                <el-footer height='60px'>
                    <el-pagination v-on:size-change="handleSizeChange"
                            v-on:current-change="handleCurrentChange"
                            :current-page="index"
                            :page-sizes="[25,50, 100, 150]"
                            :page-size="size"
                            layout="sizes, prev, pager, next,jumper,total"
                            :total="totalAmount">
                    </el-pagination>
                </el-footer>
             </el-container>

        </el-main>
    </el-container>

</template>

<script>
import { get_searchjoblist, get_deppos, updatejob_status, deljob } from '@/api/recruitment'
import { consoleLog } from '@/utils/globalvariable'

export default {

  data() {
    return {
      fullscreenLoading: false,
      input: '',
      key: '',
      state: '0', // 0:发布中;1:未发布;2:已暂停
      index: 1,
      size: 25,
      totalAmount: 0,
      // depId: '',
      depList: [], // 部门列表
      depVal: '', // 选中部门
      list: [],
      theStatus: ['发布中', '未发布', '暂停中'],

      handleSelection: [] // 選中
    }
  },
  watch: {
    state() {
      this.init()
      this.depId = ''
    },
    depVal() {
      this.init()
    }
  },
  mounted() {
    this.key = this.$route.query.key
    this.init()
  },
  methods: {
    init() {
    //   getDeppos(this)
      getList(this, this.key, this.index, this.size)
    },
    handleSelect() {

    },
    handleSelectionChange(val) {
      this.handleSelection = val
    },
    getIds() {
      const ids = []
      this.handleSelection.forEach(ele => {
        ids.push(ele.Id)
      })
      // console.log(ids)
      return ids.toString()
    },
    handleSizeChange(size) {
      this.size = size
      this.init()
    },
    handleCurrentChange(index) {
      this.index = index
      this.init()
    },
    toPush(row) {
      const Id = row ? row.Id : this.getIds()

      this.$confirm('此操作将发布选中的职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updatejob_status(Id, 0).then(c => {
          if (c.data.Code == 0) {
            this.init()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    toStop(row) {
      const Id = row ? row.Id : this.getIds()

      this.$confirm('此操作将暂停选中的职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updatejob_status(Id, 2).then(c => {
          if (c.data.Code == 0) {
            this.init()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消暂停'
        })
      })
    },
    toRefresh() {
      this.init()
    },
    toRemove(row) {
      const Id = row ? row.Id : this.getIds()

      this.$confirm('此操作将删除选中的职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deljob(Id).then(c => {
          if (c.data.Code == 0) {
            this.init()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    goPost() {
      this.$router.push({ path: '/CorporationRecruitment/toPost' })
    },
    toLook(id) {
      this.$router.push({ path: '/CorporationRecruitment/postInfomationpreview', query: { id }})
    },
    toEdit(id) {
      this.$router.push({ path: '/CorporationRecruitment/toPost', query: { id }})
    },
    searchit() {
      this.init()
    }
  }
}

const getList = (app, key, pageIndex, pageSize) => {
  app.fullscreenLoading = true
  get_searchjoblist(key, pageIndex, pageSize).then(c => {
    consoleLog(c.data.Data)
    app.fullscreenLoading = false

    if (c.data.Code == 0) {
      app.totalAmount = c.data.Data.TotalAmount
      app.list = c.data.Data.Records
    }
  })
}

const getDeppos = (app) => {
  get_deppos().then(c => {
    // console.log(c)
    app.depList = c.data.Data
  })
}

</script>

<style lang="scss" scoped>
.temlateMain{
    .el-main,.el-container{
         height: 100%;
    }

    .el-main{
        height: 100%;
        padding: 0;
        .el-container{
            width: 100%;
            margin:0 auto;
            .el-main{
                >div{
                    height: 100%;
                }
                .opt{
                display: inline-block;
                height: 20px;
                width: 20px;
                // background: #ccc;
                margin: 0px 25px 0 0;
                cursor: pointer;
                &.lookIt{
                    background: url(/images/invite.png)0 3px;
                }
                 &.releaseThat{
                    background: url(/images/invite.png)-81px 3px;
                }
                 &.editorThat{
                    background: url(/images/invite.png)-41px 3px;
                }
                 &.removeThat{
                    background: url(/images/invite.png)-101px 3px;
                }
                &.stopThat{
                    background: url(/images/invite.png)-61px 3px;
                }
                &.refreshThat{
                    background: url(/images/invite.png)-21px 3px;
                }
            }
            }
        }
    }
}
</style>

