<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBasket } from '@/store/basket'

const { basket } = storeToRefs(useBasket())
const displayBasket = computed(() =>
    [ ...basket.value.values() ].map((item) => ({
      ...item,
      totalPrice: item.price * item.quantity,
    })),
)
const totalCount = computed(() => displayBasket.value.length)
const totalPrice = computed(() =>
    displayBasket.value.reduce((acc, { price, quantity }) => {
      return (acc += price * quantity)
    }, 0).toFixed(2).replace('.00', ''),
)
</script>

<template>
  <div class="order-md-last">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-primary">Your cart</span>
      <span class="badge bg-primary rounded-pill">{{ totalCount }}</span>
    </h4>
    <ul class="list-group mb-3">
      <li
          v-for="item in displayBasket"
          :key="item.id"
          class="list-group-item d-flex justify-content-between lh-sm"
      >
        <div>
          <h6 class="my-0">{{ item.title }} (positions: {{ item.quantity }})</h6>
          <small class="text-body-secondary">{{ item.category }}</small>
        </div>
        <span class="text-body-secondary">${{ item.totalPrice }}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${{ totalPrice }}</strong>
      </li>
    </ul>
  </div>
</template>

<style scoped type="scss"></style>
