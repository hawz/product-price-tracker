import TrackingRepository from '~/services/tracking/TrackingRepository'

// Make module namespaced
const namespaced = true

const defaultState = () => ({
  productURL: '',
  prices: [],
  loading: false,
  itemStoreID: '',
  itemInfo: null,
})

// initial state
const state = defaultState

const getters = {}

const actions = {
  setLoading({ commit }, loading) {
    commit('setLoading', loading)
  },
  setItemStoreID({ commit }, id) {
    commit('setItemStoreID', id)
  },
  setItemInfo({ commit }, itemInfo) {
    commit('setItemInfo', itemInfo)
  },
  async getPrices({ state, dispatch, commit }, productURL) {
    commit('setPrices', [])
    commit('setItemInfo', null)
    dispatch('setLoading', true)
    try {
      const parsedURL = productURL.match(/product=([^&]*)/)
      commit('setItemStoreID', parsedURL[1])
      const result = await TrackingRepository.getPrices(state.itemStoreID)
      commit('setPrices', result.data.data)
      commit('setItemInfo', result.data.item_info)
      dispatch('setLoading', false)
      return Promise.resolve(result.data.data)
    } catch (error) {
      commit('setPrices', [])
      commit('setItemInfo', null)
      dispatch('setLoading', false)
      return Promise.reject(error)
    }
  },
  setPrices({ commit }, prices) {
    commit('setPrices', prices)
  },
  async subscribeAlert({ dispatch, commit }, payload) {
    dispatch('setLoading', true)
    try {
      const {
        data: { data },
      } = await TrackingRepository.subscribeAlert(payload)
      dispatch('setLoading', false)
      return Promise.resolve(data)
    } catch (error) {
      dispatch('setLoading', false)
      return Promise.reject(error)
    }
  },
  unsubscribeAlert({ commit }, payload) {},
}

const mutations = {
  setPrices(state, prices) {
    state.prices = prices
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setItemStoreID(state, id) {
    state.itemStoreID = id
  },
  setItemInfo(state, itemInfo) {
    state.itemInfo = itemInfo 
  },
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
