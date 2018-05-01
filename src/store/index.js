import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import users from './users'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    example,
    users
  }
})

export default store
