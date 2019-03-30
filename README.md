# smashalytics

Data gathering and visualization project using tournament results from Super Smash Brothers games.

Scrapes data from ssbwiki. Will write to csv and use d3.js for visualization.

bubbleChart and future d3 charts created to be reusable, handle data and chart configuration in main.js

Run http-server locally for D3.js, i.e. `http-server -c-1 -p 8010`

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
   - [ ] fix scraper.js - incorrectly reads entrants >1000 because of comma
   - [ ] get to bracket data pages
     - [ ] load pages scraped from tournament table (tournament.url)
     - [ ] find super smash bros ultimate id (h3 tag?)
     - [ ] find bracket link after id
     - [ ] load bracket link
   - [ ] figure out how to get bracket data
   - [ ] write bracket data to csv
   - [ ] expand data visualization
     - [ ] fix tooltip - while chart is loading/expanding there is no mouseover/mouseout transition animation
   - [ ] automate tournamentData.csv and bracketData.csv being updated by scraper.js and bracketScraper.js
   - [ ] use massey method to rank players / make predictions
   - [ ] ML predictions based on match history?

   visualization ideas  
    player circle/icon/something, bigger the more wins they have  
    going to a player's stats - show individual win percentages against other players  
