const oneXTwoOddsScraper = async (driver, By, links, sleep) => {
  try {
    const events = [];

    for (let i = 0; i < links.length; i++) {
      await driver.get(links[i]);
      console.log(`Scraping ${links[i]}`);
      await sleep(2000);

      // Getting all OneXOdds
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
        let oneOdd, xOdd, twoOdd;
        let oneOddLiquidity, xOddLiquidity, twoOddLiquidity;

        for (let x = 0; x < odds.length; x++) {
          const infoes = await odds[x].findElements(By.css('span'));

          if (x === 0) {
            oneOdd = await infoes[0].getAttribute('innerText');
            oneOddLiquidity = await infoes[1].getAttribute('innerText');
          }
          if (x === 1) {
            xOdd = await infoes[0].getAttribute('innerText');
            xOddLiquidity = await infoes[1].getAttribute('innerText');
          }
          if (x === 2) {
            twoOdd = await infoes[0].getAttribute('innerText');
            twoOddLiquidity = await infoes[1].getAttribute('innerText');
          }
        }

        events.push({
          home,
          away,
          oneOdd,
          xOdd,
          twoOdd,
          oneOddLiquidity: oneOddLiquidity.split('€')[1],
          xOddLiquidity: xOddLiquidity.split('€')[1],
          twoOddLiquidity: twoOddLiquidity.split('€')[1],
        });
      }
    }
    return events;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = oneXTwoOddsScraper;
