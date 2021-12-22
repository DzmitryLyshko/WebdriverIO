class Page {
  async open(path) {
    await browser.url(path);
  }

  async maximizeWindow() {
    await browser.maximizeWindow();
  }

  async close() {
    await browser.deleteSession();
  }

  async getPageTitle() {
    return browser.getTitle();
  }

  async write(element, text) {
    await element.setValue(text);
  }
}

module.exports = Page;
