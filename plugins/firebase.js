import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBJuRc0HA0y_CjHPL8PFa8CAaAVEIM50Jw',
  authDomain: 'shopping-cart-app-a3334.firebaseapp.com',
  databaseURL: 'https://shopping-cart-app-a3334.firebaseio.com',
  projectId: 'shopping-cart-app-a3334',
  storageBucket: 'shopping-cart-app-a3334.appspot.com',
  messagingSenderId: '649194147486',
  appId: '1:649194147486:web:38ad599c69d8846297758f'
}

firebase.initializeApp(config)

export default firebase
