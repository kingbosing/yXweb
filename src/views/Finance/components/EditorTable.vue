<template>
    <el-table
      :data="data" border
      style="width: 100%">
      <el-table-column  v-for="column in columns" :key="column.dataIndex" :label="column.text">
        <template slot-scope="scope">
            <span v-if="IsEditor(column.isEdit)"><el-input v-model="scope.row[column.dataIndex]"></el-input></span>
           <span  v-else>{{scope.row[column.dataIndex]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </template>

<script>
export default {
  props: {
    EditorStructure: {// 是否可编辑
      type: Boolean,
      default: function() {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    data: function() {
      return this.dataSource
    }
  },
  methods: {
    IsEditor(flag) {
      // console.log(this.EditorStructure && flag)
      return this.EditorStructure && flag
    }
  }
}
</script>
<style>
[class^='el-table_2_column_']  .cell {
text-align: center
}
</style>
