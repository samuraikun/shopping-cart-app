<template lang="pug">
.t-header-and-main
  .t-header-and-main__header
    slot(name="header")
  .t-header-and-main__main
    slot(name="main")
</template>

<script>
export default {
  name: 'HeaderAndMain',
  props: {
    hasHeaderBorder: {
      type: Boolean,
      required: false,
      default: true
    },
    wideHeader: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    headerStyleClass() {
      return `${
        this.hasHeaderBorder ? '' : 't-header-and-main--without-header-border'
      } ${this.wideHeader ? 't-header-and-main--wide-header' : ''}`
    }
  }
}
</script>

<style lang="scss">
.t-header-and-main {
  display: grid;
  grid-template:
    'header header header' 50px
    '   .      .      .  ' 70px
    '   .     main    .  ' 1fr
    '   .      .      .  ' 80px
    / 40px 1fr 40px;

  &--wide-header {
    grid-template:
      'header header header' 70px
      '   .      .      .  ' 70px
      '   .     main    .  ' 1fr
      '   .      .      .  ' 80px
      / 40px 1fr 40px;
  }

  &--without-header-border {
    border: none;
  }

  &__header {
    box-sizing: border-box;
    grid-area: header;
    border-bottom: 1px solid #eeeeee;
  }

  &__main {
    grid-area: main;
  }
}
</style>
