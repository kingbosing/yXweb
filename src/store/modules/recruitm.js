const recruitm = {
  state: {
    inviteAdd: false,
    routerFrom: {}
  },
  mutations: {
    ADD_INVITE: (state, log) => {
      state.inviteAdd = log
    },
    SET_FROM: (state, log) => {
      state.routerFrom = log
    }
  },
  actions: {
    addInvite({ commit }, log) {
      commit('ADD_INVITE', log)
    },
    setFrom({ commit }, log) {
      commit('SET_FROM', log)
    }
  }
}

export default recruitm

