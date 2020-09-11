import Vue from 'vue'
import Vuex from 'vuex'
import service from '../service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    countries: [],
    activeRound: null,
  },
  mutations: {
    SET_COUNTRIES(state, payload) {
      state.countries = payload
      state.ready = true
    },

    SET_ACTIVE_ROUND(state) {
      const randomIndex = Math.floor(Math.random() * state.countries.length)
      state.activeRound = state.countries[randomIndex]
    },
  },
  actions: {
    async initializeStore({ commit }) {
      const data = await service.getCountries()
      commit('SET_COUNTRIES', data)
    },
  },
})
