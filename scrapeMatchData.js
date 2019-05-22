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

let urls = [];

csv.fromPath('tournamentData.csv', {headers: true})
    .on('data', data => {
        console.log(data);
    })
    .on('end', () => {
        console.log('hey im done');
    });
