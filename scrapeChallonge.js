/*
 *   scrapeChallonge.js
 *   Daniel Posse
 *
 *   Reads in a url string that is a challonge.com link
 *    sends data to database
 */

const axios = require('axios');
const cheerio = require('cheerio');

const scrapeChallonge = async (url) => {

  const challongeResponse = await axios.get(url);
  const $ = cheerio.load(challongeResponse.data);

  console.log(challongeResponse.data);

};


//hard coded test
scrapeChallonge('https://challonge.com/SumabatoSP1T');