<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { routeHome, routeLogin, routeProductAdd } from '@/constants'
import { useUser } from '@/store/user'
import { useBasket } from '@/store/basket'
import BasketHeader from '@/components/BasketHeader.vue'

const userStore = useUser()
const { isLoggedIn, userHeaderTitle } = storeToRefs(userStore)
const { logout } = userStore
const { isEmpty } = storeToRefs(useBasket())
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
            <span v-if="isLoggedIn"
                  class="navbar-brand"
                  data-testid="user-greeting"
            >
              Hello, {{ userHeaderTitle }}
            </span>
            <a v-if="isLoggedIn" class="navbar-brand" href="#" @click.prevent="logout">Logout</a>
            <router-link v-else :to="routeLogin" data-testid="login-link" class="navbar-brand">Login</router-link>
          </div>
          <div v-if="isLoggedIn">
            <router-link :to="routeProductAdd" data-testid="add-product-link" class="navbar-brand"> Add new product
            </router-link>
          </div>
          <BasketHeader data-testid="basket-header" v-if="showBasket"/>
        </div>
      </div>
    </div>
  </header>
</template>
