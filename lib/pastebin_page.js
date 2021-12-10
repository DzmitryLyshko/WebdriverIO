const Page = require('../lib/base_page');

class PastebinPage extends Page {
  get newPasteElement() {
    return $('//*[@id="postform-text"]');
  }
  get pasteExpirationDropdown() {
    return $(
      'div.form-group.field-postform-expiration span.select2-selection__arrow'
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
    return $('.toggle__control > label:nth-child(2)');
  }
  get syntaxHighlightingDropdown() {
    return $('(//span[@class="select2-selection__arrow"])[1]');
  }
  get syntaxHighlightingBash() {
    return $(
      '(//ul[@class="select2-results__options select2-results__options--nested"]/*[.="Bash"])[1]'
    );
  }
  get btnCreateNewPaste() {
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
  async enterNewPasteText() {
    await this.write(this.newPasteElement, newPasteText2);
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
  async enterPasteName() {
    await this.write(this.pasteNameElement, pasteNameText2);
  }
  async savePaste() {
    await this.btnCreateNewPaste.click();
  }
  async actualSyntaxHighlighting() {
    return await $('(//a[@class="btn -small h_800"])[1]').getText();
  }

  async pasteData() {
    return await $('.textarea').getText();
  }
}
module.exports = PastebinPage;
