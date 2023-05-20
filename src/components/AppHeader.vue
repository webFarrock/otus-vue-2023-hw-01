<script lang="ts" setup>
import HeaderBasket from '@/components/HeaderBasket.vue'
import { routeHome } from '@/constants'
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
          <HeaderBasket />
        </div>
      </div>
    </div>
  </header>
</template>
