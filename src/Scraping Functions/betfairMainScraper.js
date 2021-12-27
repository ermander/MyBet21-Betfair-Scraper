// Scraping function
const acceptCookiesButton = require('../Scraping Functions/acceptCookiesButton.js');
const avaiableEventsScraper = require('../Scraping Functions/avaiableEventsScraper.js');
// Odds Scrapers
const oneXTwoOddsScraper = require('./Odds Scrapers/oneXTwoOddsScraper.js');
const underOverOddsScraper = require('./Odds Scrapers/underOverOddsScraper.js');
const goalNoGoalOddsScraper = require('./Odds Scrapers/goalNoGoalOddsScraper.js');

// Utils
const mergeOdds = require('../Utils/mergeOdds.js');

const betfairMainScraper = async (
  chrome,
  Builder,
  By,
  Capabilities,
  until,
  sleep
) => {
  try {
    // Creating the chrome options
    const options = new chrome.Options();
    options.windowSize({ width: 1500, height: 850 });

    // Setting the strategies of the page load
    const caps = new Capabilities();
    caps.setPageLoadStrategy('normal');

    // Initiating selenium web driver
    let driver = await new Builder()
      .withCapabilities(caps)
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    // Opening Selenium
    await driver.manage().window();

    await driver.get(
      'https://www.betfair.it/exchange/plus/it/calcio-scommesse-1'
    );
    await sleep(3000);
    // Clicking the cookies button
    await acceptCookiesButton(
      driver,
      By,
      until,
      'onetrust-accept-btn-handler',
      sleep
    );
    const avaiableEventsLinks = await avaiableEventsScraper(
      driver,
      By,
      'footer-link mod-link',
      sleep
    );
    const oneXTwoOdds = await oneXTwoOddsScraper(
      driver,
      By,
      avaiableEventsLinks,
      sleep
    );
    const underOverOdds = await underOverOddsScraper(
      driver,
      By,
      avaiableEventsLinks,
      sleep
    );
    const goalNoGoalOdds = await goalNoGoalOddsScraper(
      driver,
      By,
      avaiableEventsLinks,
      sleep
    );
    const odds = mergeOdds(oneXTwoOdds, underOverOdds, goalNoGoalOdds);
    return odds;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = betfairMainScraper;
