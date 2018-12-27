<template>
    <el-container class="temlateMain">
         <el-header height="50px">
            <span :class="{'active' : getPage==1,'tab_btn':true}" @click="getPage=1">难易度管理</span>
            <span :class="{'active' : getPage==2,'tab_btn':true}" @click="getPage=2">工作项类别管理</span>
            <span :class="{'active' : getPage==3,'tab_btn':true}" @click="getPage=3">职位工作类别管理</span>
            <span :class="{'active' : getPage==4,'tab_btn':true}" @click="getPage=4">工作内容管理</span>
            <div class="header-right">
              <el-button type="warning" v-if="getPage==1" @click="DifficultyLevel">新建难易度</el-button>
              <el-button type="warning" v-if="getPage==2" @click="WorkType">新建工作类别</el-button>
              <el-button type="warning" v-if="getPage==3" @click="JobType">新建职位工作类别</el-button>
            </div>
        </el-header>
        <el-main class="">
              <set-difficulty v-if="getPage===1" ref="setDifficulty"></set-difficulty>
              <work-category v-else-if="getPage===2" ref="workCategory"></work-category>
              <job-category v-else-if="getPage===3" ref="jobCategory"></job-category>
              <job-content v-else-if="getPage===4"></job-content>
        </el-main>
        <!--弹窗-->

              <!--****************************-->
    </el-container>
</template>

<script>
import { getToken } from '@/utils/auth'
import setDifficulty from './components/SetDifficulty'
import workCategory from './components/WorkCategory'
import jobCategory from './components/JobCategory'
import jobContent from './components/JobContent'
import * as performanceAppraisal from '@/api/performanceAppraisal'

export default {
  components: {
    setDifficulty,
    workCategory,
    jobCategory,
    jobContent
  },
  data() {
    return {
      getPage: 1
    }
  },
  mounted() {
  },
  watch: {},
  methods: {
    // 新建难易度
    DifficultyLevel() {
      this.$refs.setDifficulty.newOpen()
    },
    // 新建工作类别
    WorkType() {
      this.$refs.workCategory.newOpen()
    },
    // 新建职位工作类别
    JobType() {
      this.$refs.jobCategory.newOpen()
    }
  }
}
</script>
<style lang="scss" scoped>
.temlateMain {
  height: 100%;
  .el-header {
    .tab_btn {
      padding: 0 10px;
      display: inline-block;
      height: 50px;
      margin-right: 20px;
      cursor: pointer;
    }
    .tab_btn.active {
      border-bottom: 2px solid #f99740;
    }
    .header-right {
      float: right;
      .tools_search {
        width: 310px;
        float: left;
        margin-right: 15px;
      }
    }
  }
  .el-main {
    height: 100%;
    padding: 0;
  }
}

</style>

