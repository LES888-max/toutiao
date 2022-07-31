import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/util/storage'
import { getTOKEN, setTOKEN } from '@/util/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN')) || {}
    // tokenObj: storage.get('HEIMA_TOUTIAO_TOKEN') || {}
    tokenObj: getTOKEN() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
      // storage.set('HEIMA_TOUTIAO_TOKEN', payload)
      setTOKEN(payload)
    }
  },
  actions: {},
  modules: {}
})
