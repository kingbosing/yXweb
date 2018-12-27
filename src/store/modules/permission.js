import { convertToRouters, constantRouterMap } from '@/router'
import request from '@/utils/request'
import { myRouters } from '@/api/login'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    permissions: [],
    // 是否存在管理菜单
    hasManager: false
  },
  mutations: {
    SET_ROUTERS: (state, permissions) => {
      state.permissions = permissions.sort(c => c.SortId)
      var routers = convertToRouters(state)
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      // console.log(1111)
      console.log(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        myRouters().then(c => { // request.get('apix/v2/auth/my')
          var res = c.data
          console.log('​GenerateRoutes -> res', res)
          if (!res.Code) {
            const data = res.Data
            // console.log(data)
            commit('SET_ROUTERS', data)
            if (resolve) resolve()
          }
        })
      })
    }
  }
}

export default permission
