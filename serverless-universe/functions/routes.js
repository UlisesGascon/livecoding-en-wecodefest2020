const express = require('express');
const app = express();

app.get('/example', (req, res) => {
  const msg = "This is an example"
  res.json(msg)
});

module.exports = app