import { test, expect } from "@playwright/test"

import testData from "../data/input.json"
import { HomePage } from "../pages/home"
import { HealthPage } from "../pages/health&welness"

test.describe("Corporate Form Validation Tests", () => {
  let home
  let health
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page)
    health = new HealthPage(page)
    await home.visit()
    // await home.handlePopup()
    await home.gotoCorporate()
  })

  for (const data of testData) {
    test(data.name, async () => {
      await health.fillDetails(...data.details)
      if (data.expect_disabled) {
        expect(await health.submit.isDisabled()).toBeTruthy()
      } else {
        expect(await health.submit.isEnabled()).toBeFalsy()
      }
    })
  }
})
