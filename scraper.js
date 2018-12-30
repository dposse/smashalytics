const request = require('request');
const cheerio = require('cheerio');

var url = "https://www.ssbwiki.com/List_of_national_tournaments";

var tournamentData = [];

request(url, function(error, response, body) {

  if (error)
    return console.error(error);


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
          .parent() returns h2
          .next() returns h3
          .next() returns table that we want

          .children() returns tbody
          .children() returns all the tr
          .next() skips first tr which has table titles but no tournament information
        */

        var tableOfResults = $(element).parent().next().next()
                                       .children().children().next();

        $(tableOfResults).each( (index, element) => {
          console.log($(element).html());
        });


      }


  });



});
