import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: false,
      withoutAnimation: false
    },
    device: 'desktop' // browser / windows / mac
  },
  mutations: {
    CLOSE_SIDEBAR: state => {
      state.sidebar.opened = false
    },
    OPEN_SIDEBAR: state => {
      state.sidebar.opened = true
    },

    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    closeSideBar({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    openSideBar({ commit }) {
      commit('OPEN_SIDEBAR')
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
