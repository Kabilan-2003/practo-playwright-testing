import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/home"
import { ResultPage } from "../pages/results"

let Location = "Bangalore"
let query = "Hospital"
test.describe("Enter the search query in home Page", () => {
  // test.describe.configure({mode:'serial'})

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
  test("Test the query", async () => {
    await home.searchQuery("Bangalore", "Hospital")
    await page.waitForTimeout(2000)
    console.log(await page.title())
  })

  test("Testing select city", async () => {
    await home.selectCity("Bangalore")
    console.log(await home.location.inputValue())
  })
  test("Wrong Search Query", async () => {
    await home.searchQuery("Bangalore", "jfbsajegje")
    expect(await result.error.textContent()).toBe(
      `Your search for jfbsajegje in ${Location} didn't match anything.`
    )
  })

  test("Check if city is selected", async () => {
    await home.selectCity(Location)
    expect(await home.location.inputValue()).toBe(Location)
  })
})
