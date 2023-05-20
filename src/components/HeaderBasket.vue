<script lang="ts" setup>
import {computed} from "vue";
import useBasket from "@/composables/use-basket";

const basket = useBasket()
const show = computed(() => basket.inBasketCount.value > 0)
</script>

<template>
  <div v-if="show" class="header-basket">
    <span class="p-3">items in basket: {{ basket.inBasketCount }}</span>
    <button class="checkout-bth  btn btn-outline-primary bg-white" type="button">Checkout</button>
  </div>
</template>

<style lang="scss" scoped>
.header-basket {
  color: white
}

.checkout-bth {
  &:hover {
    color: black;
  }
}
</style>
