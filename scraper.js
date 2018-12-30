const request = require('request');
const cheerio = require('cheerio');

var url = "https://www.ssbwiki.com/List_of_national_tournaments";

request(url, function(error, response, body) {

  if (error)
    return console.error(error);


  const $ = cheerio.load(body);

  $('span.mw-headline').each( (index, element) => {

      //var currentSubtitle = $(element).html();
      //console.log(currentSubtitle);

      if ($(element).attr('id') == "Super_Smash_Bros._Ultimate") {

        var tableOfResults = $(element).parent().next().next();

        console.log(tableOfResults.html());


      }


  });



});
