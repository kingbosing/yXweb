<template>
 <el-container>
 <ul v-if="showUl===1" v-on:click="switchFun" v-bind:class="{ redS: redStudes }">
    <li style="width:10%;">{{num_1}}</li>
    <li>{{num_2}}</li>
    <li class="colorB">{{num_3}}</li>
    <li>{{num_4}}</li>
    <li>{{num_5}}</li>
    <li class="colorB">{{num_6}}</li>
    <li>{{num_7}}</li>
    <li>{{num_8}}</li>
    <li class="colorR">{{num_9}}</li>
    <li>{{num_10}}</li>
    <li style="border-right:none;">{{num_11}}</li>
 </ul>
 <el-input v-model="input_Num" ref="name" v-focus="focusState" maxlength="11" v-else-if="showUl===2" v-on:keyup.native="DelE()" @blur.prevent="changeCount()"></el-input>
 </el-container>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  // props: ['inputNum'],
  model: {
    prop: 'value',
    event: 'cc'
  },
  props: {
    value: ''
  },

  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function(el) {
        // 聚焦元素
        el.focus()
      }
    }
  },
  data() {
    return {
      // 显示
      showUl: 1,
      // input值
      input_Num: '',
      // 数字显示
      num_1: '',
      num_2: '',
      num_3: '',
      num_4: '',
      num_5: '',
      num_6: '',
      num_7: '',
      num_8: '',
      num_9: '',
      num_10: '',
      num_11: '',
      // 红色
      redStudes: 0
    }
  },
  mounted() {
    // this.getInputNumber()
    this.input_Num = this.value
    this.classifyNum()
  },
  watch: {
    value() {
      this.input_Num = this.value
      this.classifyNum()
      console.log('this.value')
      console.log(this.value)
    }
  },
  methods: {
    // 点击切换：
    switchFun() {
      this.showUl = 2
      this.focusState = true
      const that = this
      setTimeout(function() {
        that.$refs.name.focus()
      }, 100)
    },
    // 失去焦点事件
    changeCount: function(val) {
      this.showUl = 1
      this.classifyNum()
    },
    getInputNumber() {
      console.log(this.inputNum)
      this.input_Num = this.inputNum
      this.classifyNum()
    },
    DelE: function() {
      this.input_Num = (this.input_Num).replace(/[^\-?\d.]/g, '')
    },
    // 数字分类
    classifyNum() {
      if (this.input_Num == '-') {
        this.input_Num = ''
        // 传父级
        this.$emit('cc', '')
      } else {
        if (this.input_Num != '') {
          var Arr = parseFloat(this.input_Num)
          this.input_Num = parseFloat(this.input_Num).toFixed(2)
          // 传父级
          this.$emit('cc', this.input_Num)
          console.log(this.input_Num)
          if (Arr < 0) {
            Arr = -Arr
            this.redStudes = 1
          } else {
            this.redStudes = 0
          }
          Arr = Arr.toFixed(2)
          console.log(Arr)
          this.num_1 = Arr[Arr.length - 12]
          this.num_2 = Arr[Arr.length - 11]
          this.num_3 = Arr[Arr.length - 10]
          this.num_4 = Arr[Arr.length - 9]
          this.num_5 = Arr[Arr.length - 8]
          this.num_6 = Arr[Arr.length - 7]
          this.num_7 = Arr[Arr.length - 6]
          this.num_8 = Arr[Arr.length - 5]
          this.num_9 = Arr[Arr.length - 4]
          this.num_10 = Arr[Arr.length - 2]
          this.num_11 = Arr[Arr.length - 1]
        } else {
          // 传父级
          this.$emit('cc', '')
          this.num_1 = ''
          this.num_2 = ''
          this.num_3 = ''
          this.num_4 = ''
          this.num_5 = ''
          this.num_6 = ''
          this.num_7 = ''
          this.num_8 = ''
          this.num_9 = ''
          this.num_10 = ''
          this.num_11 = ''
        }
      }
      this.$emit('refreshList')
    }
  }
}

</script>
<style lang="scss" scoped>
    .temlateMain {
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
  .el-main{
      height: 100%;
      margin: 0;
     padding: 0;
    .el-container{
         height: 100%;
         .el-header{
            border-bottom: none;
            font-weight: normal;
            font-size: 14px;
            padding-top: 15px;
            span{
                margin-right: 60px;
                b{
                     font-weight: normal;
                     color:#8a8a8a;
                }
            }
         }
         .el-main{
             .el-header{
                 padding: 0 20px 0 32px;
             }
             .el-main{
                 padding: 0 20px 20px 0;
             }
         }
    }
  }

}
.titleForm{
    height:100%;
    width:100%;
    border-top:1px solid #dedede;
    border-bottom: 1px solid #dedede;
    background-color: #f5f5f5;
    font-size: 16px ;
    color: #8a8a8a;
    .el-col.el-col-6{
         height: 100%;
    }
   .grid-content.bg-purple{
       height: 100%;
       text-align: center;
       ul{
           width: 100%;
           list-style: none;
           margin: 0;
           padding: 0;
           border-top:1px solid #dedede;
           li{
               width: 9%;
               height:44px;
               line-height: 44px;
               float: left;
               border-right:1px solid #dedede;
               background-color: #ededed;
           }
       }
   }
}
.formTable{
   .el-row{
       position: relative;
       padding-left: 32px;
       height: 48px;
       line-height: 48px;
       cursor: pointer;
       .grid-content.bg-purple{
         border-bottom: 1px solid #dedede;
          border-right: 1px solid #dedede;
           ul{
           width: 100%;
           list-style: none;
           margin: 0;
           padding: 0;
           border-top:1px solid #dedede;
           li{
               width: 9%;
               height:47px;
               line-height: 47px;
               float: left;
               text-align: center;
               border-right:1px solid #dedede;
           }
           li.colorB{
             border-color: #7ecef4;
           }
           li.colorR{
             border-color: #f19ec2;
           }
       }
       .redS{
           color:red;
       }
       .totall{
           color:#8a8a8a;
           padding-left: 14px;
       }
       }
   }
}
.staffInfo{
    font-size: 14px;
    color:#1a1a1a;
    display: inline-block;
    margin-left: 32px;
    margin-top: 20px;
    span{
        font-weight: normal;
    }
}
.staff_btn{
    float: right;
    margin-top: 30px;
    display: inline-block;
}
.iconF{
    display: inline-block;
    position: absolute;
    left:12px;
    width:18px;
    height:48px;
    i{
       display: inline-block;
       width:18px;
       height: 18px;
       float: left;
    }
    .iconAdd{
       background: url("../../../assets/finance/btn_add.jpg") no-repeat;
       margin-bottom: 10px;
    }
    .iconDel{
        background: url("../../../assets/finance/btn_delete.jpg") no-repeat;
    }
}
.operationBar .iconF{
    display: none;
}
.operationBar:hover .iconF{
    display: inline-block;
}
</style>
<style>
 .formTable .el-input__inner{
           width: 100%;
           height:100%;
           border:none;
       }
      .formTable  .el-select__caret.el-input__icon.el-icon-arrow-up{
           display: none;
       }
</style>

