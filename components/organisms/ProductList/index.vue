<template lang="pug">
  .product-list
    v-card(v-for='product in products' class='mx-auto' width='400' outlined)
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
        v-btn(color='primary' dark) カートに追加
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductList',
  computed: {
    ...mapGetters('products', ['products'])
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    ...mapActions('products', ['fetchProducts'])
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
