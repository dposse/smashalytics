/*
 *   scrapeSmashgg.js
 *   Daniel Posse
 *
 *   Reads in a url string that is a smash.gg link
 *    sends data to database
 */

const axios = require('axios');
const cheerio = require('cheerio');

const scrapeSmashgg = async (url) => {

  const smashResponse = await axios.get(url);
  const $ = cheerio.load(smashResponse.data);

  console.log(smashResponse.data);

};


//hard coded test
scrapeSmashgg('https://smash.gg/tournament/the-final-smash-invitational/events/ultimate-singles/brackets/483248/844548/');