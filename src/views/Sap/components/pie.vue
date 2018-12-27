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
    var labelTop = {
      normal: {
        label: {
          show: true,
          position: 'center',
          formatter: '000',
          textStyle: {
            baseline: 'bottom'
          }
        },
        labelLine: {
          show: false
        }
      }
    }
    var labelFromatter = {
      normal: {
        label: {
          formatter: function(params) {
            return 100 - params.value + '%'
          },
          textStyle: {
            baseline: 'top'
          }
        }
      }
    }
    var labelBottom = {
      normal: {
        color: '#ccc',
        label: {
          show: true,
          position: 'center'
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: 'rgba(0,0,0,0)'
      }
    }
    var radius = [40, 55]
    var option = {
      legend: {
        show: false,

        x: 'center',
        y: 'center',
        data: [
          'GoogleMaps', 'Facebook', 'Youtube', 'Google+', 'Weixin',
          'Twitter', 'Skype', 'Messenger', 'Whatsapp', 'Instagram'
        ]
      },
      title: {
        show: false,
        text: 'The App World',
        subtext: 'from global web index',
        x: 'center'
      },
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                width: '20%',
                height: '30%',
                itemStyle: {
                  normal: {
                    label: {
                      formatter: function(params) {
                        return 'other\n' + params.value + '%\n'
                      },
                      textStyle: {
                        baseline: 'middle'
                      }
                    }
                  }
                }
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          type: 'pie',
          center: ['10%', '30%'],
          radius: radius,
          x: '0%', // for funnel
          itemStyle: labelFromatter,
          data: [
            { name: 'other', value: 46, itemStyle: labelBottom },
            { name: 'GoogleMaps', value: 54, itemStyle: labelTop }
          ]
        },
        {
          type: 'pie',
          center: ['30%', '30%'],
          radius: radius,
          x: '20%', // for funnel
          itemStyle: labelFromatter,
          data: [
            { name: 'other', value: 56, itemStyle: labelBottom },
            { name: 'Facebook', value: 44, itemStyle: labelTop }
          ]
        },
        {
          type: 'pie',
          center: ['50%', '30%'],
          radius: radius,
          x: '40%', // for funnel
          itemStyle: labelFromatter,
          data: [
            { name: 'other', value: 65, itemStyle: labelBottom },
            { name: 'Youtube', value: 35, itemStyle: labelTop }
          ]
        },
        {
          type: 'pie',
          center: ['70%', '30%'],
          radius: radius,
          x: '60%', // for funnel
          itemStyle: labelFromatter,
          data: [
            { name: 'other', value: 70, itemStyle: labelBottom },
            { name: 'Google+', value: 30, itemStyle: labelTop }
          ]
        }
        // {
        //   type: 'pie',
        //   center: ['90%', '30%'],
        //   radius: radius,
        //   x: '80%', // for funnel
        //   itemStyle: labelFromatter,
        //   data: [
        //     { name: 'other', value: 73, itemStyle: labelBottom },
        //     { name: 'Weixin', value: 27, itemStyle: labelTop }
        //   ]
        // },
        // {
        //   type: 'pie',
        //   center: ['10%', '70%'],
        //   radius: radius,
        //   y: '55%', // for funnel
        //   x: '0%', // for funnel
        //   itemStyle: labelFromatter,
        //   data: [
        //     { name: 'other', value: 40, itemStyle: labelBottom },
        //     { name: 'Twitter', value: 30, itemStyle: labelTop },
        //     { name: 'Twitter1', value: 30, itemStyle: labelTop }
        //   ]
        // },
        // {
        //   type: 'pie',
        //   center: ['30%', '70%'],
        //   radius: radius,
        //   y: '55%', // for funnel
        //   x: '20%', // for funnel
        //   itemStyle: labelFromatter,
        //   data: [
        //     { name: 'other', value: 78, itemStyle: labelBottom },
        //     { name: 'Skype', value: 22, itemStyle: labelTop }
        //   ]
        // },
        // {
        //   type: 'pie',
        //   center: ['50%', '70%'],
        //   radius: radius,
        //   y: '55%', // for funnel
        //   x: '40%', // for funnel
        //   itemStyle: labelFromatter,
        //   data: [
        //     { name: 'other', value: 78, itemStyle: labelBottom },
        //     { name: 'Messenger', value: 22, itemStyle: labelTop }
        //   ]
        // },
        // {
        //   type: 'pie',
        //   center: ['70%', '70%'],
        //   radius: radius,
        //   y: '55%', // for funnel
        //   x: '60%', // for funnel
        //   itemStyle: labelFromatter,
        //   data: [
        //     { name: 'other', value: 83, itemStyle: labelBottom },
        //     { name: 'Whatsapp', value: 17, itemStyle: labelTop }
        //   ]
        // },
        // {
        //   type: 'pie',
        //   center: ['90%', '70%'],
        //   radius: radius,
        //   y: '55%', // for funnel
        //   x: '80%', // for funnel
        //   itemStyle: labelFromatter,
        //   data: [
        //     { name: 'other', value: 89, itemStyle: labelBottom },
        //     { name: 'Instagram', value: 11, itemStyle: labelTop }
        //   ]
        // }
      ]
    }
    return {
      chart: null,
      option: option
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

      this.chart.setOption(this.option)
    }
  }

}
</script>

