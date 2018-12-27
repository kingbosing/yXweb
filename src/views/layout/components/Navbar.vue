<template>
<!-- <div>999999999999999</div> -->
  <el-menu class="navbar" mode="horizontal">
    <a href="9999999">9999999999999</a>
      <!-- <img :src="getLogoFormatUrl()" class="company-logo"/> -->
      <el-dropdown class="company-info-container" trigger="click" placement="bottom-start">
        <span class="el-dropdown-link">
            {{getCompanyName()}}  <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="navbar_drop">
          <el-scrollbar  height="450px">
            <el-dropdown-item v-for="(k,v) in getMyCompanyLists() " :key="v" >
              <div class="CompanyList" v-on:click="changeCompany(k.CompanyCode)">
                <img :src="getFormatUrl(k.LOGFormatUrl)" class="companyList-logo"/>
                {{k.CompanyName}}
              </div>
            </el-dropdown-item>
          </el-scrollbar>
        </el-dropdown-menu>
      </el-dropdown>

    <div class="right-menu">

      <div style="vertical-align: middle;display: inline-block;line-height: 50px;float:left">
        <a @click="NoviceGuide()"><b class="bicon-help"></b>新手引导</a>
      </div>
      <switch-HeadMenuType/>
      <el-dropdown class="user-info-container right-menu-item" trigger="hover">

        <span class="el-dropdown-link">
            <b class="user"></b> {{name}}  <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a @click="BusinessCard(companyCode)">企业/个人名片</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="JoinOrCreate()">加入/创建公司</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="ToTest" v-if="isDevelopment()">测试</a>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { getToken } from '@/utils/auth'
import { switchCompany } from '@/api/login'
// import store from '@/store'

import { default as SwitchHeadMenuType } from './SwitchHeadMenuType.vue'
import { mapGetters } from 'vuex'

import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import ThemePicker from '@/components/ThemePicker'
import urlUtil from '@/utils/urlUtil'
import { getMyCompanys } from '@/utils/sessionStorage'

// import noLogo from ''

export default {
  components: {
    ErrorLog,
    Screenfull,
    ThemePicker,
    SwitchHeadMenuType
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'companyCode'])
  },
  methods: {
    BusinessCard(code) {
      this.$router.push({
        path: '/home/BusinessCard',
        query: {
          companyCode: code
        }
      })
    },
    JoinOrCreate() {
      this.$router.push({ path: '/home/JoinOrCreate' })
    },
    NoviceGuide() {
      this.$router.push({ path: '/home/NoviceGuide' })
    },
    ToTest() {
      this.$store.dispatch('ChangeHeadMenuType', 'Tester').then(() => {
        this.$emit('change')
      })
    },
    isDevelopment() {
      // return process.env.NODE_ENV === 'development'
      return true
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        // this.$router.push({ path: '/loginModule_index' })
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    getCompanyName() {
      console.log(this.$store.state.company)
      return this.$store.state.company.CompanyName
    },
    getMyCompanyLists() {
      return getMyCompanys().Data
    },
    getLogoFormatUrl() {
      if (this.$store.state.company.LogoFormatUrl) {
        return urlUtil.formatPicUrl(
          this.$store.state.company.LogoFormatUrl,
          42,
          42
        )
      } else {
        // return noLogo
        return 'http://d303.paixin.com/thumbs/1863037/230692932/staff_1024.jpg'
      }
    },
    getFormatUrl(url) {
      if (url) {
        return urlUtil.formatPicUrl(
          url,
          40,
          40
        )
      } else {
        // return noLogo
      }
    },
    changeCompany(CompanyCode) {
      console.log(CompanyCode)
      return new Promise((resolve, reject) => {
        switchCompany(getToken(), CompanyCode)
          .then(response => {
            console.log('///')
            console.log(response)
            if (response.data.successful) {
              location.reload()
              // 公司部门及员工树
              // store.dispatch('GetCompanyAllTree').then(() => {})
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bicon-help {
  background: url(../../../assets/home/icon_novice.png) center center no-repeat;
  width: 14px;
  height: 14px;
  // background-size: 20px 20px;
  margin-top: 19px;
  // background-position-y: 5px;
  margin-right: 5px;
  float: left;
}

.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .company-logo {
    height: 42px;
    width: 42px;
    border-radius: 4px;
    border: 1px solid #ccc;
    float: left;
    margin-top: 4px;
    margin-right: 24px;
    margin-left: 14px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    color: #323232;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .user-info-container {
      height: 50px;
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
      }
    }
  }
}

.CompanyList{
  height: 45px;
  .companyList-logo{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    float: left;
    margin: 2px 10px 0 0;
  }
}
.el-dropdown-menu--medium .el-dropdown-menu__item{
line-height: 45px;
}

</style>
