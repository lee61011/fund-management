/*
 * @Author: **
 * @Date: 2021-01-31 16:05:21
 * @LastEditTime: 2021-02-02 18:28:11
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER: 'SET_USER'
}

const state = {
  isAuthenticated: false,
  user: {}, // 根据token解析用户信息
}
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}
const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user
    else state.user = {}
  }
}
const actions = {
  setAuthenticated: ({commit}, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated)
  },
  setUser: ({commit}, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({commit}) => {
    commit(types.SET_AUTHENTICATED, false)
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
  state,
  getters,
  mutations,
  actions
})
