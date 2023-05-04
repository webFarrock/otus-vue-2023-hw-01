<script setup lang="ts">
import {computed} from "vue";
import ProductCard from "@/components/ProductCard.vue";
import useProducts from "@/composables/use-products";

const {products} = useProducts()
const displayProducts = computed(() => products.value.values())
</script>
<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <ProductCard v-for="product in displayProducts"
                     :key="product.id"
                     :product="product"
        />
      </div>
    </div>
  </div>
</template>
