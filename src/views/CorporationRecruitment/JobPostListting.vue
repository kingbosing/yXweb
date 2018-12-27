<template>
    <el-container  class="temlateMain" v-cloak  v-loading.fullscreen.lock="fullscreenLoading"  element-loading-spinner="loadIcon">
        <el-header height='50px'>
            发布职位
            <div style="float:right">
                <el-input v-model="input" placeholder="请输入岗位名称" @keyup.13.native="searchit()">
                      <b slot="append" class="el-icon-search" @click="searchit"></b>
                </el-input>
            </div>
        </el-header>
        <el-main>
            <el-container>
                <el-header height='55px'>
                     <div class="left">
                        <el-button size="small" :type="state==0?'warning':''"  @click="state=0">发布中</el-button>
                        <el-button size="small" :type="state==1?'warning':''"  @click="state=1">未发布</el-button>
                        <el-button size="small" :type="state==2?'warning':''"  @click="state=2">已暂停</el-button>
                        <el-select v-model="depVal" size="small" placeholder="请选择部门">
                           <el-option
                            label="全部"
                            value="">
                            </el-option>
                            <el-option
                            v-for="item in depList"
                            :key="item.Id"
                            :label="item.Name"
                            :value="item.Id">
                            </el-option>
                        </el-select>
                        <template v-if="state == 0 && handleSelection.length">
                          <el-button size="small"   @click="toRefresh">刷新</el-button>
                          <el-button size="small"   @click="toStop('')">暂停</el-button>
                        </template>
                        <template v-if="state > 0 && handleSelection.length">
                          <el-button size="small"   @click="toPush('')">发布</el-button>
                          <el-button size="small"   @click="toRemove('')">删除</el-button>
                        </template>
                     </div>
                     <div class="right">
                        <el-button size="small" type="warning" @click.stop="goPost">去发布</el-button>
                     </div>
                </el-header>
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
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                type="selection"
                                min-width="75">
                                </el-table-column>

                                <el-table-column
                                label="岗位"
                                prop="JobName"
                                 min-width="260">
                                </el-table-column>

                                <el-table-column
                                prop="DepName"
                                label="部门"
                                 min-width="180">
                                </el-table-column>

                                 <el-table-column
                                prop="CreateTime"
                                label="发布时间"
                                 min-width="180">
                                </el-table-column>

                                <el-table-column
                                prop="Address"
                                label="地址"
                                 min-width='160'
                                show-overflow-tooltip>  </el-table-column>

                                <el-table-column
                                label="操作"
                                 min-width="250">
                                <template slot-scope="scope">

                                    <i class="lookIt opt" @click.stop="toLook(scope.row.Id)"></i>

                                    <i class="refreshThat opt" v-if="state==0" @click.stop="toRefresh"></i>
                                    <i class="releaseThat opt"  v-else @click.stop="toPush(scope.row)"></i>

                                    <i class="editorThat opt" @click.stop="toEdit(scope.row.Id)"></i>

                                    <i class="stopThat opt"  v-if="state==0"  @click.stop="toStop(scope.row)"></i>
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
import { get_joblist, get_deppos, updatejob_status, deljob } from '@/api/recruitment'
import { consoleLog } from '@/utils/globalvariable'

export default {
  data() {
    return {
      fullscreenLoading: false,
      input: '',
      state: '0', // 0:发布中;1:未发布;2:已暂停
      index: 1,
      size: 25,
      totalAmount: 0,
      // depId: '',
      depList: [], // 部门列表
      depVal: '', // 选中部门
      list: [],
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
    this.init()
  },
  methods: {
    init() {
      getDeppos(this)
      getList(this, this.state, this.index, this.size, this.depVal, this.input)
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
      // console.log(88)
      this.$router.push({ path: '/CorporationRecruitment/searchJobs', query: { key: this.input }})
    }
  }
}

const getList = (app, sta, pageIndex, pageSize, depId) => {
  app.fullscreenLoading = true
  get_joblist(sta, pageIndex, pageSize, depId).then(c => {
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
    >.el-main{
        padding: 0;
        .el-header{
            .left{
                float: left;
                .el-select{
                    margin:0 15px;
                }
            }
            .right{
                float: right;
            }
        }
        .kong{
            height: 300px;
            text-align: center;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            >img{
                height: 250px;
            }
            >p{
                color: #8a8a8a;
            }
        }
        .table{
            padding: 0;
            >div{
                height: 100%;
            }
            .kong{
                height: 300px;
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

</style>

