<template lang="pug">
  .product-list
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
        v-btn(color='orange') 詳細へ
        v-btn(color='primary' :loading='isFetching' :disabled='isFetching' dark @click='() => addToCart(index)') カートに追加
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductList',
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('products', ['products']),
    ...mapGetters('cart', ['isFetching'])
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),
    ...mapActions('cart', ['addItem']),

    addToCart(index) {
      this.addItem(this.products[index])
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  min-width: 100%;
  justify-content: space-around;
}
</style>
