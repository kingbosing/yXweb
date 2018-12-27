import { loginByUsername, logout, getUserInfo, GetCompanyAllTree } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { removeMyToken } from '@/utils/sessionStorage'
import * as finance from '@/api/finance'
import * as authority from '@/api/authority'
import request from '@/utils/request'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    profileId: '',
    avatar: '',
    introduction: '',
    roles: [],
    headMenuType: 'User' /* 顶级菜单类型 User / Manager / Tester */,
    setting: {
      articlePlatform: []
    },
    financialInitial: [],
    authorityData: [], // 权限数组
    departmentData: []// 组织架构
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ID: (state, profileId) => {
      state.profileId = profileId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER: (state, user) => {
      state.name = user.name
      state.avatar = user.avatar
      state.introduction = user.introduction
      state.profileId = user.profileId
    },
    SET_HEAD_MENU_TYPE: (state, headMenuType) => {
      state.headMenuType = headMenuType
    },
    SET_FINANCIAL_INITIAL: (state, financialInitial) => {
      state.financialInitial = financialInitial
    },
    SET_AUTHORITY_DATA: (state, authorityData) => {
      state.authorityData = authorityData
    },
    SET_DEPARTMENT_DATA: (state, departmentData) => {
      state.departmentData = departmentData
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            console.log(response)
            const data = response.data
            commit('SET_TOKEN', data.Data.token)
            commit('SET_USER', data.Data)
            setToken(response.data.Data.token)
            resolve(data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            if (!response.data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error')
            }
            const data = response.data

            if (data.Code === 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.Data)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }

            // commit('SET_USER', data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 公司树信息
    GetCompanyAllTree({ commit, state }, departmentData) {
      const p1 = new Promise((resolve, reject) => {
        GetCompanyAllTree(true)
          .then(response => {
            // console.log('寻人：')
            const data = response.data
            const arr = []
            arr.push(response.data.Data)
            sessionStorage.setItem('EmployeesList', '')
            sessionStorage.setItem('EmployeesList', JSON.stringify(arr))
            resolve(1)
          })
          .catch(error => {
            reject(error)
          })
      })
      const p2 = new Promise((resolve, reject) => {
        GetCompanyAllTree(false)
          .then(response => {
            // console.log('部门：')
            const data = response.data
            const arr = []
            arr.push(response.data.Data)
            sessionStorage.setItem('departmentsList', '')
            sessionStorage.setItem('departmentsList', JSON.stringify(arr))
            departmentData = JSON.stringify(arr)
            commit('SET_DEPARTMENT_DATA', departmentData)
            resolve(2)
          })
          .catch(error => {
            reject(error)
          })
      })
      Promise.race([p1, p2]).then((result) => {
        // console.log(result)
      })
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            sessionStorage.clear()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()

        removeMyToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },

    // 顶级菜单类型
    ChangeHeadMenuType({ commit, state }, headMenuType) {
      return new Promise(resolve => {
        commit('SET_HEAD_MENU_TYPE', headMenuType)
        resolve()
      })
    },
    // 财务初始化提示页面
    GetFinancialInitial({ commit, state }, financialInitial) {
      return new Promise((resolve, reject) => {
        finance.JudgeInitManageTip(state.token)
          .then((response) => {
            // console.log('判断是否设置财务初始化管理')
            // console.log(response.data)
            if (response.data.Successful) {
              financialInitial = response.data.Data
              commit('SET_FINANCIAL_INITIAL', financialInitial)
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取权限
    GetAuthority({ commit, state }, authorityData) {
      return new Promise((resolve, reject) => {
        authority.GetMyfunc(state.token)
          .then((response) => {
            if (response.data.successful) {
              // console.log('权限')
              // console.log(response.data)
              authorityData = response.data.Data
              commit('SET_AUTHORITY_DATA', authorityData)
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
