const PastebinPage = require('../../lib/pastebin_page');
const pastebinPage = new PastebinPage();

describe('pastebin page scenarios', function () {
  newPasteText = 'Hello from WebDriver';
  newPasteText2 = `git config --global user.name  "New Sheriff in Town"
    git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
    git push origin master --force`;
  pasteNameText = 'helloweb';
  pasteNameText2 = 'how to gain dominance among developers';

  before(async function () {
    await pastebinPage.open();
    await pastebinPage.maximizeWindow();
    // Confirm privacy policy
    await pastebinPage.confirmPrivacyPolicy();
    //  Close the banner that doesn't allow to push the button
    await pastebinPage.closeAds();
    // Создать New Paste со следующими деталями:
    // * Код:
    await pastebinPage.enterNewPasteText();
    // * Syntax Highlighting: "Bash"
    await pastebinPage.selectSyntaxHighlighting();
    // * Paste Expiration: "10 Minutes"
    await pastebinPage.selectPasteExpiration();
    // * Paste Name / Title: "how to gain dominance among developers"
    await pastebinPage.enterPasteName();
    // 3. Сохранить paste:
    await pastebinPage.savePaste();
    // Confirm privacy policy (just to see the content of the window) - doesn't pop up in Belarus
    await pastebinPage.confirmPrivacyPolicy();
  });

  it('Page title should be equal to Paste name', async function () {
    expect(browser).toHaveTitle(pasteNameText2 + ' - Pastebin.com');
  });

  it('Syntax should be highlighted for Bash', async function () {
    expect(await pastebinPage.actualSyntaxHighlighting()).toHaveText('Bash');
  });

  it('Code should be equal to that we have entered to the New Paste', async function () {
    expect(await pastebinPage.pasteData()).toHaveText(newPasteText2);
  });

  after(async function () {
    await pastebinPage.close();
  });
});
