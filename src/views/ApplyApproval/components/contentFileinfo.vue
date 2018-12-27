<template>
    <el-scrollbar class="onlyY file" id="file">
         <div class="video">
            <p>语音：</p>
            <div v-if="Voices.length==0" class="color-8a">(空)</div>
            <voices-cell class="video_col" v-for="(k,v) in Voices" :id="k.Id" :key="v" :k="k" :v="v" @actAutioId='getactAutioId' :ifStop="k.Id==actAutioId||actAutioId==''"></voices-cell>
        </div>
        <div class="file">
                <p>文件：</p>
            <!-- <div v-if="!fileLength(File,Img)"  class="color-8a">(空)</div>
            <template v-else> -->
                <div class="file_col" v-for="(k,v) in File" :key="v">

                    <new-icon class-name="file_col_icon"  :icon-name="FileIcon(k.FileName)" />
                    <span class="fileName">{{k.FileName}}</span>
                    <span class="size">{{k.Size|fileSize}}</span>

                    <i class="handle toDownLoad" v-on:click="download(k.SaveUrl,k.FileName)"></i>
                </div>
                <div class="file_col" v-for="(k,v) in Img" :key="v">

                    <img class="fileType" v-bind:src="faceUrl(k.URL,40)" />
                    <span class="fileName">{{k.FileName}}</span>
                    <span class="size">{{k.Size|fileSize}}</span>

                    <i class="handle toBig" v-on:click="getBig(k.Path)"></i>
                </div>

            <!-- </template> -->
        </div>
    </el-scrollbar>
</template>

<script>
import './ApplyApproval_vue.js'
import urlUtil from '@/utils/urlUtil'
import { globalvariable } from '@/utils/globalvariable'
import { getFileIcon } from '@/utils/fileType'

import voicesCell from './voices'

export default {
  components: {
    voicesCell
  },
  data() {
    return {
      CompanyName: '',
      actAudio: false,
      currentAudio: null,
      actAutioId: ''
    }
  },
  watch: {
    actAutioId() {
    //   console.log(this.actAutioId)
    }
  },
  props: [
    'Voices',
    'listData',
    'Img',
    'File'
  ],
  methods: {
    getCompanyName() {
      return this.$store.state.company.CompanyName
    },
    faceUrl(url, width) {
      if (url) {
        return urlUtil.formatImgUrl(
          url,
          width,
          width
        )
      }
    },
    getBig(url) {
      var imgUrl = globalvariable().imgapiurl + url

      this.$alert('<img class="bigImg" src="' + imgUrl + '" />', {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        customClass: 'bigImgBox'
      })
    },
    download(url, name) {
      var Src = globalvariable().bigfileurl + url // + encodeURIComponent(name, 'UTF-8')
      window.open(Src)
    },
    fileLength(FileIDs, Images) {
    //   console.log(FileIDs)
    //   console.log(Images)
      if (FileIDs || Images) {
        return Images.length > 0 && FileIDs.length > 0
      }
    },
    FileIcon(name) {
    //   console.log(name)
      return getFileIcon(name)
    },
    getactAutioId(data) {
      this.actAutioId = data
    }
  }
}
</script>

<style lang="scss" scoped>
#file{
height: 100%;

.video, .file {
    overflow: hidden;
    margin-top: 20px;
    padding: 0 20px;
    margin-bottom: 20px;
}

.video_col {
    height: 30px;
    width: 160px;
    position: relative;
    float: left;
    margin-top: 10px;
}

.video_col .bg {
    height: 30px;
    width: 120px;
    background: url(/images/applyapproval_video.png)-68px 0 no-repeat;
    cursor: pointer;
}

.video_col .bg .wifi {
    height: 30px;
    width: 20px;
    background: url(/images/applyapproval_video.png)-45px 0 no-repeat;
    position: absolute;
    top: 6px;
    left: 10px;
}

.video_col .Time {
    position: absolute;
    top: 5px;
    left: 130px;
}

.file_col{
    height:50px;
    width:460px;
    margin:5px 0;
    position:relative;
}
.file_col .fileType{
    height:40px;
    width:40px;
    display:inline-block;
    float:left;
    margin-top:5px;

    font-size:38px;
}
.file_col .fileType .iconfont {
    font-size: 40px;
    position:absolute;
}
.file_col .fileName {
    position: absolute;
    top: 5px;
    left: 50px;
    color: #8a8a8a;
}
.file_col .size {
    margin:0;
    padding:0;
    position: absolute;
    top: 30px;
    left: 50px;
    color:#ccc;
}
.file_col .handle {
    height: 20px;
    width: 20px;
    display: inline-block;
    float: right;
    margin-top: 15px;
    cursor:pointer;
}
.file_col .toBig {
    background: url(/images/applyAndapproval_icon.png)0  -666px;
}
.file_col .toDownLoad {
    background: url(/images/applyAndapproval_icon.png)0  -560px;
}
.file_col .toBig:hover {
    background: url(/images/applyAndapproval_icon.png)0  -612px;
}

.file_col .toDownLoad:hover {
    background: url(/images/applyAndapproval_icon.png)0  -503px;
}

}

</style>

