/*
*   scrapeMatchData.js
*   Daniel Posse
*   
*   Reads in array of url strings created by scrapeTournamentData.js
*   scrapes match data from smash.gg brackets
*/

debugger;

// import modules
const axios   = require('axios');
const fs      = require('fs');
const csv     = require('fast-csv');
const cheerio = require('cheerio');

csv.fromPath('tournamentData.csv', {headers: true})
    .on('data', async (data) => {
        
        /**
         * Data object looks like
         *  {
         *      name: tournament name
         *      date: tournament date
         *      entrants: number of players
         *      winner: tournament winner
         *      url: ssbwiki page for tournament
         *  }
         * 
         */
        console.log(data);

        /**
         * TODO
         *  [X] - go to data.url
         *  [X] - find bracket link
         *  [ ] - go to bracket url
         *  [ ] - bracket matches into database
         */
        
        let bracketUrl = await findBracketUrl(data.url);

        //get out of current iteration if we got undefined for bracketUrl
        if (bracketUrl === undefined)
            return;

        console.log(bracketUrl);
        // find out if link is smash.gg or challonge.com
        let smashRegExp = /smash.gg/;
        let challongeRegExp = /challonge.com/; 

        //checking for smash.gg first since most tournaments listed there
        if ( bracketUrl.match(smashRegExp) !== null ) {
            //console.log('this tournament is on smash.gg\n');
        }

        else if ( bracketUrl.match(challongeRegExp) !== null ) {
            //console.log('this tournament is on challonge.com\n');
        }

        else {
            //console.log('Tournament not listed on smash.gg or challonge.com');
        }

    })
    .on('end', () => {
        console.log('hey im done');
    });



async function findBracketUrl( tournamentUrl ) {

    let url;
    
    const response = await axios.get(tournamentUrl);

    /*console.log(response.data); works, throws out way too much html */
    /* axios reponse object: {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {}
    }
    */

    /*
     * Current html layout:
     *  Under the "Results" section in any tournament page there is 
     * <span class="mw-headline" id="Super_Smash_Bros._Ultimate_singles">
     *  <i>
     *      <a href="/Super_Smash_Bros._Ultimate" title="Super Smash Bros. Ultimate">Super Smash Bros. Ultimate</a>
     *  </i> singles
     * </span>
     * 
     * currently get all spans with class mw-headline with cheerio, then iterate through and find the one with correct id
     *  possible improvement - find a way to get straight to id. $('#Super_Smash_Bros._Ultimate_singles') doesn't work?
     */

    const $ = cheerio.load(response.data);
    const headlines = $('span.mw-headline');

    headlines.each( (index,headline) => {

        if ( $(headline).attr('id') === 'Super_Smash_Bros._Ultimate_singles') {
            
            /*
            *   $(headline).html() returns
            *       "<i><a href="[link]" title="...">Super...</a></i> singles"
            *   this is the html inside the span
            */
            
            /*
                HTML layout of ssbwiki tournament pages:

                <h3>
                    <!-- HERE IS THE SPAN WE FIND FROM HEADLINES -->
                    <span class="mw-headline" id="Super_Smash_Bros._Ultimate_singles">
                        <i>
                            <a href="/Super_Smash_Bros._Ultimate" title="...">[...]</a>
                        </i>
                        " singles"
                    </span>
                </h3>
                <p>
                    "([num entrants] entrants)"
                    <br>
                    <!-- HERE IS THE a ELEMENT WITH THE URL WE WANT -->
                    <a href="[link to smash.gg or challonge.com page]">Top [#] bracket</a>
                    <!-- more bracket links below if applicable -->
                </p>

             */

            url = $(headline).parent().next().children().next().first().attr('href');
            //console.log(url);

        } //end if

    }); //end each

    return url;

} //end findBracketUrl