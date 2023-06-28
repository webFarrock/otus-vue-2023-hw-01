import { test, expect } from '@playwright/test'

const appHomePage = 'http://127.0.0.1:5173/'

test('search products by name', async ({ page }) => {
  await page.goto(appHomePage)
  await page.getByTestId('search-input-name').click()
  await page.getByTestId('search-input-name').fill('cotton')
  const items = await page.getByTestId('product-card')
  await expect(items).toHaveCount(2)
})


test('search products by price', async ({ page }) => {
  await page.goto(appHomePage)
  await page.getByTestId('search-input-price-from').click()
  await page.getByTestId('search-input-price-from').fill('50')
  await page.getByTestId('search-input-price-to').click()
  await page.getByTestId('search-input-price-to').fill('100')
  const items = await page.getByTestId('product-card')
  await expect(items).toHaveCount(3)
})

test('user login', async ({ page }) => {
  await page.goto(appHomePage)
  await page.getByRole('link', { name: 'Login' }).click()
  await page.getByTestId('auth-form-input-login').click()
  await page.getByTestId('auth-form-input-login').fill('user')
  await page.getByTestId('auth-form-input-password').click()
  await page.getByTestId('auth-form-input-password').fill('123456')
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    dialog.dismiss().catch(() => {
    })
  })
  await page.getByTestId('auth-form-btn-login').click()
  await expect(page.getByTestId('user-greeting')).toContainText('Hello, user')
})


test('add to basket', async ({ page }) => {
  const addProductCount = 3
  await page.goto(appHomePage)

  for (let i = 0; i < addProductCount; i++) {
    await page.getByTestId('basket-btn-add').nth(i).click()
  }

  const basketCounter = await page.getByTestId('header-basket-counter')
  await expect(basketCounter).toContainText(String(addProductCount))
})

test('remove from basket', async ({ page }) => {
  await page.goto(appHomePage)

  const basketBtnAdd = await page.getByTestId('basket-btn-add')
  await basketBtnAdd.nth(3).click()
  await basketBtnAdd.nth(1).click()
  await basketBtnAdd.nth(2).click()

  const basketBtnRemove = await page.getByTestId('basket-btn-remove')
  await basketBtnRemove.nth(0).click()
  await basketBtnRemove.nth(1).click()

  const basketCounter = await page.getByTestId('header-basket-counter')
  await expect(basketCounter).toContainText('1')
})


