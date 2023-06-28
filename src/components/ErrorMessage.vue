<script setup lang="ts">
import { DEFAULT_APP_ERROR_MESSAGE } from '@/constants/hint'
</script>

<template>
  <div class="alert alert-danger mt-5 mb-5" role="alert" data-testid="error-message">
    <slot>{{ DEFAULT_APP_ERROR_MESSAGE }}</slot>
  </div>
</template>
