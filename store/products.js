import firebase from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  products: [],
  isFetching: false
})

export const getters = {
  products: state => state.products,
  isFetching: state => state.isFetching
}

export const mutations = {
  setProducts(state, { products }) {
    console.log(products)
    state.products = products
  },
  setIsFetching(state, next) {
    state.isFetching = !!next
  }
}

export const actions = {
  async fetchProducts({ commit, state }) {
    if (state.isFetching) return
    commit('setIsFetching', true)

    try {
      let products = []
      const firestore = firebase.firestore()
      const productSnapshot = await firestore
        .collection('products')
        .orderBy('createdAt', 'desc')
        .limit(30)
        .get()
      productSnapshot.forEach(productDoc => {
        products.push(productDoc.data())
      })

      commit('setProducts', { products })
    } catch (e) {
      console.log(e)
    } finally {
      commit('setIsFetching', false)
    }
  }
}
