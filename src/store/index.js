import Vue from 'vue'
import Vuex from 'vuex'
import pipeline from './modules/pipeline'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    pipeline,
  },
  getters,
})

export default store
