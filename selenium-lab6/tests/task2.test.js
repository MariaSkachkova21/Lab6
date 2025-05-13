const { Builder, By } = require('selenium-webdriver');

describe('Automation Exercise Main Page Test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Check main page elements', async () => {
    await driver.get('https://automationexercise.com/');

    // Навігаційне меню (By.css)
    const navMenu = await driver.findElement(By.css('ul.nav.navbar-nav'));
    expect(await navMenu.isDisplayed()).toBe(true);
    const navItems = await navMenu.findElements(By.css('li a'));
    expect(navItems.length).toBeGreaterThan(0);

    // Логотип (By.xpath)
    const logo = await driver.findElement(By.xpath('//img[@alt="Website for automation practice"]'));
    expect(await logo.isDisplayed()).toBe(true);
    const altText = await logo.getAttribute('alt');
    expect(altText).toBe('Website for automation practice');

    // Кнопка Signup/Login (By.linkText)
    const signupButton = await driver.findElement(By.linkText('Signup / Login'));
    expect(await signupButton.isDisplayed()).toBe(true);
    const href = await signupButton.getAttribute('href');
    expect(href).toContain('login');
  });
});