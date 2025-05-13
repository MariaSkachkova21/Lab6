const { Builder, By, until } = require('selenium-webdriver');
const crypto = require('crypto');

describe('Test Case 14: Place Order with Register during Checkout', () => {
  let driver;
  const uniqueEmail = `user${crypto.randomBytes(4).toString('hex')}@test.com`;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Place order with registration during checkout', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.xpath('//a[@href="/products"]')).click();
    await driver.findElement(By.xpath('//a[@href="/product_details/1"]')).click();
    button = await driver.findElement(By.xpath('//button[@class="btn btn-default cart"]'));
    await driver.executeScript("arguments[0].click();", button);
    await driver.wait(until.elementLocated(By.xpath('//button[text()="Continue Shopping"]')), 5000);
    await driver.findElement(By.xpath('//button[text()="Continue Shopping"]')).click();
    await driver.findElement(By.xpath('//a[@href="/cart"]')).click();
    await driver.findElement(By.linkText('Proceed To Checkout')).click();
    await driver.findElement(By.xpath('//u[text()="Register / Login"]')).click();
    await driver.findElement(By.name('name')).sendKeys('Test User');
    await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(uniqueEmail);
    await driver.findElement(By.xpath('//button[@data-qa="signup-button"]')).click();
    await driver.findElement(By.id('id_gender1')).click();
    await driver.findElement(By.id('password')).sendKeys('Test1234!');
    await driver.findElement(By.id('days')).sendKeys('1');
    await driver.findElement(By.id('months')).sendKeys('January');
    await driver.findElement(By.id('years')).sendKeys('1990');
    await driver.findElement(By.id('first_name')).sendKeys('Test');
    await driver.findElement(By.id('last_name')).sendKeys('User');
    await driver.findElement(By.id('company')).sendKeys('Test Corp');
    await driver.findElement(By.id('address1')).sendKeys('123 Test St');
    await driver.findElement(By.id('country')).sendKeys('United States');
    await driver.findElement(By.id('state')).sendKeys('California');
    await driver.findElement(By.id('city')).sendKeys('Los Angeles');
    await driver.findElement(By.id('zipcode')).sendKeys('90001');
    await driver.findElement(By.id('mobile_number')).sendKeys('1234567890');
    await driver.findElement(By.xpath('//button[@data-qa="create-account"]')).click();
    await driver.findElement(By.xpath('//a[@data-qa="continue-button"]')).click();
    await driver.findElement(By.linkText('Cart')).click();
    await driver.findElement(By.linkText('Proceed To Checkout')).click();
    await driver.findElement(By.name('message')).sendKeys('Test order comment');
    await driver.findElement(By.linkText('Place Order')).click();
    await driver.findElement(By.name('name_on_card')).sendKeys('Test User');
    await driver.findElement(By.name('card_number')).sendKeys('4111111111111111');
    await driver.findElement(By.name('cvc')).sendKeys('123');
    await driver.findElement(By.name('expiry_month')).sendKeys('12');
    await driver.findElement(By.name('expiry_year')).sendKeys('2025');
    await driver.findElement(By.xpath('//button[@data-qa="pay-button"]')).click();
    await driver.wait(until.elementLocated(By.xpath('//p[text()="Congratulations! Your order has been confirmed!"]')), 5000);
    const orderSuccess = await driver.findElement(By.xpath('//p[text()="Congratulations! Your order has been confirmed!"]'));
    expect(await orderSuccess.isDisplayed()).toBe(true);
    await driver.findElement(By.linkText('Delete Account')).click();
    await driver.wait(until.elementLocated(By.xpath('//h2[@data-qa="account-deleted"]')), 5000);
  });
});