import request from '@/utils/request'
import { setMyCompanys } from '@/utils/sessionStorage'

const company = {
  state: {
    CompanyCode: '',
    LogoFormatUrl: '',
    CompanyName: ''
  },
  mutations: {
    SET_COMPANY: (state, company) => {
      state.CompanyCode = company.CompanyCode
      state.CompanyName = company.CompanyName
      state.LogoFormatUrl = company.LOGFormatUrl
    }
  },
  actions: {
    GetCompany({ commit }) {
      return new Promise((resolve, reject) => {
        request
          .get('apix/company/myCompany')
          .then(res => {
            // console.log(res.data.Data)
            if (!res.data.Code) {
              setMyCompanys(JSON.stringify(res.data))
              var last = res.data.Data.filter(c => c.LastEnter)
              const data = last.length === 0 ? res.data.Data[0] : last[0]
              commit('SET_COMPANY', data)
              if (resolve) resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default company
