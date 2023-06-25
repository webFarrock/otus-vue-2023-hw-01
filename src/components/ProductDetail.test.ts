/**
 * @vitest-environment jsdom
 */

import { mount, VueWrapper } from '@vue/test-utils'
import { describe, vi, it, expect, afterEach } from 'vitest'
import ProductDetail from '@/components/ProductDetail.vue'
import products from '@/__mocks__/products.json'
import { createTestingPinia } from '@pinia/testing'

const product = products[0]

let wrapper: VueWrapper | null = null
describe('ProductDetails', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('loads product', () => {
    wrapper = mount(ProductDetail, {
      props: {
        id: product.id
      },
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            ['products-detail']: {
              loading: false,
              product,
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })
    expect((wrapper as VueWrapper).find('[data-testid="product-title"]').text()).toEqual(product.title)
  })


  it('error loads product', () => {
    wrapper = mount(ProductDetail, {
      props: {
        id: 0
      },
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            ['products-detail']: {
              loading: false,
              product: null,
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })
    expect((wrapper as VueWrapper).find('[data-testid="error-message"]').text()).toContain('Cant find product')
  })

  it('loading in progress', () => {
    wrapper = mount(ProductDetail, {
      props: {
        id: 0
      },
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            ['products-detail']: {
              loading: true,
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })
    expect((wrapper as VueWrapper).text()).toContain('Loading...')
  })
})
