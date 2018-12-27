<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>颜色命名</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="item in colors" :key="item.name" class="text item">
        {{item.name}} {{item.color}}
      </div>
    </el-card>
  </div>
</template>
<script>
import DropdownMenu from '@/components/Share/dropdownMenu'

export default {
  name: 'documentation',
  components: { DropdownMenu },
  data() {
    return {
      colors: [{ name: '主题色', color: '#f99740' }]
    }
  }
}
</script>
