<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { IProduct } from '@/types'
import { useProductsDetail } from '@/store/products-detail'
import { routeHome } from '@/constants'
import AppLoader from '@/components/AppLoader.vue'
import ProductCard from '@/components/ProductCard.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

interface IProps {
  id: number
}

const props = defineProps<IProps>()

const productsDetailStore = useProductsDetail()
const { getProduct, product } = productsDetailStore
const { loading } = storeToRefs(productsDetailStore)
onMounted(() => getProduct(props.id))
</script>
<template>
  <AppLoader v-if="loading"/>
  <div v-else class="album">
    <router-link :to="routeHome" class="mb-3 d-block">To main page</router-link>
    <ProductCard v-if="product" :detail="true" :product="product"/>
    <ErrorMessage v-else> Cant find product with id = {{ id }}</ErrorMessage>
  </div>
</template>
