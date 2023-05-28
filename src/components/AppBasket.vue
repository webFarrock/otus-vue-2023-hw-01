<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { routeCheckout, routeHome } from '@/constants'
import useBasket from '@/composables/use-basket'
import BasketList from '@/components/BasketList.vue'

const router = useRouter()
const { isEmpty } = useBasket()

onMounted(() => {
  if (isEmpty.value) router.push(routeHome)
})
</script>

<template>
  <div class="app-basket">
    <BasketList />
    <router-link :to="routeCheckout" class="w-100 btn btn-primary btn-lg">
      Go to checkout
    </router-link>
  </div>
</template>

<style scoped type="scss"></style>
