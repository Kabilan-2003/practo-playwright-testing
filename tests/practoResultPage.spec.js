import { test } from "@playwright/test"
import { HomePage } from "../pages/home"
import { ResultPage } from "../pages/results"

test.describe("Result Page", async () => {
  let page
  let home
  let context
  let result

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext()
    page = await context.newPage()
    await context.grantPermissions(["geolocation"])
    home = new HomePage(page)
    result = new ResultPage(page, context)
  })

  test.beforeEach(async () => {
    await home.visit()
  })

  test("Filter Hospitals", async () => {
    test.slow()
    // await home.handlePopup()
    await home.searchQuery("Bangalore", "Hospital")
    await page.waitForLoadState("load")
    await result.basicFilters("Open 24x7", 3.5)
  })
})
