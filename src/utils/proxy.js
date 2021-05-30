/**
  This is a proxy server uses express middleware 
  to apply a Access-Control-Allow-Origin: * header 
  to every response and request the data from the Australia Post API
*/

const express = require("express");
const request = require("request");

const app = express();

// applies the Access-Control-Allow-Origin: * to that original response
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// set up a new API request to AusPost API
app.get("/getLocalities", (req, res) => {
  const config = {
    // get the suburb and state from the URL query string, then forward to the AusPost API
    url: `https://digitalapi.auspost.com.au/postcode/search.json?q=${req.query.suburb}
    &state=${req.query.state}`,
    method: "GET",
    headers: {
      "auth-key": "872608e3-4530-4c6a-a369-052accb03ca8",
    },
  };

  // make the API request and forward response back to original
  const newRequest = request(config);
  req
    .pipe(newRequest)
    .on("response", (response) => {
      delete response.headers["access-control-allow-origin"];
    })
    .pipe(res);
});

// set the port to listen on
const PORT = process.env.PORT || 8100;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
