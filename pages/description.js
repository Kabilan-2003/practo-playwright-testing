export class DescriptionPage {
    constructor(page) {
      this.page = page
      this.more = this.page.getByText("Read more info")
      this.amenities = ".p-entity__item"
      this.name = this.page.locator(".c-profile__title")
      this.rating = this.page.locator(".common__star-rating__value")
      this.address = this.page.locator("p[data-qa-id='address_body']")
    }
  
    async findParking() {
      await this.page.waitForTimeout(2000)
      if (await this.page.isVisible("text=Read more info")) {
        await this.more.click()
        const flag = this.page.getByText("Parking", { exact: true })
        return flag
      }
      return false
    }
  }
  