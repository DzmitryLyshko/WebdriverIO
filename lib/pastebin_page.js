const Page = require('../lib/base_page');

class PastebinPage extends Page {
  get newPasteElement() {
    return $('//*[@id="postform-text"]');
  }
  get pasteExpirationDropdown() {
    return $(
      '//div[@class="form-group field-postform-expiration"]//span[@class="select2-selection__arrow"]'
    );
  }
  get pasteExpirationTenMinutes() {
    return $(
      '//span[@class="select2-results"]/ul[@class="select2-results__options"]/li[text()="10 Minutes"]'
    );
  }
  get pasteNameElement() {
    return $('//*[@id="postform-name"]');
  }
  get syntaxHighlightingToggle() {
    return $('//div[@class="toggle__control"]/label');
  }
  get syntaxHighlightingDropdown() {
    return $('//div[@class="form-group field-postform-format"]//span[@class="select2-selection__arrow"]');
  }
  get syntaxHighlightingBash() {
    return $(
      '(//ul[@class="select2-results__options select2-results__options--nested"]/*[.="Bash"])[1]'
    );
  }
  get createNewPasteBtn() {
    return $('//button[@class="btn -big"]');
  }
  get confirmPrivacyPolicyBtn() {
    return $("//button[@class='sc-ifAKCX ljEJIv']");
  }
  get ads() {
    return $('.active-path');
  }

  async open() {
    await super.open('https://pastebin.com');
  }
  async confirmPrivacyPolicy() {
    await this.confirmPrivacyPolicyBtn.click();
  }
  async closeAds() {
    await this.ads.waitForDisplayed();
    await this.ads.click();
  }
  async enterNewPasteText(text) {
    await this.write(this.newPasteElement, text);
  }
  async selectSyntaxHighlighting() {
    await this.syntaxHighlightingToggle.click();
    await this.syntaxHighlightingDropdown.click();
    await this.syntaxHighlightingBash.click();
  }
  async selectPasteExpiration() {
    await this.pasteExpirationDropdown.click();
    await this.pasteExpirationTenMinutes.click();
  }
  async enterPasteName(text) {
    await this.write(this.pasteNameElement, text);
  }
  async savePaste() {
    await this.createNewPasteBtn.click();
  }
  async actualSyntaxHighlighting() {
    return await $('//a[text()="Bash"]').getText();
  }

  async pasteData() {
    return await $('.textarea').getText();
  }
}
module.exports = PastebinPage;
