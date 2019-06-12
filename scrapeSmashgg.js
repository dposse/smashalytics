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

  /**
   * HTML layout of smash.gg brackets:
   * 
   * 8 nested divs for whole bracket section?? class="bracket" and class="bracket-content"
   * 
   * <div> //no class? but winners brackets
   *  <div> [bracket headers i.e. winners quarter final, semi final etc]</div>
   *  <div class="sgg2qW2i"> //randomly generated class?
   *    <svg></svg>
   *     ...
   *    <svg></svg>  //multiple svgs that draw the lines that connect matches
   *  
   * 
   *    //HERE ARE THE DIVS WE WANT FOR NOW - here is the layout of one but there are many
   *    <div class="match has-identifier reportable" style="position: absolute; left: ...; top: ...; width: 180px;">
   *      <div class="match-affix-wrapper">
   *        <div class="match-section match-section-top">
   *          <div class="matchSectionWrapper">
   *            
   *          </div>
   *        </div>
   *      </div>
   *    </div>
   * 
   *  </div>
   * </div>
   * 
   * <div> //no class? but losers brackets
   * 
   * </div>
   * 
   * 
   */

  const matchDivs = $("div.match has-identifier reportable");

  console.log(matchDivs);

};


//hard coded test
scrapeSmashgg('https://smash.gg/tournament/the-final-smash-invitational/events/ultimate-singles/brackets/483248/844548/');