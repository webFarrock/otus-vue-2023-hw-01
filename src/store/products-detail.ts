import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchProduct } from '@/services/fake-store-api'
import type { IProduct, Nullable } from '@/types'

export const useProductsDetail = defineStore('products-detail', () => {
  const productsDetailCache = ref<Map<number, IProduct>>(new Map())
  const product = ref<Nullable<IProduct>>(null)

  const loading = ref<boolean>(false)

  const getFromCache = (id: number) => {
    const product = productsDetailCache.value.get(id)
    return product || null
  }
  const getProduct = async (id: number) => {
    const fromCache = getFromCache(id)
    if (fromCache) return fromCache

    loading.value = true
    try {
      const item = await fetchProduct(id)
      productsDetailCache.value.set(item.id, item)
      product.value = item
    } catch (e) {
      console.log(`cant load product with id=${id}, `, e)
      product.value = null
    } finally {
      loading.value = false
    }
    return product.value
  }

  return {
    productsDetailCache,
    product,
    loading,
    getProduct,
  }
})

