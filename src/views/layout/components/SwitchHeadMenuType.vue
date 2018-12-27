<template>
    <!-- <el-radio-group v-model="switchHeadMenuType">
      <el-radio-button label="User">
        工作台
      </el-radio-button>
      <el-radio-button label="Manager">
        综合管理
      </el-radio-button>
      <el-radio-button label="Tester" v-if="isDevelopment()">
        测试
      </el-radio-button>
    </el-radio-group> -->
    <div class='switchHeadMenu'>
      <div style="vertical-align: middle;display: inline-block;line-height: 50px;float:left">
        <a @click="switchHeadMenu('User')"  v-if="headMenuType()=='Manager'||headMenuType()=='Tester'"><b class="bicon-User"></b>工作台</a>
      </div>
      <div style="vertical-align: middle;display: inline-block;line-height: 50px;float:left">
        <a @click="switchHeadMenu('Manager')"  v-if="headMenuType()=='User'"><b class="bicon-Manager"></b>综合管理</a>
      </div>
    </div>
</template>

<script>
/* 当前组件勿加入 index.js 加载 */
export default {
  computed: {
    bindValue() {
      console.log(this.$store.getters.headMenuType)
      return this.$store.getters.headMenuType
    },
    switchHeadMenuType: {
      get() {
        return this.bindValue
      },
      set(val) {
        this.$store.dispatch('ChangeHeadMenuType', val).then(() => {
          this.$emit('change')
        })
      }
    }
  },
  methods: {
    headMenuType() {
      return this.$store.getters.headMenuType
    },
    isDevelopment() {
      return process.env.NODE_ENV === 'development'
    },
    switchHeadMenu(data) {
      this.$store.dispatch('ChangeHeadMenuType', data).then(() => {
        this.$emit('change')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.bicon-User{
  ///images/zongheguanli.png
  background: url(/images/zongheguanli.png) center center no-repeat;
  width: 14px;
  height: 14px;
  display: inline-block;
  background-size: 14px 14px;
  margin-top: 19px;
  margin-right: 5px;
  float: left;
}
.bicon-Manager{
  ///images/zongheguanli.png
  background: url(../../../assets/home/icon_comprehensive.png) center center no-repeat;
  width: 14px;
  height: 14px;
  display: inline-block;
  // background-size: 20px 20px;
  margin-top: 19px;
  // background-position-y: 5px;
  margin-right: 5px;
  float: left;
}
</style>

