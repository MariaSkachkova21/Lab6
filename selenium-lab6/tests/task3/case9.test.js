const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 9: Search Product', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Search for product', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.xpath('//a[@href="/products"]')).click();
    await driver.wait(until.elementLocated(By.xpath('//h2[text()="All Products"]')), 5000);
    await driver.findElement(By.id('search_product')).sendKeys('Tshirt');
    await driver.findElement(By.id('submit_search')).click();
    await driver.wait(until.elementLocated(By.xpath('//h2[text()="Searched Products"]')), 5000);
    const searchHeader = await driver.findElement(By.xpath('//h2[text()="Searched Products"]'));
    expect(await searchHeader.isDisplayed()).toBe(true);
    const products = await driver.findElements(By.css('.product-image-wrapper'));
    expect(products.length).toBeGreaterThan(0);
    const firstProduct = await driver.findElement(By.css('.productinfo p'));
    expect((await firstProduct.getText()).toLowerCase()).toContain('tshirt');
  });
});