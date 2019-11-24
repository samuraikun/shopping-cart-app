<template lang="pug">
  .login-page
    .login-page__title
      h1 ログイン
    .login-page__form
      v-btn(@click='doLogin') Googleアカウントでログイン
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  name: 'Login',
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },
  async mounted() {
    const user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user))
    })
    this.setUser({ user })

    if (user) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions('user', ['loginByGoogle']),
    ...mapMutations('user', ['setUser']),

    doLogin() {
      this.loginByGoogle().then(() => {
        if (this.isAuthenticated) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
