const express = require('express');
const bodyParser = require('body-parser');
const rest = require('restler');
const app = express();

const groupMeUrl  = process.env.GM_URL;
const port = process.env.FF_PORT;
const calloutResponses = [
  'Ayyyyyy, please smash the like.',
  'Ayy, we are begging you for that re-Vine.',
  'pffffffft...',
  'lmao',
  'We are sleeping. Please contact us l8r boi.',
  'Stop.',
  'STAHP',
  'Whom is this?',
  'IDK fam. Beat Sig Ep or something.',
  'k',
  'Whomst\'d',
  'Whom',
  'Boomer sooner',
  'B sure to check out OG Bootymouth on Soundcloud',
  'It\'s not 4:20, lmao, leave me alone',
  'Back row dancers unite! You have nothing to lose but your chains!',
  'Please follow @official_meme_machine for the latest in memes'
];

app.use(bodyParser.json());

const reg = /@TheFourFounders/;
const whom = /(^[Ww]ho\s|\s[Ww]ho\s|\s[Ww]ho\.|\s[Ww]ho$|^[Ww]ho$)/;

const message = {
  'bot_id'  : process.env.FF_ID,
};

const getNewMessage = function () {
  return Object.assign({}, message);
};

const correctThenCallout = function () {
  var m = getNewMessage();
  m.text = "First of all... *whom";
  rest.postJson(groupMeUrl, m).on('complete', secondly);
};

const secondly = function () {
  var m = getNewMessage();
  m.text = "Secondly...";
  rest.postJson(groupMeUrl, m).on('complete', calloutFourFounders);
};

const calloutFourFounders = function () {
  var m = getNewMessage();
  var randMessage = calloutResponses[Math.floor(Math.random() * calloutResponses.length)];
  m.text = randMessage;
  rest.postJson(groupMeUrl, m);
};

const correctWho = function () {
  var m = getNewMessage();
  m.text = '*whom';
  rest.postJson(groupMeUrl, m);
};

const respondToWarren = function () {
  var m = getNewMessage();
  m.text = "@WarrenACole Ayyy fam, I see you ;)";
  rest.postJson(groupMeUrl, m);
};

app.post('/', function (req, res) {
  var body = req.body;
  
  switch (body.name) {
    case 'The Four Founders':
      return;
    case 'Warren A. Cole':
      if (reg.exec(body.text)) { respondToWarren(); }
      return;
    default:
      break;
  }

  if (reg.exec(body.text) && whom.exec(body.text)) { correctThenCallout(); }
  else if (reg.exec(body.text)) { calloutFourFounders(); }
  else if (whom.exec(body.text)) { correctWho(); }
});

app.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});
