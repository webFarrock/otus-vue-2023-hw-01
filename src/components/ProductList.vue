<script lang="ts" setup>
import {computed} from "vue";
import ProductCard from "@/components/ProductCard.vue";
import useProducts from "@/composables/use-products";
import AppLoader from "@/components/AppLoader.vue";

const {products, loading} = useProducts()
const displayProducts = computed(() => products.value.values())
</script>
<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <AppLoader v-if="loading"/>
      <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <ProductCard v-for="product in displayProducts"
                     :key="product.id"
                     :product="product"
        />
      </div>
    </div>
  </div>
</template>
