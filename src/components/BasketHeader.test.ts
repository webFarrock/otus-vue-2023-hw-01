/**
 * @vitest-environment jsdom
 */

import { mount, VueWrapper } from '@vue/test-utils'
import { describe, vi, it, expect, afterEach } from 'vitest'
import BasketHeader from '@/components/BasketHeader.vue'
import products from '@/__mocks__/products.json'
import { createTestingPinia } from '@pinia/testing'

const basketProducts = products.reduce((acc, item) => (acc.set(item.id, { ...item, quantity: 1 })), new Map())

let wrapper: VueWrapper | null = null
describe('BasketHeader', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('basket empty', () => {
    wrapper = mount(BasketHeader, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            basket: {
              basket: [],
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })
    expect((wrapper as VueWrapper).isVisible()).toBeFalsy()
  })


  it('basket filled', () => {
    wrapper = mount(BasketHeader, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            basket: {
              basket: basketProducts,
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })
    expect((wrapper as VueWrapper).isVisible()).toBeTruthy()
    expect((wrapper as VueWrapper).find('[data-testid="header-basket-counter"]').text()).toContain(`${basketProducts.size}`)
  })
})
