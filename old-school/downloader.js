const got = require('got');

const downloadJson = (url) => got(url).then(res => JSON.parse(res.body))

const downloadRelays = async () => {}

module.exports = { downloadRelays }