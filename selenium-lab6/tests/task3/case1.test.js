const { Builder, By, until } = require('selenium-webdriver');
const crypto = require('crypto');

describe('Test Case 1: Register User', () => {
  let driver;
  const uniqueEmail = `user${crypto.randomBytes(4).toString('hex')}@test.com`;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Register new user', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.xpath('//a[@href="/login"]')).click();
    const signupHeader = await driver.findElement(By.xpath('//h2[text()="New User Signup!"]'));
    expect(await signupHeader.isDisplayed()).toBe(true);
    await driver.findElement(By.name('name')).sendKeys('Test User');
    await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(uniqueEmail);
    await driver.findElement(By.xpath('//button[@data-qa="signup-button"]')).click();
    driver.sleep(5);
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
    await driver.wait(until.elementLocated(By.xpath('//h2[@data-qa="account-created"]')), 5000);
    await driver.findElement(By.xpath('//a[@data-qa="continue-button"]')).click();
    const loggedInUser = await driver.findElement(By.xpath('//i[@class="fa fa-user"]/parent::a'));
    expect(await loggedInUser.getText()).toContain('Test User');
    await driver.findElement(By.linkText('Delete Account')).click();
    await driver.wait(until.elementLocated(By.xpath('//h2[@data-qa="account-deleted"]')), 5000);
  });
});