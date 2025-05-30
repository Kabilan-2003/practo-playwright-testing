import { test } from '@playwright/test';
import { Cities } from '../pages/topcities.page';

test.describe('Get top cities', () => {
    let page;
    let search;
    let cities;
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto('https://practo.com/tests');
      cities = new Cities(page);
    }
    );
    test.afterEach(async () => {
      await page.waitForTimeout(2000);
    });
  
    test('Get top cities', async () => {
      const topCities = await cities.getTopCities();
      console.log(topCities);
    });
  
    test.afterAll(async () => {
      await page.close();
    });
  
  });
  