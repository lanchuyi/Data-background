import { loginAPI } from '@/api/user'
import { setToken, getToken, delToken } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      token: getToken() || ''
    }
  },
  mutations: {
    setUserToken (state, payLoad) {
      state.token = payLoad
      setToken(payLoad)
    },
    delUserToken (state) {
      state.token = ''
      delToken()
    }
  },
  actions: {
    async loginActions ({ commit }, formobj) {
      try {
        const res = await loginAPI(formobj)
        commit('setUserToken', res.data.token)
        console.log(res)
      } catch (error) {
        console.error('请求失败:', error)
      }
    }
  }
}
