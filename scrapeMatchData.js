/*
*   scrapeMatchData.js
*   Daniel Posse
*   
*   Reads in array of url strings created by scrapeTournamentData.js
*   scrapes match data from smash.gg brackets
*/

// import modules
const axios   = require('axios');
const fs      = require('fs');
const csv     = require('fast-csv');
const cheerio = require('cheerio');

csv.fromPath('tournamentData.csv', {headers: true})
    .on('data', data => {
        
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
         *  [ ] - find bracket link
         *  [ ] - go to bracket url
         *  [ ] - bracket matches into database
         */
        
         let bracketUrl = findBracketUrl(data.url);



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
     */

    const $ = cheerio.load(response.data);
    const headlines = $('span.mw-headline');

    headlines.each( (index,headline) => {

        if ( $(headline).attr('id') === 'Super_Smash_Bros._Ultimate_singles') {

            console.log('found it', index);
            console.log($(headline).html());

        } //end if

    }); //end each

    return url;

} //end findBracketUrl