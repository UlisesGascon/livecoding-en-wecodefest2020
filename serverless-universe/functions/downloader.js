const got = require('got');

const downloadJson = (url) => got(url).then(res => JSON.parse(res.body))

const downloadRelays = async () => {
    const url = "https://onionoo.torproject.org/details"
    const data = await downloadJson(url)
    return data.relays
}

module.exports = { downloadRelays }