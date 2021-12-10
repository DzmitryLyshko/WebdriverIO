const Page = require('../lib/base_page');

class YopmailPage extends Page {
  get acceptCookiesBtn() {
    return $('//button[@id="accept"]');
  }
  get generateRandomEmailBtn() {
    return $(
      '#listeliens > a:nth-child(1) > div:nth-child(2) > b:nth-child(1)'
    );
  }
  get checkEmailBtn() {
    return $(
      '/div[@class="tooltip"]//button[@class="md but text f24 egenbut"]'
    );
  }
  get generatedEmail() {
    return $('#egen');
  }
  get recievedBill() {
    return $('//h2');
  }
  async getGeneratedEmail() {
    return await this.generatedEmail.getText();
  }
  async acceptCookies() {
    await this.acceptCookiesBtn.click();
  }
  async generateRandomEmail() {
    await this.generateRandomEmailBtn.click();
  }
  async checkEmail() {
    await this.checkEmailBtn.click();
  }
  async getRecievedBill() {
    return await this.recievedBill.getText();
  }
}
module.exports = YopmailPage;
