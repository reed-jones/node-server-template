import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    APP_NAME: 'Node spa preset',
    count: 1
  },
  getters: {
    appName: state => state.APP_NAME.replace(/^(.)|\s+(.)/g, firstLetter => firstLetter.toUpperCase())
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
})