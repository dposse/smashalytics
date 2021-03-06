# smashalytics

Demo: https://dposse.github.io/smashalytics/

Data gathering and visualization project using tournament results from Super Smash Brothers games.

Scrapes data from ssbwiki. Will write to csv and use d3.js for visualization.

bubbleChart and future d3 charts created to be reusable, handle data and chart configuration in main.js

Run http-server locally for D3.js, i.e. VSCode live server extension

###### TODO in order:

   - [x] ~create helper function to read table row~
   - [x] ~get data from 2019 tournament table~
   - [x] ~write to csv~
   - [x] ~break down how to get bracket data~
   - [x] ~import csv to d3.js~
   - [X] ~basic data visualization~
     - [X] ~basic d3 force layout~
     - [X] ~modify force layout~
     - [X] ~add margin convention~
     - [X] ~add tooltips~
       - [X] ~tooltip animation on mouseover/mouseout~
       - [X] ~style tooltip~
     - [X] ~center chart on page~
     - [X] ~keep nodes within borders~ - not worrying about this, simulation keeps nodes inside window
     - [X] ~make nodes draggable~
   - [X] ~fix scraper.js - incorrectly reads entrants >1000 because of comma~
   - [X] ~clean scraper console output~
   - [X] ~change d3 force layout to accommodate the larger nodes~
   - [X] ~release alpha version - heroku?~ github pages works
   - [X] ~set node color based on winner~
   - [X] get to bracket data pages
     - [X] ~load pages scraped from tournament table (tournament.url)~
     - [X] ~find super smash bros ultimate id (h3 tag?)~
     - [X] ~find bracket link after id~
     - [X] ~check if link is smash.gg, challonge~
     - [X] ~load bracket link~
   - [ ] figure out how to get bracket data
     - [ ] for smash.gg
     - [ ] for challonge.com
     - [ ] other sites if they show up - maybe throw flag
   - [ ] write bracket data to ~csv~ database
   - [ ] add accessibility
   - [ ] expand data visualization
     - [ ] fix tooltip - while chart is loading/expanding there is no mouseover/mouseout transition animation
   - [ ] automate tournamentData.csv and bracketData.csv being updated by scrapeTournamentData.js and scrapeMatchData.js
   - [ ] use massey method to rank players / make predictions
   - [ ] ML predictions based on match history?
   - [ ] map each winner to unique color - currently there are overlaps

   visualization ideas  
   - player circle/icon/something, bigger the more wins they have  
   - going to a player's stats - show individual win percentages against other players  
   - calculate node radius instead of entrants/7 - scale when adding tournaments