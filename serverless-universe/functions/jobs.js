const functions = require('firebase-functions');
const { downloadRelays } = require('./downloader');
const { addRelay } = require('./store')


const uploadRelays =  async() => {
    const relays = await downloadRelays()
    console.log("Total Relays:", relays.length)
    await Promise.all(relays.map(addRelay))
};

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB'
}

const hourlyCronjob = functions.runWith(runtimeOpts).region('us-central1').pubsub.schedule('0 * * * *').onRun(async (context) => {
  console.log('[CRON] START')
	await uploadRelays()
  console.log('[CRON] END')
})

module.exports = { hourlyCronjob }
