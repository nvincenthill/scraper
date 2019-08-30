// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

class Scraper {
  constructor() {
    this.location = 'https://google.com';
    this.page = null;
    this.chromeOptions = {
      headless: false,
      ignoreHTTPSErrors: true,
      slowMo: 10
    };
  }

  async startUp() {
    await this.run();
  }

  async run() {
    this.browser = await puppeteer.launch(this.chromeOptions);
    this.page = await this.browser.newPage();
    await this.page.goto(this.location);
    await this.page.waitFor(5000);
    await this.page.screenshot({ path: 'testresult.png', fullPage: true });
    await this.tearDown();
  }

  async tearDown() {
    await this.browser.close();
  }
}

module.exports = Scraper;
