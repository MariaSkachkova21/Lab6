const { Builder, By, until } = require('selenium-webdriver');

describe('Test Case 6: Contact Us Form', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Submit Contact Us form', async () => {
    await driver.get('https://automationexercise.com/');
    await driver.findElement(By.xpath('//a[@href="/contact_us"]')).click();
    const contactHeader = await driver.findElement(By.xpath('//h2[text()="Get In Touch"]'));
    expect(await contactHeader.isDisplayed()).toBe(true);
    await driver.findElement(By.name('name')).sendKeys('Test User');
    await driver.findElement(By.name('email')).sendKeys('test@example.com');
    await driver.findElement(By.name('subject')).sendKeys('Test Subject');
    driver.sleep(5)
    await driver.findElement(By.name('message')).sendKeys('This is a test message.');
    await driver.findElement(By.name('submit')).click();
    await driver.switchTo().alert().accept();
    await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Success! Your details have been submitted successfully.")]')), 5000);
    const successMessage = await driver.findElement(By.xpath('//div[contains(text(), "Success! Your details have been submitted successfully.")]'));
    expect(await successMessage.isDisplayed()).toBe(true);
    await driver.findElement(By.linkText('Home')).click();
    const homeHeader = await driver.findElement(By.xpath('//h2[text()="Features Items"]'));
    expect(await homeHeader.isDisplayed()).toBe(true);
  });
});