<script lang="ts" setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { routeCheckout, routeHome } from '@/constants'
import { useBasket } from '@/store/basket'
import BasketList from '@/components/BasketList.vue'
import { DEFAULT_APP_CHECKOUT_LINK_TITLE } from '@/constants/hint'

const router = useRouter()
const { isEmpty } = storeToRefs(useBasket())

watch(isEmpty, (v) => v && router.push(routeHome), { immediate: true })
</script>

<template>
  <div class="app-basket">
    <BasketList/>
    <router-link :to="routeCheckout" data-testid="app-basket-checkout-link" class="w-100 btn btn-primary btn-lg">
      {{ DEFAULT_APP_CHECKOUT_LINK_TITLE }}
    </router-link>
  </div>
</template>

<style scoped type="scss"></style>
