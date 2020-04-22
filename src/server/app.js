const winston = require('winston');
const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const ScoreParser = require('./model/score-parser');
const PdfScoreExporter = require('./model/score-exporter').PdfScoreExporter;

const axios = require('axios');

const logger = winston.createLogger({
   level: 'info',
   format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
   transports: [
      new winston.transports.Console()
   ]
});

process.on('exit', code => logger.warn("Shutting down"))

/*
const httpPort = 3000;

const app = express();
app.use(helmet());
app.use(routes);

app.listen(httpPort);
console.log(`Express started on port ${httpPort}`);
*/

axios.get('https://musescore.com/user/147969/scores/159038')
   .then(function (response) {
      let parser = new ScoreParser('whatever');
      let score = parser.parse(response.data);
      console.log(score.pageUrls());
      new PdfScoreExporter().export(score);
   })

