/**
 * @vitest-environment jsdom
 */

import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, vi, it, expect, afterEach } from 'vitest'
import ProductList from '@/components/ProductList.vue'
import products from '@/__mocks__/products.json'
import { createTestingPinia } from '@pinia/testing'

let wrapper: VueWrapper | null = null
describe('ProductList', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('product list loaded', () => {
    wrapper = mount(ProductList, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            products: {
              loading: false,
              products,
            }
          },
          createSpy: vi.fn
        }) ]
      }
    })
    expect((wrapper as VueWrapper).findAll('.card').length).toEqual(products.length)
  })
  
  it('product list loading', () => {
    wrapper = mount(ProductList, {
      global: {
        plugins: [ createTestingPinia({
          initialState: {
            products: {
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
