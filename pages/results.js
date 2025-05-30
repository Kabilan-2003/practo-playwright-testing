import { DescriptionPage } from "./description"
import { Tools } from "../tests/utils/tools"

export class ResultPage {
  constructor(page, context) {
    this.context = context
    this.page = page
    this.error = this.page.locator("span[data-qa-id='no_results_description']")
    this.title = this.page.locator(".title")
    this.cards = ".c-estb-card"
    this.time = ".pd-right-2px-text-green"
    this.rating = ".text-1"
    this.consultationFees = "p[class='line-3']"
    this.hospitalName = ".line-1"
    this.selectedHospitalsLocators = []
    this.filtered = []
    this.tools = new Tools()
  }
  async getAllCards() {
    let allCards = await this.page.locator(this.cards).all()
    while (allCards.length < 10) {
      await allCards[allCards.length - 1].scrollIntoViewIfNeeded()
      await this.page.waitForTimeout(1000)
      allCards = await this.page.locator(this.cards).all()
    }
    return allCards
  }
  async basicFilters(time, rating) {
    const allCards = await this.getAllCards()
    for (let card of allCards) {
      const r = await card
        .locator(this.rating)
        .locator(".u-bold")
        .textContent()
      if (
        (await card.locator(this.time).textContent()) == time &&
        parseInt(r) >= rating
      ) {
        const promise = this.context.waitForEvent("page")
        await card.locator(this.hospitalName).click()
        const newPage = await promise
        this.description = new DescriptionPage(newPage)
        const parking = await this.description.findParking()
        if (parking) {
          this.formatter(card)
        }
        await newPage.close()
      }
    }
    await this.tools.saveJson(this.filtered)
  }

  async formatter(hospital) {
    const data = {
      Hospital: await hospital.locator(this.hospitalName).textContent(),
      Timings: await hospital.locator(this.time).textContent(),
      Rating: (await hospital
        .locator(".c-feedback")
        .locator(this.rating)
        .locator(".u-bold")
        .isVisible())
        ? await hospital
            .locator(".c-feedback")
            .locator(this.rating)
            .locator(".u-bold")
            .allInnerTexts()
        : "3.5",
      "Parking-Avail": "Yes"
    }
    this.filtered.push(data)
  }
}
