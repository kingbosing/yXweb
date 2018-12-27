<template>
    <el-container>

        <!-- <to-upload></to-upload> -->
        <ul>
            <li v-for="(k,v) in fileList" :key="v">{{k.response.ID}}</li>
        </ul>
        <up-load
        class="upload-demo"
        ref="upload"
        drag
        action="apix/file/FileUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        :on-success="handleSuccess"
        :file-list="fileList"
        :show-list-id="true"
        multiple
        :show-file-list="true"
        :auto-upload="true">
         <el-button size="small" type="primary">点击上传</el-button>
        </up-load>

        <up-load
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </up-load>

        <p>apix/file/upload</p>
        <upload-doc
          class="upload-demo"
          drag
          :on-success="docHandleSuccess"
          action="apix/file/upload"
          multiple>
          <i class="el-icon-upload"></i>
          <p>apix/file/upload</p>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </upload-doc>

    </el-container>
</template>

<script>
import Vue from 'vue'

import upLoad from '../../components/toUpload/'
import uploadDoc from '../../components/toUploadDoc/'

Vue.use(upLoad)
Vue.use(uploadDoc)
export default {
  // components: {
  //   qjUpLoad
  // },
  data() {
    return {
      fileList: []
    }
  },
  watch: {
    // fileList(d1,d2){
    //     console.log(d2)
    // }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleSuccess(response, file, fileList) {
      console.log(fileList)
    },
    docHandleSuccess(response, file, fileList) {
      console.log(fileList)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      return true
    }
  }

}
</script>

