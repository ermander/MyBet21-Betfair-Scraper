const handleChangeMarketSelectForm = async (driver, By, option) => {
  try {
    // Getting the change market select form
    const changeMarketSelectFormContainer = await driver.findElement(
      By.className('market-type-filter')
    );
    // Finding the select form
    const changeMarketSelectForm =
      await changeMarketSelectFormContainer.findElement(
        By.tagName(`div[ng-class="{'expanded':vm.expanded}"]`)
      );
    // Finding the select form options
    const changeMarketSelectFormOptions =
      await changeMarketSelectFormContainer.findElements(
        By.className('option-list-item')
      );
    // Getting the select form options names
    const changeMarketSelectFormOptionsNames = [];
    for (let i = 0; i < changeMarketSelectFormOptions.length; i++) {
      const optionName = await changeMarketSelectFormOptions[i].getAttribute(
        'innerText'
      );
      changeMarketSelectFormOptionsNames.push(optionName);
    }
    await changeMarketSelectForm.click();
    // Clicking the right select option
    const index = changeMarketSelectFormOptionsNames.indexOf(option);
    await changeMarketSelectFormOptions[index].click();
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = handleChangeMarketSelectForm;
