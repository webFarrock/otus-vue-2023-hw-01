/**
 * @vitest-environment jsdom
 */
import { mount, VueWrapper } from '@vue/test-utils'
import { describe, vi, it, expect, afterEach } from 'vitest'
import AppHeader from '@/components/AppHeader.vue'
import { createTestingPinia } from '@pinia/testing'
import { TEST_USER } from '@/constants'
import products from '@/__mocks__/products.json'

let wrapper: VueWrapper | null = null
describe('AppHeader', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('doesnt displays basket when it empty', () => {
    const basket = new Map()
    wrapper = mount(AppHeader, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            basket: {}
          },
          createSpy: vi.fn
        }) ]
      }
    })

    expect((wrapper as VueWrapper).find('[data-testid="basket-header"]').exists()).toBeFalsy()
  })

  it('displays basket when it not empty', () => {
    const basket = new Map()
    basket.set(products[0], { ...products[0], quantity: 2 })
    wrapper = mount(AppHeader, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            basket: {
              basket
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })

    expect((wrapper as VueWrapper).find('[data-testid="basket-header"]')).toBeTruthy()
  })

  it('doesnt displays user greeting when not logged in and doesnt displays add product link and display login link', () => {
    wrapper = mount(AppHeader, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            user: {
              user: {
                login: 'fake'
              },
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })

    expect((wrapper as VueWrapper).find('[data-testid="user-greeting"]').exists()).toBeFalsy()
    expect((wrapper as VueWrapper).find('[data-testid="add-product-link"]').exists()).toBeFalsy()
    expect((wrapper as VueWrapper).find('[data-testid="login-link"]').exists()).toBeTruthy()
  })

  it('displays user greeting when logged in and displays add product link', () => {
    wrapper = mount(AppHeader, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            user: {
              user: {
                login: TEST_USER
              },
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })

    expect((wrapper as VueWrapper).find('[data-testid="user-greeting"]').exists()).toBeTruthy()
    expect((wrapper as VueWrapper).find('[data-testid="add-product-link"]').exists()).toBeTruthy()
  })

  it('displays user greeting by fio', () => {
    const firstName = 'John'
    const lastName = 'Smith'
    wrapper = mount(AppHeader, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            user: {
              user: {
                login: TEST_USER,
                firstName,
                lastName,
              },
            },
            basket: {}
          },
          createSpy: vi.fn
        }) ]
      }
    })

    expect((wrapper as VueWrapper).find('[data-testid="user-greeting"]').text()).toBe(`Hello, ${firstName} ${lastName} [${TEST_USER}]`)
  })

})
