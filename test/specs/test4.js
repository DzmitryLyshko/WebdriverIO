const PricingCalculatorPage = require('../../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();
const YopmailPage = require('../../lib/yopmail_page');
const yopmailPage = new YopmailPage();

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
    // В новой вкладке открыть https://yopmail.com/ или аналогичный сервис для генерации временных email'ов
    // await pricingCalculatorPage.switchToDefaultContent();
    await pricingCalculatorPage.switchToNewTab();
    await yopmailPage.acceptCookies();
    await yopmailPage.generateRandomEmail();
    // Скопировать почтовый адрес сгенерированный в yopmail.com
    let emailAdress = await yopmailPage.getGeneratedEmail();
    // Вернуться в калькулятор, в поле Email ввести адрес из предыдущего пункта
    await browser.switchWindow('Google Cloud Pricing Calculator');
    await pricingCalculatorPage.clickEmailEstimateBtn();
    await pricingCalculatorPage.scrollTo(pricingCalculatorPage.sendEmailBtn);
    await pricingCalculatorPage.enterEmailAdress(emailAdress);
    // Нажать SEND EMAIL
    await pricingCalculatorPage.sendEmail();
    // Дождаться письма с рассчетом стоимости и проверить что Total Estimated Monthly Cost в письме совпадает с тем, что отображается в калькуляторе
    await browser.switchWindow('Входящие');
    await yopmailPage.checkEmail();
    await yopmailPage.switchToIFrame('ifmail');
  });

  it('Verify that Total Estimated Monthly Cost in the letter equals to the cost in the calculator', async function () {
    expect(await pricingCalculatorPage.getActualEstimatedCost()).toHaveText(
      await yopmailPage.getRecievedBill()
    );
  });

  after(async function () {
    await pricingCalculatorPage.close();
  });
});
