import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { fetchProducts } from '@/services/fake-store-api'
import type { IProduct } from '@/types'

export const useProducts = defineStore('products', () => {
  const products = ref<Map<number, IProduct>>(new Map())
  const loading = ref<boolean>(false)

  const initProducts = async () => {
    if (products.value.size) return
    loading.value = true
    try {
      const items = await fetchProducts()
      items.forEach((item) => products.value.set(item.id, item))
    } catch (e) {
      console.log('cant load products, ', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => initProducts())

  return {
    products,
    loading,
    initProducts,
  }
})
