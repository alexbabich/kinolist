import Vue from 'vue'
import Vuex from 'vuex'

import defaultState from './default'
import API from './apiURL'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const store = new Vuex.Store({
    modules: {
      defaultState,
      API
    }
  })

  return store
}
