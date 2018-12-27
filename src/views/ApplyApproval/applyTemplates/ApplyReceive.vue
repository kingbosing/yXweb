<template>
    <div class="leave">
        <div class="header">
            <div class="imgHead"></div>
            <span>物品领用<b>-以下信息将用于申请审批，请认真填写。</b></span>
        </div>
        <div class="content">
            <el-form :model="k" label-width="100px" :ref="'formName'+v" v-for="(k,v) in applyInfo" :key="v">
                <div>
                    <p class="color-8a">报销明细({{v+1}}) <span class="delete" v-show="v>0" @click="deleteIt(v)">删除</span></p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="物品名称：" prop="Name" :rules="[{ required: true, message: '请填写物品名称', trigger: ['blur', 'change']  }]">
                                <el-input type="text" v-model="k.Name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="物品数量：" prop="Count" :rules="[{ required: true, message: '请填写物品数量', trigger: ['blur', 'change']  }]">
                                <el-input type="number" v-model="k.Count"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="物品用途：" >
                        <el-input type="textarea" v-model="k.Use"></el-input>
                    </el-form-item>
                </div>
            </el-form>

                <div class="add">
                   <el-row>
                       <el-col :span="20">
                           <hr>
                       </el-col>
                       <el-col :span="4">
                           <span @click="addIt"><new-icon class-name="add_col_icon"  icon-name="#icon-tianjia" />添加报销明细</span>
                       </el-col>

                   </el-row>
                </div>

                <el-form label-width="100px" :model="theRemark">
                    <el-form-item label="物品用途：" >
                        <el-input type="textarea" v-model="theRemark.Remark"></el-input>
                    </el-form-item>
                </el-form>
        </div>
    </div>
</template>

<script>
export default {
  props: ['applyInfo', 'theRemark'],
  data() {
    return {

    }
  },
  methods: {
    toCheck() {
      var app = this

      for (let i = 0; i < this.applyInfo.length; i++) {
        const index = 'formName' + i
        this.$refs[index][0].validate((valid) => {
          if (valid) {
            this.$emit('ruleFormCheck', true)
          } else {
            this.$emit('ruleFormCheck', false)
          }
        })
      }
    },
    deleteIt(v) {
      this.applyInfo.splice(v, 1)
    },
    addIt() {
      const num = this.applyInfo.length
      this.applyInfo.push({
        Name: '',
        Count: '',
        Use: ''
      })
    },
    getTotal() {
      const num = 0
      // this.applyInfo.forEach(item => {
      //     num+=parseFloat(item.Amount)||0
      // })
      // return num.toFixed(2)
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
            background: url(/images/newApply-48.png) no-repeat -110px 0;
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
        .delete{
            color: #f99740;
            cursor: pointer;
            font-size: 16px;
            float: right;
        }
        .add{
            .el-col-4{
                float: right;
                padding-left: 10px;
                color: #f99740;
                cursor: pointer;
                font-size: 16px;
                .add_col_icon{
                    margin-right: 10px;
                     color: #f99740;
                }
            }
            .el-col-20{
                hr{
                    border:1px solid #dedede;
                }
            }
        }
    }
}
.el-row{
    margin-bottom:20px;
}
.add_col_icon{
    font-size: 16px;
}
</style>
