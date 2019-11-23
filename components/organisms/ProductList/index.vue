<template lang="pug">
  .product-list
    v-card.mx-auto(max-width='344', outlined='')
      v-list-item(three-line='')
        v-list-item-content
          .overline.mb-4 OVERLINE
          v-list-item-title.headline.mb-1 Headline 5
          v-list-item-subtitle Greyhound divisely hello coldly fonwderfully
        v-list-item-avatar(tile='', size='80', color='grey')
      v-card-actions
        v-btn(text='') Button
        v-btn(text='') Button
</template>

<script>
export default {
  name: 'ProductList'
}
</script>

<style lang="scss" scoped></style>
