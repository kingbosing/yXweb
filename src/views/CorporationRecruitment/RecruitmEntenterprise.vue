<template>
    <el-container  class="temlateMain" v-cloak  element-loading-spinner="loadIcon">
         <el-header height='50px'>
            <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">企业信息</el-menu-item>
                <el-menu-item index="2">面试邀请</el-menu-item>
                <el-menu-item index="3">信息登记表</el-menu-item>
            </el-menu>
            <div style="float:right">
                <el-button size="small" v-if='doActive=="1"' @click="toEdit">编辑</el-button>
                <el-button size="small" v-if='doActive=="2"' @click="toAdder">添加</el-button>
                <el-button size="small" v-if='doActive=="3"' @click="toSave">保存</el-button>
            </div>
        </el-header>
        <el-main>
            <companyInfo v-if="doActive=='1'"></companyInfo>
            <invited v-if="doActive=='2'"></invited>
            <registry-form v-if="doActive=='3'" ref="adderForm"></registry-form>

        </el-main>

    </el-container>
</template>

<script>

import companyInfo from './components/companyInfo'
import invited from './components/invited'
import registryForm from './components/registryForm'

export default {
  components: {
    companyInfo, invited, registryForm
  },
  data() {
    return {
      fullscreenLoading: false,
      defaultActive: '1',
      doActive: '1',
      toAdd: false,
      toSaveit: false
    }
  },
  mounted() {
    this.init()
    const actId = this.$route.query.actId
    this.doActive = actId || '1'
    this.defaultActive = actId || '1'
  },
  methods: {
    init() {
      // console.log(this.$route.query.actId)

    },
    toEdit() {
      this.$router.push({ path: '/CorporationRecruitment/components/editCompanyinfo' })
    },
    toAdder() {
      this.$store.dispatch('addInvite', true).then(() => {
        this.$emit('change')
      })
    },
    toSave() {
      this.$refs.adderForm.toSave()
    },
    handleSelect(data) {
      // console.log(data)
      this.doActive = data
    }
  }
}

</script>

<style lang="scss" scoped>

</style>

