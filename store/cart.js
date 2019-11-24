import cloneDeep from 'lodash.clonedeep'
import firebase from '~/plugins/firebase'

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
  async addItem({ commit, rootGetters }, product) {
    if (state.isFetching) return
    commit('setIsFetching', true)

    try {
      // UserドキュメントからCartドキュメントを取得
      const firestore = firebase.firestore()
      const userUid = rootGetters['user/user'].uid
      const customerRef = await firestore
        .collection('customers')
        .doc(userUid)
        .get()

      const result = customerRef.data()
      const customerCartRef = await result.cartRef

      const addedProductRef = await customerCartRef
        .collection('products')
        .add(product)
      const addedProductSnapshot = await addedProductRef.get()
      const addedProduct = addedProductSnapshot.data()
      commit('setItem', { product: cloneDeep(addedProduct) })
    } catch (e) {
      console.log(e)
    } finally {
      commit('setIsFetching', false)
    }
  }
}
