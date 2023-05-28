import { ref } from 'vue'
import { useState } from 'vue3-usestate'
import { fetchProduct } from '@/services/fake-store-api'
import type { IProduct } from '@/types'

export default () => {
  const productsDetail = useState<Map<number, IProduct>>('products-detail', new Map())
  const loading = ref(false)
  const getFromCache = (id: number) => {
    const product = productsDetail.value.get(id)
    return product || null
  }
  const getProduct = async (id: number) => {
    const fromCache = getFromCache(id)
    if (fromCache) return fromCache

    loading.value = true
    try {
      const item = await fetchProduct(id)
      productsDetail.value.set(item.id, item)
      return item
    } catch (e) {
      console.log(`cant load product with id=${id}, `, e)
    } finally {
      loading.value = false
    }
    return null
  }

  return {
    loading,
    getProduct,
  }
}
