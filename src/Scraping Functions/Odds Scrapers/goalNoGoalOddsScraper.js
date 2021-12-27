const handleChangeMarketSelectForm = require('../handleChangeMarketSelectForm.js');

const goalNoGoalOddsScraper = async (driver, By, links, sleep) => {
  try {
    const goalNoGoalOdds = [];
    let changeMarket = true;
    for (let i = 0; i < links.length; i++) {
      await driver.get(links[i]);
      await sleep(2000);

      // If the market is not already changed, change the market
      if (changeMarket) {
        await handleChangeMarketSelectForm(
          driver,
          By,
          'Goal per entrambe le squadre'
        );
        changeMarket = false;
        await sleep(2000);
      }

      // Getting all goalNoGoal odds
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
        const odds = await tableRows[j].findElements(
          By.css('button.bf-bet-button.lay-button.lay-selection-button')
        );

        let goalOdd, noGoalOdd, goalOddLiquidity, noGoalOddLiquidity;

        for (let x = 0; x < odds.length; x++) {
          const infoes = await odds[x].findElements(By.css('span'));
          if (x === 0) {
            goalOdd = await infoes[0].getAttribute('innerText');
            goalOddLiquidity = await infoes[1].getAttribute('innerText');
          }
          if (x === 1) {
            noGoalOdd = await infoes[0].getAttribute('innerText');
            noGoalOddLiquidity = await infoes[1].getAttribute('innerText');
          }
        }
        goalNoGoalOdds.push({
          home,
          away,
          goalOdd,
          noGoalOdd,
          goalOddLiquidity: goalOddLiquidity.split('€')[1],
          noGoalOddLiquidity: noGoalOddLiquidity.split('€')[1],
        });
      }
    }
    return goalNoGoalOdds;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = goalNoGoalOddsScraper;
