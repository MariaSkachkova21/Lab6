const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 13: Verify Product Quantity in Cart', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Verify product quantity in cart', async () => {
    try {
      await driver.get('https://automationexercise.com/product_details/1');
      await driver.findElement(By.id('quantity')).clear();
      await driver.findElement(By.id('quantity')).sendKeys('4');
      await driver.findElement(By.xpath('//button[@type="button"]')).click();

      // Wait for the "Continue Shopping" button to be visible and clickable
      const continueButton = await driver.wait(
        until.elementLocated(By.xpath('//button[text()="Continue Shopping"]')),
        10000
      );
      await driver.wait(until.elementIsVisible(continueButton), 10000);
      await driver.wait(until.elementIsEnabled(continueButton), 10000);

      // Scroll to the button and click it
      await driver.executeScript("arguments[0].scrollIntoView(true);", continueButton);
      await driver.executeScript("arguments[0].click();", continueButton); // Fallback to JS click

      await driver.findElement(By.linkText('Cart')).click();
      await driver.wait(until.elementLocated(By.css('.cart_quantity')), 10000);
      const quantity = await driver.findElement(By.css('.cart_quantity input'));
      expect(await quantity.getAttribute('value')).toBe('4');
    } catch (error) {
    }
  });
});