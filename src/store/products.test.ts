import { beforeEach, describe, it, vi, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProducts } from '@/store/products'
import products from '@/__mocks__/products.json'
import { fetchProducts } from '@/services/fake-store-api'
import type { Mock } from '@vitest/spy'

vi.mock('@/services/fake-store-api')

describe('Products store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })
  
  it('Init products', async () => {
    (fetchProducts as Mock).mockResolvedValue(products)
    const productsStore = useProducts()
    await productsStore.initProducts()
    expect(fetchProducts).toBeCalledTimes(1)
    expect(productsStore.products.size).toEqual(products.length)

    products.forEach((product, idx) => {
      expect(productsStore.products.get(product.id)).toMatchObject(products[idx])
    })
  })

  it('Init products lazy', async () => {
    (fetchProducts as Mock).mockResolvedValue(products)
    const productsStore = useProducts()
    await productsStore.initProducts()
    await productsStore.initProducts()
    await productsStore.initProducts()
    expect(fetchProducts).toBeCalledTimes(1)
  })
})
