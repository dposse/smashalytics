# smashalytics

Data gathering and visualization project using tournament results from Super Smash Brothers games.

Scrapes data from ssbwiki. Will write to csv and use d3.js for visualization.

Run http-server locally for D3.js, i.e. `http-server -c-1 -p 8010`

###### TODO in order:

   - [x] ~create helper function to read table row~
   - [x] ~get data from 2019 tournament table~
   - [x] ~write to csv~
   - [x] ~break down how to get bracket data~
   - [x] ~import csv to d3.js~
   - [ ] basic data visualization
   - [ ] get to bracket data pages
     - [ ] load pages scraped from tournament table (tournament.url)
     - [ ] find super smash bros ultimate id (h3 tag?)
     - [ ] find bracket link after id
     - [ ] load bracket link
   - [ ] figure out how to get bracket data
   - [ ] write bracket data to csv
   - [ ] expand data visualization
   - [ ] automate tournamentData.csv and bracketData.csv being updated by scraper.js and bracketScraper.js
   - [ ] use massey method to rank players / make predictions
   - [ ] ML predictions based on match history?

   visualization ideas  
    player circle/icon/something, bigger the more wins they have  
    going to a player's stats - show individual win percentages against other players  
