
const express = require("express");
const request = require('request');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// when express receives a request for ANY url...
app.get('/getLocalities', (req, res) => {
  // set up a new request to Auspost
  const config = {
    // get the suburb and state from the URL querystring, to forward on to Auspost
    url: `https://digitalapi.auspost.com.au/postcode/search.json?q=${req.query.suburb}
    &state=${req.query.state}`,
    method: 'GET',
    headers: {
      "auth-key": "872608e3-4530-4c6a-a369-052accb03ca8"
    }
  };

  // Make the API request, and forward response back to original,
  // removing the CORS header along the way
  const newRequest = request(config);
  req.pipe(newRequest)
  .on('response', (response)=> {
    delete response.headers['access-control-allow-origin'];
  })
  .pipe(res);
});

const PORT = process.env.PORT || 8100;
app.listen(PORT, () => console.log(`listening on ${PORT}`));