// @ts-check
import { test, expect } from '@playwright/test';
import { Search } from '../pages/search.page';
import { HospitalList } from '../pages/hospitalList.page';
// import hospitalData from '../data/hospitalData.json';
import fs from 'fs';

test.describe('Hospital filtering', () => {
  let page;
  let search;
  let form;
  let context;
  let hospitalList;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page=await context.newPage();
    await page.goto('https://practo.com');
    search = new Search(page);
    hospitalList = new HospitalList(page);
  });
  
  test.afterEach(async () => {
    await page.waitForTimeout(2000);
  });

  test('Navigation to hospital list', async () => {
    await search.searchHospitalsList();
  });

  test('Location update', async () => {
    await hospitalList.updateLocation();
  });

  test('Get hospitals list', async () => {
    const hospitals = await hospitalList.getHospitalsList();
    // console.log(hospitals);
    let hospital = JSON.stringify(hospitals,null,2);
    fs.writeFileSync('./data/hospitalData.json', hospital);
    console.log(hospitals);
  });
  test.afterAll(async () => {
    await page.close();

  }
  );
});

