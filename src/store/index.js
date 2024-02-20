import Vue from 'vue'
import Vuex from 'vuex'
import userModel from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModel
  }
})
