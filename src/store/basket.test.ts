import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import products from '@/__mocks__/products.json'
import { useBasket } from '@/store/basket'

describe('Basket store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('add product', async () => {
    const basketStore = useBasket()
    basketStore.addToBasket(products[0])
    basketStore.addToBasket(products[1])
    basketStore.addToBasket(products[1])
    expect(basketStore.inBasketCount).toEqual(2)
    expect(basketStore.getBasketQuantity(products[0])).toEqual(1)
    expect(basketStore.getBasketQuantity(products[1])).toEqual(2)
    expect(basketStore.isEmpty).toBeFalsy()
  })

  it('remove product', async () => {
    const basketStore = useBasket()
    basketStore.addToBasket(products[0])
    basketStore.addToBasket(products[1])
    basketStore.removeFromBasket(products[1])

    expect(basketStore.inBasketCount).toEqual(1)
    expect(basketStore.getBasketQuantity(products[0])).toEqual(1)
    expect(basketStore.basket.get(products[1].id)).toBeUndefined()
    expect(basketStore.isEmpty).toBeFalsy()
  })

  it('clear basket', async () => {
    const basketStore = useBasket()
    basketStore.addToBasket(products[0])
    basketStore.clearBasket()
    expect(basketStore.inBasketCount).toEqual(0)
    expect(basketStore.isEmpty).toBeTruthy()
  })
})
