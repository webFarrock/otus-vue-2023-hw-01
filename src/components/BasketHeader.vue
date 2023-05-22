<script lang="ts" setup>
import { computed } from 'vue'
import useBasket from '@/composables/use-basket'
import { routeCheckout } from '@/constants'

const { inBasketCount } = useBasket()
</script>

<template>
  <div class="header-basket">
    <router-link :to="routeCheckout" class="p-2 header-basket__link">items in basket:</router-link>
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
