const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 3: Login User with Incorrect Credentials', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Login with incorrect email and password', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.linkText('Signup / Login')).click();
    await driver.findElement(By.xpath('//input[@data-qa="login-email"]')).sendKeys('wrong@test.com');
    await driver.findElement(By.xpath('//input[@data-qa="login-password"]')).sendKeys('WrongPass123!');
    await driver.findElement(By.xpath('//button[@data-qa="login-button"]')).click();
    await driver.wait(until.elementLocated(By.xpath('//p[text()="Your email or password is incorrect!"]')), 5000);
    const errorMessage = await driver.findElement(By.xpath('//p[text()="Your email or password is incorrect!"]'));
    expect(await errorMessage.isDisplayed()).toBe(true);
  });
});