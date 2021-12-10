const PricingCalculatorPage = require('../../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();

describe('pricing calculator page scenarios', function () {
  searchQuery = 'Google Cloud Platform Pricing Calculator';

  before(async function () {
    await pricingCalculatorPage.open();
    await pricingCalculatorPage.maximizeWindow();
    // Нажав кнопку поиска по порталу вверху страницы, ввести в поле поиска"Google Cloud Platform Pricing Calculator"
    await pricingCalculatorPage.enterSearchQuery();
    // В результатах поиска кликнуть "Google Cloud Platform Pricing Calculator" и перейти на страницу калькулятора.
    await pricingCalculatorPage.choosePricingCalculator();
    await pricingCalculatorPage.confirmCookies();
    // Switch to iFrame
    await pricingCalculatorPage.switchToIFrame();
    // Заполнить форму следующими данными:
    //     * Number of instances: 4
    await pricingCalculatorPage.enterNumberOfInstances();
    //     * Instance type: n1-standard-8    (vCPUs: 8, RAM: 30 GB)
    // Choose Series N1
    await pricingCalculatorPage.selectInstanceSeries();
    // Choose Series n1-standard-8    (vCPUs: 8, RAM: 30 GB)
    await pricingCalculatorPage.selectInstanceMachineType();
    //     * Выбрать Add GPUs
    await pricingCalculatorPage.scrollTo(
      pricingCalculatorPage.addToEstimateBtn
    );
    await pricingCalculatorPage.selectCheckboxAddGPUs();
    //     * GPU type: NVIDIA Tesla V100
    await pricingCalculatorPage.selectGPUTypeDropdown();
    //     * Number of GPUs: 1
    await pricingCalculatorPage.selectNumberOfGPUs();
    //     * Local SSD: 2x375 Gb
    await pricingCalculatorPage.selectLocalSSD();
    //     * Datacenter location: Frankfurt (europe-west3)
    await pricingCalculatorPage.selectDatacenterLocation();
    //     * Commited usage: 1 Year
    await pricingCalculatorPage.selectCommitedUsage();
    // Нажать Add to Estimate
    await pricingCalculatorPage.clickAddToEstimateBtn();
  });

  it('Verify the correspondence of the data of the following field: VM Class', async function () {
    expect(await pricingCalculatorPage.actualVMClass()).toHaveText(
      'VM class: regular'
    );
  });

  it('Verify the correspondence of the data of the following field: Instance type', async function () {
    expect(
      await pricingCalculatorPage.actualInstanceType()
    ).toHaveTextContaining('n1-standard-8');
  });

  it('Verify the correspondence of the data of the following field: Region', async function () {
    expect(await pricingCalculatorPage.actualRegion()).toHaveText(
      'Region: Frankfurt'
    );
  });

  it('Verify the correspondence of the data of the following field: local SSD', async function () {
    expect(await pricingCalculatorPage.actualLocalSSD()).toHaveTextContaining(
      'Local SSD: 2x375 GiB'
    );
  });

  it('Verify the correspondence of the data of the following field: commitment term', async function () {
    expect(await pricingCalculatorPage.actualCommitmentTerm()).toHaveText(
      'Commitment term: 1 Year'
    );
  });

  it('Verify that the rental amount per month equals with the amount received when passing the test manually', async function () {
    expect(await pricingCalculatorPage.actualEstimatedCost()).toHaveText(
      'Total Estimated Cost: USD 1,082.77 per 1 month'
    );
  });

  after(async function () {
    await pricingCalculatorPage.close();
  });
});
