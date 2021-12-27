const handleChangeMarketSelectForm = require('../handleChangeMarketSelectForm.js');

const underOverOddsScraper = async (driver, By, links, sleep) => {
  try {
    const underOverOdds = [];
    let changeMarket = true;
    for (let i = 0; i < links.length; i++) {
      await driver.get(links[i]);
      await sleep(2000);

      // If the market is not already changed, change the market
      if (changeMarket) {
        await handleChangeMarketSelectForm(driver, By, 'Under/Over 2.5 Goal');
        changeMarket = false;
        await sleep(2000);
      }

      // Getting all underOver odds
      const tableRows = await driver.findElements(
        By.tagName('tr[ng-if="event.isReady && event.isVisible"]')
      );

      for (let j = 0; j < tableRows.length; j++) {
        // Finding the team names
        const teamNames = await tableRows[j].findElements(By.css('li.name'));
        let [home, away] = [
          await teamNames[0].getAttribute('innerText'),
          await teamNames[1].getAttribute('innerText'),
        ];
        // Finding the One, X and Two odds
        const odds = await tableRows[j].findElements(
          By.css('button.bf-bet-button.lay-button.lay-selection-button')
        );
        let under2_5Odd, over2_5Odd, under2_5OddLiquidity, over2_5OddLiquidity;

        for (let x = 0; x < odds.length; x++) {
          const infoes = await odds[x].findElements(By.css('span'));
          if (x === 0) {
            under2_5Odd = await infoes[0].getAttribute('innerText');
            under2_5OddLiquidity = await infoes[1].getAttribute('innerText');
          }
          if (x === 1) {
            over2_5Odd = await infoes[0].getAttribute('innerText');
            over2_5OddLiquidity = await infoes[1].getAttribute('innerText');
          }
        }

        underOverOdds.push({
          home,
          away,
          under2_5Odd,
          over2_5Odd,
          under2_5OddLiquidity: under2_5OddLiquidity.split('€')[1],
          over2_5OddLiquidity: over2_5OddLiquidity.split('€')[1],
        });
      }
    }
    return underOverOdds;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = underOverOddsScraper;
