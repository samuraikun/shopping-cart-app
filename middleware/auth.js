export default function({ store, route, redirect }) {
  if (!store.getters['user/isAuthenticated'] && route.name !== 'login') {
    redirect('/login')
  }
  if (store.getters['user/isAuthenticated'] && route.name === 'login') {
    redirect('/')
  }
}
