/*
*   second scraping function
*   goes to the urls in tournamentData, scrapes data from brackets
*/
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
  } //end scrapeBrackets