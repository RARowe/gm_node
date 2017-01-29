const express = require('express');
const bodyParser = require('body-parser');
const rest = require('restler');
const app = express();

const groupMeUrl  = process.env.GM_URL;
const port = process.env.WAC_PORT;

app.use(bodyParser.json());

const reg = /@WarrenACole/;
const rsh = /Real scandals hours\. WHOM UP\?/;

const message = {
  'bot_id'  : process.env.WAC_ID,
};

const getNewMessage = function () {
  return Object.assign({}, message);
};

const whoUp = function () {
  var m = getNewMessage();
  m.text = "@TheFourFounders yooooooo";
  rest.postJson(groupMeUrl, m);
};

const sleeping = function () {
  var m = getNewMessage();
  m.text = "I'm sleeping, B. Please leave a message.";
  rest.postJson(groupMeUrl, m);
};

app.post('/', function (req, res) {
  var body = req.body;

  if (body.name === 'The Four Founders' && rsh.exec(body.text)) { whoUp(); }
  else if (body.name !== 'The Four Founders' && reg.exec(body.text)) { sleeping(); }
});

app.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});
