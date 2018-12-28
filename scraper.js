const request = require('request');
const cheerio = require('cheerio');

var url = "http://www.google.com";

request(url, function(error, response, body) {

  if (!error) {

      const $ = cheerio.load(body);


  }//end if

});

console.log("no errors :O");
