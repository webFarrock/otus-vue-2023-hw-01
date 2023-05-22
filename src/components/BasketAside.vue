<script lang="ts" setup>
import { computed } from 'vue'
import useBasket from '@/composables/use-basket'

const { basket } = useBasket()
const displayBasket = computed(() => [...basket.value.values()])
const totalCount = computed(() => displayBasket.value.length)
const totalPrice = computed(() =>
  displayBasket.value.reduce((acc, { price }) => {
    return (acc += price)
  }, 0),
)
</script>

<template>
  <div class="col-md-5 col-lg-4 order-md-last">
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
          <h6 class="my-0">{{ item.title }}</h6>
          <small class="text-body-secondary">{{ item.category }}</small>
        </div>
        <span class="text-body-secondary">${{ item.price }}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${{ totalPrice }}</strong>
      </li>
    </ul>
  </div>
</template>

<style scoped type="scss"></style>
