import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/util/storage'
import {
  getTOKEN,
  setTOKEN,
  getHISTORY,
  setHISTORY,
  removeHISTORY
} from '@/util/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN')) || {}
    // tokenObj: storage.get('HEIMA_TOUTIAO_TOKEN') || {}
    tokenObj: getTOKEN() || {},
    history: getHISTORY() || []
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
      // storage.set('HEIMA_TOUTIAO_TOKEN', payload)
      setTOKEN(payload)
    },
    SET_HISTORY(state, payload) {
      if (state.history.indexOf(payload) !== -1) {
        const index = state.history.indexOf(payload)
        state.history.splice(index, 1)
      }
      state.history.unshift(payload)
      setHISTORY(state.history)
    },
    REMOVE_HISTORY(state) {
      removeHISTORY()
      state.history = []
    }
  },
  actions: {},
  modules: {}
})
