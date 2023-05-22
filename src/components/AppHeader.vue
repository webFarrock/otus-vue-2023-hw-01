<script lang="ts" setup>
import { computed } from 'vue'
import { routeHome, routeProductAdd } from '@/constants'
import useBasket from '@/composables/use-basket'
import BasketHeader from '@/components/BasketHeader.vue'

const { isEmpty } = useBasket()
const showBasket = computed(() => !isEmpty.value)
</script>
<template>
  <header data-bs-theme="dark">
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <div>
            <router-link :to="routeHome" class="navbar-brand">
              <strong>Products</strong>
            </router-link>
          </div>
          <div>
            <router-link :to="routeProductAdd" class="navbar-brand"> Add new product</router-link>
          </div>
          <BasketHeader v-if="showBasket" />
        </div>
      </div>
    </div>
  </header>
</template>
