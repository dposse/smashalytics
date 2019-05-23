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
         *  [ ] - go to data.url
         *  [ ] - find bracket link
         *  [ ] - go to bracket url
         *  [ ] - bracket matches into database
         */


    })
    .on('end', () => {
        console.log('hey im done');
    });
