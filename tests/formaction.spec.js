import { test, expect } from '@playwright/test';
import { Form } from '../pages/form.page';

test.describe('Schedule form', () => {
  let page;
  let context;
  let form;
  test.describe.configure({ mode: 'serial' }); // Ensures tests run in serial mode

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page=await context.newPage();
    await page.goto('https://practo.com/plus/corporate');
    form = new Form(page);
  });
  
  test.afterEach(async () => {
    await page.waitForTimeout(2000);
  });
  
  test('Form Filling', async () => {
    await form.fillForm();
  });

  test('Submit button enabled', async () => {
    const isSubmitted = await form.checkSubmitButton();
    expect.soft(isSubmitted).toBe(false, 'Submit button should be enabled and form should be submitted successfully.');
  });
  test.afterAll(async () => {
    await page.close();
  });
});