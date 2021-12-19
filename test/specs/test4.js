expect = require('chai').expect;

const PricingCalculatorPage = require('../../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();
const YopmailPage = require('../../lib/yopmail_page');
const yopmailPage = new YopmailPage();

describe('pricing calculator page scenarios', function () {
  const searchQuery = 'Google Cloud Platform Pricing Calculator';
  let emailAdress;
  let savedRecievedBill;
  let savedActualEstimatedCost;
  const regexpGetPriceInDollarsFromText = /\bUSD\s\d*\,\d*\.\d*/;

  before(async function () {
    await pricingCalculatorPage.open();
    await pricingCalculatorPage.maximizeWindow();
    await pricingCalculatorPage.enterSearchQuery(searchQuery);
    await pricingCalculatorPage.choosePricingCalculator();
    await pricingCalculatorPage.confirmCookies();
    await pricingCalculatorPage.switchToIFrame();
    await pricingCalculatorPage.enterNumberOfInstances();
    await pricingCalculatorPage.selectInstanceSeries();
    await pricingCalculatorPage.selectInstanceMachineType();
    await pricingCalculatorPage.scrollTo(
      pricingCalculatorPage.addToEstimateBtn
    );
    await pricingCalculatorPage.selectCheckboxAddGPUs();
    await pricingCalculatorPage.selectGPUTypeDropdown();
    await pricingCalculatorPage.selectNumberOfGPUs();
    await pricingCalculatorPage.selectLocalSSD();
    await pricingCalculatorPage.selectDatacenterLocation();
    await pricingCalculatorPage.selectCommitedUsage();
    await pricingCalculatorPage.clickAddToEstimateBtn();
    savedActualEstimatedCost =
      await pricingCalculatorPage.getActualEstimatedCost();
    await pricingCalculatorPage.switchToNewTab();
    await yopmailPage.acceptCookies();
    await yopmailPage.generateRandomEmail();
    emailAdress = await yopmailPage.getGeneratedEmail();
    await browser.switchWindow('Google Cloud Pricing Calculator');
    await pricingCalculatorPage.switchToIFrame();
    await pricingCalculatorPage.clickEmailEstimateBtn();
    await pricingCalculatorPage.scrollTo(pricingCalculatorPage.sendEmailBtn);
    await pricingCalculatorPage.enterEmailAdress(emailAdress);
    await pricingCalculatorPage.sendEmail();
    await browser.switchWindow('https://yopmail.com/ru/email-generator');
    await browser.pause(3000);
    await yopmailPage.checkEmail();
    await yopmailPage.switchToMailIFrame();
    savedRecievedBill = await yopmailPage.getRecievedBill();
  });

  it('Verify that Total Estimated Monthly Cost in the letter equals to the cost in the calculator', async function () {
    const estimatedCost = String(savedActualEstimatedCost.match(regexpGetPriceInDollarsFromText));
    const recievedBill = String(savedRecievedBill.match(regexpGetPriceInDollarsFromText));
    expect(estimatedCost).to.equal(recievedBill);
  });

  after(async function () {
    await pricingCalculatorPage.close();
  });
});
