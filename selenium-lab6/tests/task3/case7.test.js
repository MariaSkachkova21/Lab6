const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 7: Verify Test Cases Page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Verify test cases page', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.linkText('Test Cases')).click();
    await driver.wait(until.elementLocated(By.xpath('//h2[@class="title text-center"]/b[text()="Test Cases"]')), 5000);
    const testCasesHeader = await driver.findElement(By.xpath('//h2[@class="title text-center"]/b[text()="Test Cases"]'));
    expect(await testCasesHeader.isDisplayed()).toBe(true);
    const testCaseItems = await driver.findElements(By.css('.panel-group .panel'));
    expect(testCaseItems.length).toBeGreaterThan(0);
  });
});