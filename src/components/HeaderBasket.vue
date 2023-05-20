<script lang="ts" setup>
import { computed } from 'vue'
import useBasket from '@/composables/use-basket'
import { routeBasket } from '@/constants'

const basket = useBasket()
const show = computed(() => basket.inBasketCount.value > 0)
</script>

<template>
  <div v-if="show" class="header-basket">
    <router-link :to="routeBasket" class="p-2 header-basket__link">items in basket:</router-link>
    {{ basket.inBasketCount }}
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
