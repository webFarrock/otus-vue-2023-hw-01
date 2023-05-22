import { ref, onMounted } from 'vue'
import { useState } from 'vue3-usestate'
import { fetchProducts } from '@/services/fake-store-api'
import type { IProduct } from '@/types'

export default () => {
  const products = useState<Map<number, IProduct>>('products', new Map())
  const loading = ref(false)

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
  }
}
