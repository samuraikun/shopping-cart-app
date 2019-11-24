// import firebase from '~/plugins/firebase'

export const state = () => ({
  items: [],
  isFetching: false
})

export const getters = {
  items: state => state.items,
  quantity: state => state.items.length,
  isFetching: state => state.isFetching
}

export const mutations = {
  setItems(state, { products }) {
    state.items = products
  },
  setItem(state, { product }) {
    state.items = state.items.push(...state.items, product)
  },
  setIsFetching(state, next) {
    state.isFetching = !!next
  }
}

export const actions = {
  fetchItems({ commit, state }) {
    if (state.isFetching) return
    commit('setIsFetching', true)

    try {
      const products = []
      commit('setItems', { products })
    } catch (e) {
      console.log(e)
    } finally {
      commit('setIsFetching', false)
    }
  },
  addItem({ commit }) {}
}
