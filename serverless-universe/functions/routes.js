const express = require('express');
const {getAllRelays, getRelayDetails, getRelaysByContry} = require("./store")
const app = express();

app.get('/relays', async (req, res) => {
  const data = await getAllRelays()
  res.json(data);
});

app.get('/relays/:fingerprint', async (req, res) => {
   const { fingerprint } = req.params
  const data = await getRelayDetails(fingerprint)
  if(!data) {
     const msg = `The relay you are asking for is not in the database. fingerprint: ${fingerprint}`
    return  res.status(404).json({msg})
  }
  return res.json(data);
});

app.get('/relays/country/:countryCode', async (req, res) => {
  const { countryCode } = req.params
  const data = await getRelaysByContry(countryCode)
  res.json(data);
});

module.exports = app