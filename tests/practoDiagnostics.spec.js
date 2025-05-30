import test, { expect } from "playwright/test"
import { HomePage } from "../pages/home"
import { DiagnosticPage } from "../pages/diagnostics"

test.describe("Test Diagnostics", async () => {
  let page
  let home
  let diagnostics

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
    home = new HomePage(page)
    diagnostics = new DiagnosticPage(page)
  })

  test("Naviagation to Diagnostics page", async () => {
    await home.visit()
    //    await home.handlePopup()
    await home.gotoDiagnostics()
    expect(await page.title()).toBe(
      "Blood Tests | Book Diagnostic Tests from Home at Best Prices | Practo"
    )
    await diagnostics.extractLocation()
  })
})
