<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ISearchData } from '@/types'
import { searchHighlight, queryFound } from '@/helpers'
import ProductCard from '@/components/ProductCard.vue'
import useProducts from '@/composables/use-products'
import AppLoader from '@/components/AppLoader.vue'
import ProductsSearch from '@/components/ProductsSearch.vue'

const { products, loading } = useProducts()
const filters = ref<ISearchData>({} as ISearchData)

const displayProducts = computed(() => {
  const { name, priceFrom, priceTo } = filters.value
  if (!name && !priceFrom && !priceTo) return [...products.value.values()]
  return [...products.value.values()]
    .filter((item) => (name ? queryFound(item.title, name) : true))
    .filter((item) => (priceFrom ? item.price >= priceFrom : true))
    .filter((item) => (priceTo ? item.price <= priceTo : true))
    .map((item) => ({
      ...item,
      title: name ? searchHighlight(item.title, name) : item.title
    }))
})

const handleSearch = (data: ISearchData) => (filters.value = data)
</script>
<template>
  <ProductsSearch @search="handleSearch" />
  <div class="album">
    <AppLoader v-if="loading" />
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <ProductCard v-for="product in displayProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>
