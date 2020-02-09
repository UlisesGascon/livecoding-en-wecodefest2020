const {getAllRelays, getRelayDetails, getRelaysByContry} = require("./store")
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

app.get('/api/v1/relays', async (req, res) => {
  const data = await getAllRelays()
  res.json(data);
});

app.get('/api/v1/relays/:fingerprint', async (req, res) => {
   const { fingerprint } = req.params
  const data = await getRelayDetails(fingerprint)
  if(!data) {
     const msg = `The relay you are asking for is not in the database. fingerprint: ${fingerprint}`
    return  res.status(404).json({msg})
  }
  return res.json(data);
});

app.get('/api/v1/relays/country/:countryCode', async (req, res) => {
  const { countryCode } = req.params
  const data = await getRelaysByContry(countryCode)
  res.json(data);
});

app.listen(3000, function () {
  console.log('Server running at port 3000!');
});