const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 11: Verify Subscription in Cart Page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Subscribe on cart page', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.linkText('Cart')).click();
    await driver.wait(until.elementLocated(By.xpath('//h2[text()="Subscription"]')), 5000);
    await driver.findElement(By.id('susbscribe_email')).sendKeys('test@example.com');
    await driver.findElement(By.id('subscribe')).click();
    await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "You have been successfully subscribed!")]')), 5000);
    const successMessage = await driver.findElement(By.xpath('//div[contains(text(), "You have been successfully subscribed!")]'));
    expect(await successMessage.isDisplayed()).toBe(true);
  });
});