<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
<template>
  <AppHeader />

  <main>
    <div class="container my-5 bg-body-tertiary">
      <router-view />
    </div>
  </main>

  <AppFooter />
</template>
