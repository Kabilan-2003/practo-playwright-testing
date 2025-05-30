export class HealthPage {
    constructor(page) {
      this.page = page
      this.name = this.page.locator("#name").first()
      this.organization = this.page.locator("#organizationName").first()
      this.contactNumber = this.page.locator("#contactNumber").first()
      this.officeMail = this.page.locator("#officialEmailId").first()
      this.oraganizationSize = this.page.locator("#organizationSize").first()
      this.interested = this.page.locator("#interestedIn").first()
      this.submit = this.page.locator("button[type=submit]").first()
    }
  
    async fillDetails(
      name = "",
      organization = "",
      contactNumber = "",
      officeMail = "",
      oraganizationSize = "",
      interested = ""
    ) {
      await this.name.fill(name)
      await this.contactNumber.fill(contactNumber)
      await this.organization.fill(organization)
      await this.officeMail.fill(officeMail)
      if (interested != "") {
        await this.interested.selectOption(interested)
      }
      if (oraganizationSize != "") {
        await this.oraganizationSize.selectOption(oraganizationSize)
      }
    }
  }
  