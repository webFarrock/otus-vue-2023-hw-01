import { test, expect } from '@playwright/test'

test('search products by name', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await page.getByTestId('search-input-name').click()
  await page.getByTestId('search-input-name').fill('cotton')
  const items = await page.getByTestId('product-card')
  await expect(items).toHaveCount(2)
})


test('search products by price', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await page.getByTestId('search-input-price-from').click()
  await page.getByTestId('search-input-price-from').fill('50')
  await page.getByTestId('search-input-price-to').click()
  await page.getByTestId('search-input-price-to').fill('100')
  const items = await page.getByTestId('product-card')
  await expect(items).toHaveCount(3)
})

test('user login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
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
  await page.goto('http://127.0.0.1:5173/')
  await page.locator('.btn').first().click()
  await page.locator('.mt-2 > .btn').first().click()
  await page.locator('.mt-2 > .btn').first().click()
  const basketCounter = await page.getByTestId('header-basket-counter')
  await expect(basketCounter).toContainText('3')
})

test('remove from basket', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/')
  await page.locator('.btn').first().click()
  await page.locator('.mt-2 > .btn').first().click()
  await page.locator('.mt-2 > .btn').first().click()
  await page.getByRole('button', { name: 'Remove' }).nth(2).click()
  await page.getByRole('button', { name: 'Remove' }).nth(1).click()
  const basketCounter = await page.getByTestId('header-basket-counter')
  await expect(basketCounter).toContainText('1')
})


