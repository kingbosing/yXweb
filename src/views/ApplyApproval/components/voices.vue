<template>
    <div>
        <div class="bg" v-on:click="toPlay(getVideoUrl(k.URL),k.Id)">
            <div class="wifi" :class="[actAudio]">
            </div>
        </div>
        <div class="Time">{{k.Duration}}'</div>
    </div>
</template>

<script>
import urlUtil from '@/utils/urlUtil'
import { globalvariable } from '@/utils/globalvariable'
import { getFileIcon } from '@/utils/fileType'

export default {
  data() {
    return {
      actAudio: false,
      currentAudio: null,
      timeInte: ''
    }
  },
  props: [
    'k', 'v', 'ifStop'
  ],
  watch: {
    ifStop() {
      if (!this.ifStop) {
        this.actAudio = false
        this.currentAudio = null
      }
    },
    actAudio() {
    }
  },
  methods: {
    getStop() {
      return this.ifStop
    },
    toPlay(src, id) {
      // console.log(id, this.getStop())
      clearInterval(this.timeInte)
      this.$emit('actAutioId', id)
      if (!this.currentAudio) {
        this.currentAudio = new Audio(src)
        this.currentAudio.play()
        this.actAudio = true

        if (this.getStop()) {
          let k = 1
          this.timeInte = window.setInterval(() => {
            if (k % 3 == 1) {
              this.actAudio = 'actAudio_0'
            } else if (k % 3 == 2) {
              this.actAudio = 'actAudio_1'
            } else if (k % 3 == 0) {
              this.actAudio = 'actAudio_2'
            }
            k++
          }, 500)
        } else {
          this.actAudio = ''
          clearInterval(this.timeInte)
        }

        // this.backRound()
        this.currentAudio.onended = () => {
          this.actAudio = false
          this.currentAudio = null
          clearInterval(this.timeInte)
        }
      } else {
        this.currentAudio.pause()
        this.actAudio = false
        this.currentAudio = null
      }
    },
    getVideoUrl(data) {
      if (data) {
        return globalvariable().imgapiurl + data
      }
    },
    backRound() {
      var k = 1

      var Time = window.setInterval(function() {
        if (k % 3 == 1) {
          $(document).find('.actAudio').css('backgroundPositionX', '0')
        } else if (k % 3 == 2) {
          $('.actAudio').css('backgroundPositionX', '-22px')
        } else if (k % 3 == 0) {
          $(document).find('.actAudio').css('backgroundPositionX', '-45px')
        }
        k++
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
    height: 30px;
    width: 120px;
    background: url(/images/applyapproval_video.png)-68px 0 no-repeat;
    cursor: pointer;
}

.bg .wifi {
    height: 30px;
    width: 20px;
    background: url(/images/applyapproval_video.png)-45px 0 no-repeat;
    position: absolute;
    top: 6px;
    left: 10px;
    &.actAudio_0{
      background-position-X: 0;
    }
    &.actAudio_1{
      background-position-X: -22px;
    }
    &.actAudio_2{
      background-position-X: -45px;
    }

}

.Time {
    position: absolute;
    top: 5px;
    left: 130px;
}
.actAudio_0{
   background-position-X: 0;
}
.actAudio_1{
   background-position-X: -22px;
}
.actAudio_2{
   background-position-X: -45px;
}

.actAudio{
    animation-name: runAudio;
    animation-duration: 2s;
    // transition-timing-function: cubic-bezier(1,1,1,1);
    animation-iteration-count: none;
}

@keyframes runAudio {
    0%,100% {
        background-position-X: 0;
    }
    25% {
        background-position-X: -22px;
    }
    50% {
        background-position-X: -45px;
    }
    75% {
        background-position-X: -22px;
    }
}
</style>
