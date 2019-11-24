const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./config/service_account.json')
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.databaseurl
  })
  admin.firestore().settings({ timestampsInSnapshots: true })
} catch (error) {
  console.log(error)
}

exports.saveUser = functions.auth.user().onCreate(async user => {
  try {
    const firestore = admin.firestore()
    const customer = await firestore.doc(`customers/${user.uid}`).create({
      uid: user.uid,
      name: user.displayName || '名無しさん',
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL || defaultUserIcon,
      phoneNumber: user.phoneNumber,
      providerData: {
        providerId:
          user.providerData.length === 0
            ? 'password'
            : user.providerData[0].providerId,
        uid:
          user.providerData.length === 0 ? user.email : user.providerData[0].uid
      },
      disabled: user.disabled,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Cartドキュメントの作成と reference型によるCustomerドキュメントとのリレーションの追加
    const cart = await firestore.collection('carts').add({
      name: 'カート1',
      isActive: true,
      customerRef: firestore.doc(`customers/${user.uid}`),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Cartsドキュメントに、Customerのreferenceをもたせる
    await firestore.doc(`customers/${user.uid}`).update({
      cartRef: firestore.doc(`carts/${cart.id}`)
    })

    console.log(
      `Save Customer info! Document written at: ${customer.writeTime.toDate()}`
    )
    console.log(`Save Cart info! Document ID: ${cart.id}`)
  } catch (error) {
    console.log(error)
  }
})
