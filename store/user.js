import cloneDeep from 'lodash.clonedeep'
import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  user: state => state.user,
  isAuthenticated: state => !!state.user
}

export const mutations = {
  setUser(state, { user }) {
    state.user = cloneDeep(user)
  }
}

export const actions = {
  loginByGoogle({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()

    return new Promise((resolve, reject) => {
      try {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            commit('setUser', { user: result.user })
            resolve()
          })
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }
}
