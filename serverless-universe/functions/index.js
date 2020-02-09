const functions = require('firebase-functions');
const express = require('express');
const app = require('./routes');
const { hourlyCronjob } = require('./jobs')

const main = express();

main.use('/api/v1', app);

exports.relaysApi = functions.https.onRequest(main);
exports.hourlyCrontab = hourlyCronjob
