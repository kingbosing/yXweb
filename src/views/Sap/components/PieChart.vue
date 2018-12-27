<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '200人',
          subtext: '总计',

          x: '100px',
          y: '80px',
          show: true
        },
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        color: ['rgba(255,153,21,0.8)', 'rgba(255,153,21,0.45)'],
        legend: {
          orient: 'vertical',
          x: '280px',
          y: '75px',
          itemGap: 30,
          data: [
            { name: '男', icon: 'el-icon-rank' },
            '女']

        },
        calculable: true,
        series: [
          {
            name: '男女占比',
            type: 'pie',
            // roseType: 'radius',

            radius: ['40%', '75%'],
            center: ['125px', '100px'],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: 'inner'
                },
                labelLine: {
                  show: false,
                  length: 10

                }
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: '{b}({d}%)',
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              }
            },

            data: [
              { value: 320, name: '男' },
              { value: 240, name: '女' }

            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
