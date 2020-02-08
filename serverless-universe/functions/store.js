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
  const data = []
  const querySnapshot = await relaysCollection.limit(200).get()
  querySnapshot.forEach(doc => data.push(doc.data()));
  return data;
}

const getRelayDetails = async (fingerprint) => {
  const doc = await relaysCollection.doc(fingerprint).get()
  return doc.exists ? doc.data() : null;
}

const getRelaysByContry = async (countryCode) => {
  const data = []
  const querySnapshot = await relaysCollection.where('country', '==', countryCode).get()
  querySnapshot.forEach(doc => data.push(doc.data()));
  return data;
}

module.exports = {addRelay, getAllRelays, getRelayDetails, getRelaysByContry}