import store from '@/store'

const { body } = document
const WIDTH = 120 // 1024
const RATIO = 3
const financeListWidth = 1500

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      // console.log(rect)
      return rect.width - RATIO < WIDTH
    },
    isShowList() {
      const rect = body.getBoundingClientRect()
      // console.log(rect)
      return rect.width > financeListWidth
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
      const handle_btns_show = this.isShowList()
      store.dispatch('handlebtnsshow', handle_btns_show)
    }
  }
}
