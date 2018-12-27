<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>通用<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="applyInfo" label-width="100px" ref="formName">

                <el-form-item label="通用标题：" prop="title" :rules="[{ required: true, message: '请填写标题', trigger: ['blur', 'change']  }]">
                    <el-input type="text" v-model="applyInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="申请内容：" prop="desc" :rules="[{ required: true, message: '请填写申请内容', trigger: ['blur', 'change']  }]">
                    <el-input type="textarea" v-model="applyInfo.desc"></el-input>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
export default {
  props: ['applyInfo'],
  data() {
    return {

    }
  },
  methods: {
    toCheck() {
      var app = this
      this.$refs['formName'].validate((valid) => {
        if (valid) {
        //   app.ruleFormCheck = true
          this.$emit('ruleFormCheck', true)
        } else {
          this.$emit('ruleFormCheck', false)

        //   app.ruleFormCheck = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.leave{
    .header{
        overflow: hidden;
        margin-bottom: 30px;
        .imgHead{
            height: 50px;
            width: 50px;
            display: block;
            margin-right: 10px;
            margin-left: 275px;
            float: left;
            background: url(/images/newApply-48.png) no-repeat -224px 0;
        }
        >span{
            float: left;
            font-size: 18px;
            color: #323232;
            display: block;
            height: 48px;
            line-height: 48px;
            b{
                font-weight: normal;
                color: #8a8a8a;
                font-size: 14px;
            }
        }
    }
    .content{
        overflow: hidden;
        .line{
            text-align: center;
        }
        .el-col{
            height: 40px;
        }
    }
}
</style>
