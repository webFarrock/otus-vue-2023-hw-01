<script lang="ts" setup>
import useBasket from '@/composables/use-basket'
import { routeBasket } from '@/constants'

const { inBasketCount } = useBasket()
</script>

<template>
  <div class="header-basket">
    <router-link :to="routeBasket" class="p-2 header-basket__link">items in basket:</router-link>
    {{ inBasketCount }}
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
