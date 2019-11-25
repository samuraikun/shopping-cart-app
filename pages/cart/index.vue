<template lang="pug">
  .cart-products
    template(v-if='products.length > 0')
      v-card(v-for='(product, index) in products' :key='index' class='mx-auto' width='400' outlined)
        v-img(
          class="white--text align-end"
          height="200px"
          src="https://picsum.photos/400?random=1"
        )
        v-card-title
          | {{ product.name }}
        v-card-text(class='text--primary')
          p {{ product.description }}
        v-card-title
          p {{ product.price }}円
        v-card-actions
          v-btn(color='primary' dark @click='() => removeFromCart(products[index].id)') カートから削除
    template(v-else)
      div(:style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }")
        h1  カートにはまだなにもありません。
        img(src='https://firebasestorage.googleapis.com/v0/b/shopping-cart-app-a3334.appspot.com/o/nanika_kae.jpg?alt=media&token=b015058b-0fc9-402b-83a4-592329e62f37')
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('cart', { products: 'items' })
  },
  created() {
    this.fetchItems()
  },
  methods: {
    ...mapActions('cart', ['fetchItems', 'deleteItem']),

    removeFromCart(productId) {
      this.deleteItem(productId)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-products {
  display: flex;
  min-width: 100%;
  justify-content: space-around;
}
</style>
