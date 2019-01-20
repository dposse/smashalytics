//import libraries
const request = require('request');
const cheerio = require('cheerio');
const fs      = require('fs');

//initialize variables
const url = "https://www.ssbwiki.com/List_of_national_tournaments";
var $;
var tournamentData = [];

/*
* initial scraping function
* finds table of tournament results on wiki page and adds them to tournamentData
*/
function scrapeTables() {
  return new Promise( (resolve, reject) => {

    request(url, function(error, response, body) {

      if (!error && response.statusCode == 200) {

        $ = cheerio.load(body);

        $('span.mw-headline').each( (index, element) => {

            if ($(element).attr('id') == "Super_Smash_Bros._Ultimate") {

              /*
                Current setup of smashwiki:
                <h2>
                  <span class="mw-headline" id="Super_Smash_Bros._Ultimate">
                    <i>
                      <a href="/Super_Smash_Bros._Ultimate" title="Super Smash Bros. Ultimate">Super Smash Bros. Ultimate</a>
                    </i>
                  </span>
                  <span class="mw-editsection">
                    ...
                  </span>
                </h2>
                <h3> [year of tournament table] </h3>
                <table class="wikitable collabsible uncollapsed" style="text-align:center">
                  <tbody>
                    <tr> [table titles] </tr>
                    <tr> [TOURNAMENT INFO WE WANT] </tr>

                have already found the span with id for smash ultimate.
                .parent() returns h2, game title
                .next() returns h3, year of tournaments in next table
                .next() returns table that we want, table of tournaments in 2018

                .children() returns tbody
                .children() returns all the tr
                .next() skips first tr which has table titles but no tournament information
              */

              //get data from 2018 national tournaments
              insertTableData($(element).parent().next().next()
                                             .children().children().next());

              //get data from 2019 national tournaments
              //from 2018 table, one .next() gets h3 with 2019
              //  second .next() gets table of tournaments
              insertTableData($(element).parent().next().next().next().next()
                                            .children().children().next());

            } //end if span id == ultimate

        }); //end $(span).each( (index, element) => {});

        resolve();

      } //end if

      else {  reject();  }

    }); //end request

  }); //end promise
} //end scrapeTables


/*
*   second scraping function
*   goes to the urls in tournamentData, scrapes data from brackets
*/
function scrapeBrackets() {
  return new Promise( (resolve, reject) => {

      //TODO: put resolve and reject in request function

  }); //end promise
} //end scrapeBrackets


/*
*   write to csv
*/
function writeToCsv() {

  var file = fs.createWriteStream('tournamentData.csv');

  file.on('error', (err) => { console.log(err) });

  //write top level tournament data
  tournamentData.forEach( (row) => {

    file.write(
      [ row.name,
        row.date,
        row.entrants,
        row.winner,
        row.url ].join(',') + '\n'
    );

  });

  //need to write bracket data

  file.end();

} //end writeToCsv

/*
*   helper function
*   input is a table of data
*   creates tournament object and adds to tournamentData array
*/
function insertTableData(table) {

  $(table).each( (index, row) => {

    var namehtml = $(row).children().html();
    var name = $(namehtml).text();
    var date  = $(row).children().next().html();
    var entrants = $(row).children().next().next().html();
    var winnerhtml = $(row).children().next().next().next().html();
    var winner = $(winnerhtml).text().trim();
    var url = "https://www.ssbwiki.com" + $(namehtml).attr('href');

    // apparently "TBD" as winner evaluates to false
    if (winner) {
      var tournament = {  name: name,
                          date: date,
                          entrants: entrants,
                          winner: winner,
                          url: url };

      tournamentData.push(tournament);

      console.log("Tournament %i added: %s",(index+1),name);

    } //end if

  }); //end $(tableOfResults).each( (index, row) => {});

} //end insertTableData

/*
* "main"
* first scrapeTables from top level ssbwiki page
* second scrapeBrackets from individual tournament pages
* third write to csv
*/

scrapeTables()
  .then(scrapeBrackets())
  .then(writeToCsv) // doesn't work with parens?! writeToCsv()

  .catch( (err) => {
    console.log(err);
  });
