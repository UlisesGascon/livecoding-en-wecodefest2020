const functions = require('firebase-functions');

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB'
}

const hourlyCronjob = functions.runWith(runtimeOpts).region('us-central1').pubsub.schedule('0 * * * *').onRun(async (context) => {
    console.log('[CRON] START')
    //...
    console.log('[CRON] END')
  })

module.exports = { hourlyCronjob }
