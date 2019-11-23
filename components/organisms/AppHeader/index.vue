<template lang="pug">
  header.shopping-cart-header
    img.shopping-cart-header__logo(:src="logoSrc")
    .shopping-cart-header__title
     | Shopping Cart App
    .shopping-cart-header__login
      button Login
    .shopping-cart-header__cart
      nuxt-link(to="/carts")
        img.shopping-cart-header__cart__logo(:src="logoSrc")
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    logoSrc: {
      type: String,
      required: false,
      default:
        'https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v2.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping-cart-header {
  display: grid;
  grid-template:
    ' .    .    .   .   .    .   .   .  ' 1fr
    ' .   logo  . title .  login . cart ' 22px
    ' .    .    .   .   .    .   .   .  ' 1fr /
    auto auto 3px auto 1fr auto auto auto;
  height: 100%;
  background-color: #ffffff;

  &__title {
    grid-area: title;
  }

  &__logo {
    grid-area: logo;
    align-self: center;
    justify-self: center;
    width: auto;
    height: 100%;
  }

  &__login {
    grid-area: login;
  }

  &__cart {
    grid-area: cart;
    cursor: pointer;

    &__logo {
      align-self: center;
      justify-self: center;
      width: auto;
      height: 100%;
    }
  }
}
</style>
