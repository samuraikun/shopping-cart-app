<template lang="pug">
  HeaderAndMain(:wideHeader="true")
    template(slot="header")
      AppHeader
    template(slot="main")
      nuxt
</template>

<script>
import HeaderAndMain from '../components/templates/HeaderAndMain'
import AppHeader from '../components/organisms/AppHeader'

export default {
  name: 'Default',
  components: { HeaderAndMain, AppHeader }
}
</script>
