const { downloadRelays } = require('./downloader');
const { addRelay } = require('./store')
const { writeFileSync } = require("fs");

const uploadRelays =  async() => {
    const relays = await downloadRelays()
    console.log("Total Relays:", relays.length)
    writeFileSync("./data.json", JSON.stringify(relays, null, 2))
    await Promise.all(relays.map(addRelay))
};

module.exports = { uploadRelays }
