<script lang="ts" setup>
import HeaderBasket from "@/components/HeaderBasket.vue";
</script>
<template>
  <header data-bs-theme="dark">
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <div>
            <a class="navbar-brand" href="/">
              <strong>Products</strong>
            </a>
          </div>
          <HeaderBasket/>
        </div>
      </div>
    </div>
  </header>
</template>
