<script setup lang="ts">
import { DEFAULT_APP_FOOTER_TEXT } from '@/constants/hint'
</script>

<template>
  <footer class="text-body-secondary py-5" data-testid="app-footer">
    <div class="container">
      <p class="mb-1">{{ DEFAULT_APP_FOOTER_TEXT }}</p>
    </div>
  </footer>
</template>
