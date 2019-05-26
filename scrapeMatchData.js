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
const csv   = require('fast-csv');

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
    
    let response = await axios.get(tournamentUrl);

    /*console.log(response.data); works, throws out way too much html */

    return url;

} //end findBracketUrl