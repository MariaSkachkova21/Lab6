const { Builder, By, until } = require('selenium-webdriver');
const crypto = require('crypto');

describe('Test Case 5: Register User with Existing Email', () => {
  let driver;
  const email = `user${crypto.randomBytes(4).toString('hex')}@test.com`;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.linkText('Signup / Login')).click();
    await driver.findElement(By.name('name')).sendKeys('Test User');
    await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(email);
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
    await driver.findElement(By.linkText('Logout')).click();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Register with existing email', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.linkText('Signup / Login')).click();
    await driver.findElement(By.name('name')).sendKeys('Test User');
    await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(email);
    await driver.findElement(By.xpath('//button[@data-qa="signup-button"]')).click();
    await driver.wait(until.elementLocated(By.xpath('//p[text()="Email Address already exist!"]')), 5000);
    const errorMessage = await driver.findElement(By.xpath('//p[text()="Email Address already exist!"]'));
    expect(await errorMessage.isDisplayed()).toBe(true);
  });
});