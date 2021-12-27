const acceptCookiesButton = async (driver, By, until, selector, sleep) => {
  try {
    const cookiesButton = await driver.wait(
      until.elementLocated(By.id(selector), 30000)
    );
    await sleep(2000);
    await cookiesButton.click();
  } catch (error) {
    console.log(error);
    return await acceptCookiesButton(driver, By, until, selector, sleep);
  }
};

module.exports = acceptCookiesButton;
