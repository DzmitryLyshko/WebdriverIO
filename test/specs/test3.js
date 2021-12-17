expect = require('chai').expect;

const PricingCalculatorPage = require('../../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();

describe('pricing calculator page scenarios', function () {
  searchQuery = 'Google Cloud Platform Pricing Calculator';

  before(async function () {
    await pricingCalculatorPage.open();
    await pricingCalculatorPage.maximizeWindow();
    await pricingCalculatorPage.enterSearchQuery();
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
  });

  it('Verify the correspondence of the data of the following field: VM Class', async function () {
    expect(await pricingCalculatorPage.getActualVMClass()).to.equal(
      'VM class: regular'
    );
  });

  it('Verify the correspondence of the data of the following field: Instance type', async function () {
    expect(await pricingCalculatorPage.getActualInstanceType()).to.include(
      'n1-standard-8'
    );
  });

  it('Verify the correspondence of the data of the following field: Region', async function () {
    expect(await pricingCalculatorPage.getActualRegion()).to.equal(
      'Region: Frankfurt'
    );
  });

  it('Verify the correspondence of the data of the following field: local SSD', async function () {
    expect(await pricingCalculatorPage.getActualLocalSSD()).to.include(
      'Local SSD: 2x375 GiB'
    );
  });

  it('Verify the correspondence of the data of the following field: commitment term', async function () {
    expect(await pricingCalculatorPage.getActualCommitmentTerm()).to.equal(
      'Commitment term: 1 Year'
    );
  });

  it('Verify that the rental amount per month equals with the amount received when passing the test manually', async function () {
    expect(await pricingCalculatorPage.getActualEstimatedCost()).to.equal(
      'Total Estimated Cost: USD 1,082.77 per 1 month'
    );
  });

  after(async function () {
    await pricingCalculatorPage.close();
  });
});
