import { SESSION_STORAGE_KEYS } from "@/consts"

const SET_WINDOW_INNER_HEIGHT = 'SET_WINDOW_INNER_HEIGHT'
const SET_WINDOW_INNER_WIDTH  = 'SET_WINDOW_INNER_WIDTH'
const SET_LOCALE              = 'SET_LOCALE'

const state = {
  windowInnerWidth: window.innerWidth,
  windowInnerHeight: window.innerHeight,
  locale: (window.sessionStorage.getItem(SESSION_STORAGE_KEYS.LOCALE) || navigator.language || navigator.userLanguage || 'zh-cn').toLowerCase()
}

const mutations = {
  [SET_WINDOW_INNER_HEIGHT]: (state, windowInnerHeight) => {
    state.windowInnerHeight = windowInnerHeight
  },
  [SET_WINDOW_INNER_WIDTH]: (state, windowInnerWidth) => {
    state.windowInnerWidth = windowInnerWidth
  },
  [SET_LOCALE]: (state, locale) => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.LOCALE, locale.toLowerCase())
    state.locale = locale
  }
}

const actions = {
  updateWindowSize({ commit }) {
    commit(SET_WINDOW_INNER_HEIGHT, window.innerHeight)
    commit(SET_WINDOW_INNER_WIDTH, window.innerWidth)
  },
  setLocale({ commit }, locale) {
    commit(SET_LOCALE, locale)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
