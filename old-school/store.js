const admin = require('firebase-admin');

const serviceAccount = require('../SECRETS/service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const relaysCollection = db.collection("relays")

const addRelay = () => {}

const getAllRelays = async () => {}

const getRelayDetails = async (fingerprint) => {}

const getRelaysByContry = async (countryCode) => {}

module.exports = {addRelay, getAllRelays, getRelayDetails, getRelaysByContry}