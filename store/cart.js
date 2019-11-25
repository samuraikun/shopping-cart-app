import cloneDeep from 'lodash.clonedeep'
import firebase from '~/plugins/firebase'

export const state = () => ({
  items: [],
  isFetching: false
})

export const getters = {
  items: state => state.items,
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
  async fetchItems({ commit, rootGetters, state }) {
    if (state.isFetching) return
    commit('setIsFetching', true)

    try {
      const firestore = firebase.firestore()
      const userUid = rootGetters['user/user'].uid
      const customerRef = await firestore
        .collection('customers')
        .doc(userUid)
        .get()

      const result = customerRef.data()
      const customerCartRef = await result.cartRef
      const productsSnapshot = await customerCartRef
        .collection('products')
        .get()

      let products = []
      productsSnapshot.forEach(doc => {
        products.push(doc.data())
      })

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

      // カートに追加するProduct Documentを生成
      const addedProductDocRef = await customerCartRef
        .collection('products')
        .doc()
      // カートに追加するDocumentデータを生成
      // 各種必要なリレーションを定義。
      // belongs_to: products/{productID}, belongs_to: carts/{cartID}
      const newProduct = cloneDeep({
        ...product,
        id: addedProductDocRef.id,
        productRef: firestore.doc(`products/${product.id}`),
        cartRef: firestore.doc(`carts/${customerCartRef.id}`)
      })
      await addedProductDocRef.set(newProduct)

      commit('setItem', {
        product: newProduct
      })
    } catch (e) {
      console.log(e)
    } finally {
      commit('setIsFetching', false)
    }
  },
  async deleteItem({ commit, getters, rootGetters }, productId) {
    if (state.isFetching) return
    commit('setIsFetching', true)

    try {
      const prevItems = cloneDeep(getters.items)
      const firestore = firebase.firestore()
      const userUid = rootGetters['user/user'].uid
      const customerRef = await firestore
        .collection('customers')
        .doc(userUid)
        .get()

      const result = customerRef.data()
      const customerCartRef = await result.cartRef

      // Productの Document IDを取得するためにQuerySnapshotを取得
      const deletedProductSnapshot = await customerCartRef
        .collection('products')
        .where('id', '==', productId)
        .get()
      // 取得したQuerySnapshotから削除対象のProduct Document ID を取得してから削除する
      const productDocSnapshot = deletedProductSnapshot.docs[0]
      customerCartRef
        .collection('products')
        .doc(productDocSnapshot.id)
        .delete()

      const nextProducts = prevItems.filter(product => product.id !== productId)
      commit('setItems', { products: nextProducts })
    } catch (e) {
      console.log(e)
    } finally {
      commit('setIsFetching', false)
    }
  }
}
