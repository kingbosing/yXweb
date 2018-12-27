const financeReport = {
  state: {
    navigation: 1,
    handlebtns: true,
    checkedListNumber: 0,
    Report_time: ''
  },
  mutations: {
    SET_NAV: (state, data) => {
      state.navigation = data
    },
    SET_HANDBTN: (state, data) => {
      state.handlebtns = data
    },
    SET_CHECKNUM: (state, data) => {
      state.checkedListNumber = data
    },
    SET_TIME: (state, data) => {
      state.Report_time = data
    }
  },
  actions: {
    setNavigation({
      commit
    }, data) {
      commit('SET_NAV', data)
    },
    handlebtnsshow({
      commit
    }, data) {
      commit('SET_HANDBTN', data)
    },
    handCheckNum({
      commit
    }, data) {
      commit('SET_CHECKNUM', data)
    },
    handSetTime({
      commit
    }, data) {
      commit('SET_TIME', data)
    }

  }
}

export default financeReport
