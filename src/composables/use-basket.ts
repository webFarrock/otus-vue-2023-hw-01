import { computed } from 'vue'
import { useState } from 'vue3-usestate'
import type { IBasketProduct, IProduct } from '@/types'

export default () => {
  const basket = useState<Map<number, IBasketProduct>>('basket', new Map())
  const addToBasket = (item: IProduct) => {
    const product = basket.value.get(item.id)
    if (product) basket.value.set(item.id, { ...item, quantity: (product.quantity += 1) })
    else basket.value.set(item.id, { ...item, quantity: 1 })
  }
  const inBasketCount = computed(() => basket.value.size)
  const isEmpty = computed(() => !inBasketCount.value)

  const removeFromBasket = (item: IProduct, fullQuantity = false) => {
    // можно кинуть ошибку если продукта нет - но имхо лишнее
    if (fullQuantity) basket.value.delete(item.id)
    else {
      const product = basket.value.get(item.id)
      if (!product) return
      if (product.quantity <= 1) removeFromBasket(item, true)
      else basket.value.set(item.id, { ...item, quantity: (product.quantity -= 1) })
    }
  }

  const clearBasket = () => (basket.value = new Map())
  const getBasketQuantity = (item: IProduct) => {
    const product = basket.value.get(item.id)
    return product?.quantity || 0
  }

  return {
    basket,
    inBasketCount,
    isEmpty,
    addToBasket,
    removeFromBasket,
    getBasketQuantity,
    clearBasket,
  }
}
