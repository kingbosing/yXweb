<template>
    <div>
        <H1>选人选部门</H1>
        <el-button @click='dialogVisible=true'>选人</el-button>

        <get-depeople :visible.sync="dialogVisible"
        :actlist="TactList"
        title="选择参会人"
        :people="true"
        :checkbox="false"
        v-on:act-node="actNode">
        </get-depeople>

<p>-----------------------------</p>
        <textarea rows="5" style="width:500px;">
            <w-dialog :visible.sync="dialogVisible" :actlist="TactList" title="选择参会人" :people="true" :checkbox="false" v-on:act-node="actNode"></w-dialog>
        </textarea>
        <ul>

            <li>dialogVisible: true:显示</li>
            <li>title: 弹窗标题</li>
            <li>people: 选人true;部门false</li>
            <li>checkbox: 多选true;单选false</li>
            <li>act-node : 返回选中的人/部门 信息列表</li>
            <li>actList : 默认选中 id列表 ['','']</li>
        </ul>
    </div>
</template>

<script>
import getDepeople from '../../components/dialogDep/src/component'
export default {
  components: {
    getDepeople
  },
  data() {
    return {
      dialogVisible: false,
      TactList: []
    }
  },
  methods: {
    actNode(data) {
      console.log(data)
    }
  }
}
</script>

