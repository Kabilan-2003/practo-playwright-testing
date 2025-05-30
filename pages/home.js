export class HomePage {
    constructor(page) {
      this.page = page
      this.location = this.page.getByPlaceholder("Search location")
      this.query = this.page.locator(
        "input[placeholder='Search doctors, clinics, hospitals, etc.']"
      )
      this.suggestions = ".c-omni-suggestion-item"
      this.title = this.page.locator(".c-omni-suggestion-item__content")
      this.surgery = this.page.locator(
        "a[title='surgery'] div[class='product-tab__title']"
      )
      this.diagnostics = this.page.locator(
        "a[title='tests'] div[class='product-tab__title']"
      )
      this.corportate = this.page.locator("span[class='nav-interact']")
      this.popup = "#close"
    }
  
    async visit() {
      await this.page.goto("https://www.practo.com/")
    }
  
    async selectSuggestion(search) {
      await this.page.waitForTimeout(1000)
      const suggestions = await this.page.locator(this.suggestions).all()
      for (let sug of suggestions) {
        if ((await sug.locator(this.title).textContent()) == search) {
          await sug.locator(this.title).click()
          return
        }
      }
      await this.page.keyboard.press("Enter")
    }
  
    async searchQuery(location, query) {
      await this.selectCity(location)
      await this.selectQuery(query)
    }
  
    async selectCity(location) {
      await this.location.click()
      await this.page.keyboard.press("Control+a")
      await this.page.keyboard.press("Delete")
      await this.location.fill(location.substring(0, location.length - 2))
      await this.selectSuggestion(location)
    }
  
    async selectQuery(query) {
      await this.query.click()
      await this.query.fill(query)
      await this.selectSuggestion(query)
    }
  
    async gotoCorporate() {
      await this.corportate.click()
      await this.page
        .getByText("Health & Wellness Plans", { exact: true })
        .click()
    }
  
    async gotoDiagnostics() {
      await this.surgery.click()
      await this.diagnostics.click()
    }
  
    async handlePopup() {
      await this.page.waitForLoadState("load")
      const shadow = this.page.locator("#wzrkImageOnlyDiv")
      if (await shadow.isVisible()) {
        await shadow.locator("#close").click()
      }
    }
  }
  