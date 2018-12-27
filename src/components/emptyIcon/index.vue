<template>
    <div class="empty">
        <div :style='getTop()'>
            <img src="images/apply_empty.png" alt="" :style='getSize()'>
            <p>{{title}}</p>
        </div>

    </div>
</template>

<script>
export default {
  name: 'emptyIcon',
  props: {
    title: {
      type: String,
      default: '暂无数据！'
    },
    size: {
      type: Number,
      default: 400
    },
    top: {
      type: Number,
      default: 0
    }

  },
  methods: {
    getSize() {
      return { width: this.size + 'px' }
    },
    getSize2() {
      return { width: (this.size + 100) + 'px' }
    },
    getTop() {
      return { marginTop: this.top + 'px' }
    }
  }
}
</script>

<style lang="scss" scoped>
.empty{
    height: 100%;
    >div{

        img{
            display: block;
            margin:0 auto;
        }
        p{
            font-size: 16px;
            color: #ccc;
            width: 100%;
           padding:0;
           margin: 0;
           margin-top: 10px;
           text-align: center;
        }
    }

}

</style>

