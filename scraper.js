//initialize things
const request = require('request');
const cheerio = require('cheerio');
const url = "https://www.ssbwiki.com/List_of_national_tournaments";
var tournamentData = [];

/*
* initial scraping function
* finds table of tournament results on wiki page and adds them to tournamentData
*/
function scrapeTables() {
  return new Promise( (resolve, reject) => {

    request(url, function(error, response, body) {

      if (!error && response.statusCode == 200) {

        const $ = cheerio.load(body);

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

              //tableOfResults includes 2018 national tournaments
              var tableOfResults = $(element).parent().next().next()
                                             .children().children().next();

              $(tableOfResults).each( (index, row) => {

                var namehtml = $(row).children().html();
                var name = $(namehtml).text();
                var date  = $(row).children().next().html();
                var entrants = $(row).children().next().next().html();
                var winnerhtml = $(row).children().next().next().next().html();
                var winner = $(winnerhtml).text().trim();
                var url = "https://www.ssbwiki.com" + $(namehtml).attr('href');

                console.log(name);
                console.log(date);
                console.log(entrants);
                console.log(winner);
                console.log(url);

                if (winner) {
                  var tournament = {  name: name,
                                      date: date,
                                      entrants: entrants,
                                      winner: winner,
                                      url: url };

                  tournamentData.push(tournament);

                  console.log("tournament added\n");

                }


              }); //end $(tableOfResults).each( (index, row) => {});


            } //end if span id == ultimate


        }); //end $(span).each( (index, element) => {});

        resolve();

      } //end if

      else {
        reject();
      }

    }); //end request

  });

} //end scrapeTables

scrapeTables().then( () => {
  for (var i=0; i<tournamentData.length; i++) {

      console.log(tournamentData[i].name);
      console.log(tournamentData[i].date);
      console.log(tournamentData[i].entrants);
      console.log(tournamentData[i].winner);
      console.log(tournamentData[i].url);
      console.log("\n");

  }
}).catch( (err) => {
  console.err(err);
});
