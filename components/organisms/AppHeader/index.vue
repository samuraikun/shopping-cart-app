<template lang="pug">
  header.shopping-cart-header
    img.shopping-cart-header__logo(:src="logoSrc")
    .shopping-cart-header__title
      nuxt-link.shopping-cart-header__title__link(to='/')
        | Shopping Cart App
    .shopping-cart-header__login
      button.shopping-cart-header__login__button ログイン
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
    auto auto 5px auto 1fr auto 5px auto;
  height: 100%;
  background-color: #ffffff;

  &__title {
    grid-area: title;

    &__link {
      text-decoration: none;

      &:hover {
        cursor: pointer;
      }
    }
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

    &__button {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 120px;
      height: 30px;
      padding: 0 20px;
      font-size: 13px;
      font-weight: bold;
      line-height: 1;
      text-decoration: none;
      letter-spacing: 0.5px;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      border: 1px solid #333333;
      border-radius: 3px;
      outline: none;
      transition: 0.3s background, 0.5s transform cubic-bezier(0, 0.94, 0.06, 1);
      appearance: none;
      transform: perspective(1000px) translateZ(0px);

      &:active {
        transform: perspective(1000px) translateZ(-15px);
      }

      &:hover,
      &:active {
        color: #ffffff;
        background-color: #3a9a59;
        border: 1px solid transparent;
      }
    }
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
