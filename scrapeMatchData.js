/*
*   scrapeMatchData.js
*   Daniel Posse
*   
*   Reads in array of url strings created by scrapeTournamentData.js
*   scrapes match data from smash.gg brackets
*/

// import modules
const axios = require('axios');
const fs    = require('fs');
const parse = require('csv-parse');

let parser = parse({delimiter: ','}, function(err, data) {
    console.log(data);
});

fs.createReadStream('tournamentData.csv').pipe(parser);



/*
*   original code to scrape brackets from array of urls

function scrapeBrackets() {
  
    //find all urls to scrape
    let urls = tournamentData.map( tournament => tournament.url );
  
    
    
    return new Promise( (resolve, reject) => {
  
        request("https://www.ssbwiki.com/Tournament:Sky%27s_Ultimate_Invitational", function(error, response,body) {
  
          if (!error && response.statusCode === 200) {
  
            $ = cheerio.load(body);
  
            
  
            resolve();
  
          } //end if
  
          else { reject(); }
  
        }); //end request
  
    }); //end promise
  } //end scrapeBrackets*/