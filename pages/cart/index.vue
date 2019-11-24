<template lang="pug">
  p {{ cart.name }}
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
  name: 'Cart',
  data() {
    return {
      cart: null
    }
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  async mounted() {
    const firestore = firebase.firestore()
    const userSnapshot = await firestore
      .collection('customers')
      .doc(this.user.uid)
      .get()
    const result = userSnapshot.data()
    const userCart = await result.cartRef.get()
    this.cart = userCart.data()
  }
}
</script>

<style lang="scss" scoped></style>
