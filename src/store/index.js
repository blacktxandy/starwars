import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cors from 'cors'

Vue.use(Vuex)
Vue.use(cors)

export default new Vuex.Store({
  state: {
    people: [],
    next: 'http://swapi.dev/api/people/',
    times: 0,
    count: 0,
    urls: [],
    loaded: false,
    selected: {},
    paralelo: [],
  },
  mutations: {
    loadAllPeople(state) {
      for (let n of state.urls) {
        console.log(n)
        axios.get(n).then((r) => {
          state.people = state.people.concat(r.data.results)
        })
      }
      axios.get('https://akabab.github.io/starwars-api/api/all.json').then((r) => {
        state.paralelo = r.data
      })
    },
    loadParameters(state) {
      axios.get('http://swapi.dev/api/people/').then((r) => {
        state.count = r.data.count
        state.times = state.count / 10

        state.people = r.data.results
        state.next = r.data.next
        state.count % 10 ? state.times++ : false
        for (let index = 2; index < state.times; index++) {
          axios.get('http://swapi.dev/api/people/?page=' + index).then((r) => {
            state.people = state.people.concat(r.data.results)
          })
        }
        state.loaded = true
      })
    },
    setSelected(state, payload) {
      state.selected = state.people[payload - 1]
      for (const [i, n] of state.people.entries()) {
        if (n.url == 'http://swapi.dev/api/people/' + payload + '/') {
          state.selected = state.people[i]
        }
      }
      for (const [i, n] of state.paralelo.entries()) {
        if (state.selected.name == n.name) {
          state.selected.image = n.image
          state.selected.iterator = i
        }
      }
    },
  },
  actions: {
    loadAllPeople(context) {
      context.commit('loadParameters')
      context.commit('loadAllPeople')
    },
  },
  modules: {},
  getters: {
    getPeople(state) {
      return state.people
    },
    getLoaded(state) {
      return state.loaded
    },
    getCharacter(state) {
      return state.selected
    },
  },
})
