const SET_WINDOW_INNER_HEIGHT = 'SET_WINDOW_INNER_HEIGHT'
const SET_WINDOW_INNER_WIDTH  = 'SET_WINDOW_INNER_WIDTH'

const state = {
  windowInnerWidth: window.innerWidth,
  windowInnerHeight: window.innerHeight
}

const mutations = {
  [SET_WINDOW_INNER_HEIGHT]: (state, windowInnerHeight) => {
    state.windowInnerHeight = windowInnerHeight
  },
  [SET_WINDOW_INNER_WIDTH]: (state, windowInnerWidth) => {
    state.windowInnerWidth = windowInnerWidth
  }
}

const actions = {
  updateWindowSize({ commit }) {
    commit(SET_WINDOW_INNER_HEIGHT, window.innerHeight)
    commit(SET_WINDOW_INNER_WIDTH, window.innerWidth)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
