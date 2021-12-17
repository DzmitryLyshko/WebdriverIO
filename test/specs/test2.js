expect = require('chai').expect;

const PastebinPage = require('../../lib/pastebin_page');
const pastebinPage = new PastebinPage();

describe('pastebin page scenarios', function () {
  newPasteText = 'Hello from WebDriver';
  newPasteText2 = `git config --global user.name  "New Sheriff in Town"
    git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
    git push origin master --force`;
  pasteNameText = 'helloweb';
  pasteNameText2 = 'how to gain dominance among developers';
  expectedHighlighting = 'Bash';

  before(async function () {
    await pastebinPage.open();
    await pastebinPage.maximizeWindow();
    await pastebinPage.confirmPrivacyPolicy();
    await pastebinPage.closeAds();
    await pastebinPage.enterNewPasteText();
    await pastebinPage.selectSyntaxHighlighting();
    await pastebinPage.selectPasteExpiration();
    await pastebinPage.enterPasteName();
    await pastebinPage.savePaste();
    await pastebinPage.confirmPrivacyPolicy();
  });

  it('Page title should be equal to Paste name', async function () {
    expect(await browser.getTitle()).to.include(pasteNameText2);
  });

  it('Syntax should be highlighted for Bash', async function () {
    expect(await pastebinPage.actualSyntaxHighlighting()).to.equal(
      expectedHighlighting
    );
  });

  it('Code should be equal to that we have entered to the New Paste', async function () {
    expect(await pastebinPage.pasteData()).to.equal(newPasteText2);
  });

  after(async function () {
    await pastebinPage.close();
  });
});
