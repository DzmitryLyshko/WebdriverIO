const Page = require('../lib/base_page');

class PricingCalculatorPage extends Page {
  get searchField() {
    return $('.devsite-search-field');
  }
  get searchResultPricingCalculator() {
    return $(
      '//div[@class="gs-title"]//*[text()="Google Cloud Platform Pricing Calculator"]'
    );
  }
  get numberOfInstances() {
    return $('//input[@id="input_75"]');
  }
  get instanceSeriesDropdown() {
    return $('(//span[@class="md-select-icon"])[4]');
  }
  get instanceSeries() {
    return $('#select_option_215 > div:nth-child(1)');
  }
  get instanceMachineTypeDropdown() {
    return $('(//span[@class="md-select-icon"])[5]');
  }
  get instanceMachineType() {
    return $('#select_option_418 > div:nth-child(1)');
  }
  get checkboxAddGPUs() {
    return $('(//div[@class="md-container md-ink-ripple"])[2]');
  }
  get addToEstimateBtn() {
    return $('(//button[@aria-label="Add to Estimate"])[1]');
  }
  get gpuTypeDropdown() {
    return $('//*[@id="select_451"]');
  }
  get gpuType() {
    return $('#select_option_458 > div:nth-child(1)');
  }
  get numberOfGPUsDropdown() {
    return $('#select_value_label_450 > span:nth-child(2)');
  }
  get numberOfGPUs() {
    return $('#select_option_462');
  }
  get localSSDDropdown() {
    return $('#select_value_label_412 > span:nth-child(2)');
  }
  get localSSD() {
    return $('#select_option_439 > div:nth-child(1)');
  }
  get datacenterLocationDropdown() {
    return $('#select_value_label_73 > span:nth-child(1) > div:nth-child(1)');
  }
  get datacenterLocation() {
    return $('#select_option_236 > div:nth-child(1)');
  }
  get commitedUsageDropdown() {
    return $('#select_value_label_74 > span:nth-child(2)');
  }
  get commitedUsage() {
    return $('#select_option_113 > div:nth-child(1)');
  }
  get emailAdressInput() {
    return $('#input_547');
  }
  get cookiesWindow() {
    return $('//button[@class="devsite-snackbar-action"]');
  }
  get actualVMClass() {
    return $('md-list-item.md-1-line:nth-child(8) > div:nth-child(1)');
  }
  get actualInstanceType() {
    return $('md-list-item.md-1-line:nth-child(10) > div:nth-child(1)');
  }
  get actualRegion() {
    return $('md-list-item.md-1-line:nth-child(2) > div:nth-child(1)');
  }
  get actualLocalSSD() {
    return $('md-list-item.md-1-line:nth-child(14) > div:nth-child(1)');
  }
  get actualCommitmentTerm() {
    return $('md-list-item.md-1-line:nth-child(6) > div:nth-child(1)');
  }
  get actualEstimatedCost() {
    return $('h2.md-title:nth-child(2) > b:nth-child(1)').getText();
  }
  get iframeID() {
    return $('#cloud-site > devsite-iframe:nth-child(1) > iframe:nth-child(1)');
  }
  get emailEstimateBtn() {
    return $('#email_quote');
  }
  get sendEmailBtn() {
    return $('md-dialog-actions.layout-row > button:nth-child(2)');
  }
  async open() {
    await super.open('https://cloud.google.com/');
  }
  async enterSearchQuery() {
    await this.write(this.searchField, searchQuery);
    await browser.keys('\uE007');
  }
  async choosePricingCalculator() {
    await this.searchResultPricingCalculator.click();
  }
  async confirmCookies() {
    await this.cookiesWindow.waitForClickable();
    await this.cookiesWindow.click();
  }
  // async switchToIFrame(iframe) {
  //   // await browser.waitForExist(iframe);
  //   // $('iframe[id="myFrame"]')
  //   // await this.iframeID.waitForExist(10000);
  //   // await browser.frame(iframe);
  //   await browser.switchToFrame(iframe);
  // }
  async switchToIFrame() {
    // await browser.switchToFrame('iframe[id="myFrame"]');
    // await browser.switchToFrame(this.iframeID);
    await browser.switchToFrame(0);
  }
  async enterNumberOfInstances() {
    await this.numberOfInstances.waitForExist();
    await this.numberOfInstances.click();
    await this.write(this.numberOfInstances, '4');
  }
  async selectInstanceSeries() {
    await this.instanceSeriesDropdown.click();
    await this.instanceSeries.click();
  }
  async selectInstanceMachineType() {
    await this.instanceMachineTypeDropdown.click();
    await this.instanceMachineType.click();
  }
  async scrollTo(element) {
    await element.scrollIntoView(false);
  }
  async selectCheckboxAddGPUs() {
    await this.checkboxAddGPUs.click();
  }
  async selectGPUTypeDropdown() {
    await this.gpuTypeDropdown.click();
    await this.gpuType.click();
  }
  async selectNumberOfGPUs() {
    await this.numberOfGPUsDropdown.click();
    await this.numberOfGPUs.click();
  }
  async selectLocalSSD() {
    await this.localSSDDropdown.click();
    await this.localSSD.click();
  }
  async selectDatacenterLocation() {
    await this.datacenterLocationDropdown.click();
    await this.datacenterLocation.click();
  }
  async selectCommitedUsage() {
    await this.commitedUsageDropdown.click();
    await this.commitedUsage.click();
  }
  async clickAddToEstimateBtn() {
    await this.addToEstimateBtn.click();
  }
  async getActualVMClass() {
    return await this.actualVMClass.getText();
  }
  async getActualInstanceType() {
    return await this.actualInstanceType.getText();
  }
  async getActualRegion() {
    return await this.actualRegion.getText();
  }
  async getActualLocalSSD() {
    return await this.actualLocalSSD.getText();
  }
  async getActualCommitmentTerm() {
    return await this.actualCommitmentTerm.getText();
  }
  async getActualEstimatedCost() {
    return await this.actualEstimatedCost.getText();
  }
  async switchToNewTab() {
    await browser.newWindow('https://yopmail.com/');
  }
  async clickEmailEstimateBtn() {
    await this.emailEstimateBtn.click();
  }
  async enterEmailAdress(email) {
    await this.write(this.emailAdressInput, email);
  }
  async sendEmail() {
    await this.sendEmailBtn.click();
  }
}
module.exports = PricingCalculatorPage;
