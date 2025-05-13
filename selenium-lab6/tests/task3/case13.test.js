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
    await driver.get('https://automationexercise.com/product_details/1');
    await driver.findElement(By.id('quantity')).clear();
    await driver.findElement(By.id('quantity')).sendKeys('4');
    await driver.findElement(By.xpath('//button[@type="button"]')).click();
    await driver.wait(until.elementLocated(By.xpath('//button[text()="Continue Shopping"]')), 5000);
    await driver.findElement(By.xpath('//button[text()="Continue Shopping"]')).click();
    await driver.findElement(By.linkText('Cart')).click();
    await driver.wait(until.elementLocated(By.css('.cart_quantity')), 5000);
    const quantity = await driver.findElement(By.css('.cart_quantity input'));
    expect(await quantity.getAttribute('value')).toBe('4');
  });
});