const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 8: Verify All Products and Product Detail Page', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Verify products and product details', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.xpath('//a[@href="/products"]')).click();
    await driver.wait(until.elementLocated(By.xpath("/html/body/section[2]/div/div/div[2]/div/h2")), 5000);
    const productsHeader = await driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div/h2"));
    expect(await productsHeader.isDisplayed()).toBe(true);
    const productList = await driver.findElements(By.className('product_image_wrapper'));
    expect(productList.length).toBeGreaterThan(0);
    await driver.findElement(By.xpath('//a[@href="/product_details/1"]')).click();
    driver.sleep(5);
    const productInfo = await driver.findElement(By.className('product_information'));
    expect(await productInfo.isDisplayed()).toBe(true);
    const productName = await driver.findElement(By.css('.product-information h2'));
    const productPrice = await driver.findElement(By.className('cart_price'));
    expect(await productName.getText()).toBeTruthy();
    expect(await productPrice.getText()).toContain('Rs.');
  });
});