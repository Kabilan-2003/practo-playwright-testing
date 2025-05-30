export class DiagnosticPage {
    constructor(page) {
      this.page = page
      this.location = this.page.locator("#locationInput")
      this.timings = this.page.locator(
        ".c-profile--details.u-spacer--bottom.u-green-text"
      )
      this.popUp = this.page.locator("div[class='u-bg--white u-width--full']")
      this.topCities = this.page.locator("ul.u-br-rule")
    }
  
    async extractLocation() {
      await this.page.waitForTimeout(2000)
      if (!(await this.popUp.isVisible())) {
        await this.location.click()
      }
      console.log(await this.topCities.locator(".u-text--center").allInnerTexts())
    }
  }
  