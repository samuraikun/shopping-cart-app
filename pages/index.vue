<template lang="pug">
HeaderAndMain(:wideHeader="true")
  template(slot="header")
    AppHeader
  template(slot="main")
    ProductList
</template>

<script>
import HeaderAndMain from '../components/templates/HeaderAndMain'
import AppHeader from '../components/organisms/AppHeader'
import ProductList from '../components/organisms/ProductList'

export default {
  name: 'App',
  components: { HeaderAndMain, AppHeader, ProductList }
}
</script>
