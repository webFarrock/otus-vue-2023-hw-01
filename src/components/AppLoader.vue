<script setup lang="ts">
import { DEFAULT_APP_LOADING_MESSAGE } from '@/constants/hint'
</script>

<template>
  <div class="text-center" data-testid="app-loader">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">{{ DEFAULT_APP_LOADING_MESSAGE }}</span>
    </div>
  </div>
</template>
