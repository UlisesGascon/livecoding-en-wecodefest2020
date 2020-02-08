const express = require('express');
const cors = require('cors')
const {addRelay, getAllRelays, getRelayDetails, getRelaysByContry} = require('./store')

const app = express();

app.use(cors())

app.get('/api/v1/relays', async (req, res) => {
  const msg = "All the relays"
  res.json(msg);
});

app.get('/api/v1/relays/:fingerprint', async (req, res) => {
  const { fingerprint } = req.params
  const msg = `The details for relay: ${fingerprint}`
  res.json(msg);
});

app.get('/api/v1/relays/country/:countryCode', async (req, res) => {
  const { fingerprint } = req.params
  const msg = `The list of Relays in crontry code: ${fingerprint}`
  res.json(msg);
});

app.listen(3000, function () {
  console.log('Server running at port 3000!');
});