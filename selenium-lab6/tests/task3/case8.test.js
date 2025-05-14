const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 8: Verify All Products and Product Detail Page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize(); 
    await driver.manage().setTimeouts({ implicit: 5000 }); 
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Verify All Products and product detail page', async () => {
    try {
      await driver.get('http://automationexercise.com');

      const productsLink = await driver.findElement(By.css('a[href="/products"]'));
      await driver.executeScript('arguments[0].click();', productsLink); 

      const productsHeader = await driver.wait(
        until.elementLocated(By.css('h2.title.text-center')),
        15000
      );
      await driver.wait(until.elementIsVisible(productsHeader), 15000);
      const headerText = await productsHeader.getText();
      expect(headerText).toMatch(/ALL PRODUCTS/i);

      const productList = await driver.wait(
        until.elementsLocated(By.css('.single-products')),
        15000
      );
      expect(productList.length).toBeGreaterThan(0);
      console.log(`Found ${productList.length} products`);

      driver.wait(until.elementIsEnabled(driver.findElement(By.css('a[href="/product_details/1"]'))), 15000);
      const viewProductLink = await driver.findElement(By.css('a[href="/product_details/1"]'));
      await driver.executeScript('arguments[0].click();', viewProductLink);
      productInfo = await driver.findElement(By.className('product-information'));

      await driver.wait(until.elementIsVisible(productInfo), 15000);
      expect(await productInfo.isDisplayed()).toBe(true);

    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  }, 60000); 
});