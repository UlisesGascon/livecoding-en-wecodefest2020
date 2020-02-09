const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore();
const relaysCollection = db.collection("relays")

const addRelay = (relay) => {
  console.log(`Adding relay ${relay.fingerprint} (${relay.nickname})...`)
  return relaysCollection.doc(relay.fingerprint).set(relay)
}

const getAllRelays = async () => {
  const querySnapshot = await relaysCollection.limit(200).get()
  return querySnapshot.docs.map(doc => doc.data());
}

const getRelayDetails = async (fingerprint) => {
  const doc = await relaysCollection.doc(fingerprint).get()
  return doc.exists ? doc.data() : null;
}

const getRelaysByContry = async (countryCode) => {
  const querySnapshot = await relaysCollection.where('country', '==', countryCode).get()
  return querySnapshot.docs.map(doc => doc.data());
}

module.exports = {addRelay, getAllRelays, getRelayDetails, getRelaysByContry}