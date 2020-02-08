const { downloadRelays } = require('./downloader');
const { addRelay } = require('./store')
const { writeFileSync } = require("fs");

const uploadRelays =  async() => {
};

uploadRelays().then(console.log).catch(console.error)
