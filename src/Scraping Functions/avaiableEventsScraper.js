const avaiableEventsScraper = async (driver, By, selector, sleep) => {
  try {
    const links = [];
    let counter = 1;
    let isUrlValid = true;
    const basicUrl =
      'https://www.betfair.it/exchange/plus/it/calcio-scommesse-1';

    while (isUrlValid) {
      // Taking the infoes from the first url call
      if (counter === 1) {
        await driver.get(
          `https://www.betfair.it/exchange/plus/it/calcio-scommesse-1/`
        );
        await sleep(500);
        const avaiableEventsLinks = await driver.findElements(
          By.className(selector)
        );

        for (let i = 0; i < avaiableEventsLinks.length; i++) {
          const link = await avaiableEventsLinks[i].getAttribute('href');
          links.push(link);
        }
        counter += 1;
      } else {
        await driver.get(
          `https://www.betfair.it/exchange/plus/it/calcio-scommesse-1/${counter}`
        );
        await sleep(500);
        const currentUrl = await driver.getCurrentUrl();

        // Condition that change the while condition if the url is redirected to the basicUrl
        if (currentUrl === basicUrl) {
          isUrlValid = false;
          console.log('Exit while control');
        } else {
          const avaiableEventsLinks = await driver.findElements(
            By.className(selector)
          );

          for (let i = 0; i < avaiableEventsLinks.length; i++) {
            const link = await avaiableEventsLinks[i].getAttribute('href');
            links.push(link);
          }
          counter += 1;
        }
      }
    }

    return links;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = avaiableEventsScraper;
