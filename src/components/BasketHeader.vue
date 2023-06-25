<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBasket } from '@/store/basket'
import { routeBasket } from '@/constants'

const { inBasketCount } = storeToRefs(useBasket())
</script>

<template>
  <div class="header-basket">
    <router-link :to="routeBasket" class="p-2 header-basket__link">items in basket:</router-link>
    <span data-testid="header-basket-counter">{{ inBasketCount }}</span>
  </div>
</template>

<style lang="scss" scoped>
.header-basket {
  color: white;

  &__link {
    color: inherit;
  }
}
</style>
