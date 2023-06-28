/**
 * @vitest-environment jsdom
 */

import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, vi, it, expect, afterEach } from 'vitest'
import type { Mock } from 'vitest'
import AppBasket from '@/components/AppBasket.vue'
import products from '@/__mocks__/products.json'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'
import { DEFAULT_APP_CHECKOUT_LINK_TITLE } from '@/constants/hint'

const basketProducts = products.reduce((acc, item) => (acc.set(item.id, { ...item, quantity: 1 })), new Map())

vi.mock('vue-router')

let wrapper: VueWrapper | null = null

describe('AppBasket', () => {
  (useRouter as Mock).mockReturnValue({
    push: vi.fn(),
  })

  afterEach(() => {
    wrapper?.unmount();
    (useRouter().push as Mock).mockReset()
  })

  it('basket empty', () => {
    wrapper = shallowMount(AppBasket, {
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
    expect(useRouter().push).toHaveBeenCalledOnce()
  })


  it('basket filled', () => {
    wrapper = shallowMount(AppBasket, {
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
    expect(useRouter().push).toHaveBeenCalledTimes(0)
    expect((wrapper as VueWrapper).find('[data-testid="app-basket-checkout-link"]').text()).toContain(DEFAULT_APP_CHECKOUT_LINK_TITLE)
  })
})
