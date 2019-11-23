<template lang="pug">
  .product-list
    ul(v-for='product in products')
      li {{ product.name }}
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

<style lang="scss" scoped></style>
