const { JSDOM } = require('jsdom');
const { window } = new JSDOM();
// Selenium and ChromeDriver
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
// Sleep function
const sleep = require('./Utils/sleep.js');
// Main scraping function
const betfairMainScraper = require('./Scraping Functions/betfairMainScraper.js');

const main = async () => {
  while (true) {
    const start = window.performance.now();
    // Printing in the console that the function is starting the web scraping proccess
    try {
      console.log('Strating the main scraping function');
      const betfairExchangeOdds = await betfairMainScraper(
        chrome,
        Builder,
        By,
        Capabilities,
        until,
        sleep
      );
      console.log(betfairExchangeOdds);
      await axios.post(
        'http://localhost:3004/odds/post-betfair-exchange-odds',
        betfairExchangeOdds
      );
      /*
        Here we stop the function that measures and we print the time it tooks for
        the functions to return the results
      */
      const stop = window.performance.now();
      console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
    } catch (error) {
      console.log(error);
      return main();
    }
  }
};

main();
