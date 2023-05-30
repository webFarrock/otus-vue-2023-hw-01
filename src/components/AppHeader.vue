<script lang="ts" setup>
import { computed } from 'vue'
import { routeHome, routeLogin, routeProductAdd } from '@/constants'
import useUser from '@/composables/use-user'
import useBasket from '@/composables/use-basket'
import BasketHeader from '@/components/BasketHeader.vue'

const { isLoggedIn, logout } = useUser()
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
            <a v-if="isLoggedIn" class="navbar-brand" href="#" @click.prevent="logout">Logout</a>
            <router-link v-else :to="routeLogin" class="navbar-brand">Login</router-link>
          </div>
          <div v-if="isLoggedIn">
            <router-link :to="routeProductAdd" class="navbar-brand"> Add new product</router-link>
          </div>
          <BasketHeader v-if="showBasket" />
        </div>
      </div>
    </div>
  </header>
</template>
